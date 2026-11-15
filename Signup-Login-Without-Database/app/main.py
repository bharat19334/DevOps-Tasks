
import json
import os
import re
import threading
from pathlib import Path
from datetime import datetime, timedelta, timezone
from uuid import uuid4

from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import FileResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from jose import jwt, JWTError
from pwdlib import PasswordHash


# --------------------------------------------------
# Application Configuration
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"
DATA_DIR = BASE_DIR / "data"
USERS_FILE = DATA_DIR / "users.json"

DATA_DIR.mkdir(exist_ok=True)

if not USERS_FILE.exists():
    USERS_FILE.write_text("[]", encoding="utf-8")

app = FastAPI(
    title="Signup and Login Without Database",
    description="JWT authentication using JSON file storage",
    version="1.0.0"
)

app.mount(
    "/static",
    StaticFiles(directory=FRONTEND_DIR),
    name="static"
)

# Change this secret before deployment.
SECRET_KEY = os.getenv(
    "JWT_SECRET_KEY",
    "development-only-change-this-secret-key-123456"
)

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

password_hash = PasswordHash.recommended()
security = HTTPBearer(auto_error=False)

file_lock = threading.Lock()


# --------------------------------------------------
# Data Storage Functions
# --------------------------------------------------

def read_users():
    with file_lock:
        try:
            return json.loads(USERS_FILE.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            raise HTTPException(
                status_code=500,
                detail="User storage could not be read"
            )


def write_users(users):
    with file_lock:
        temporary_file = USERS_FILE.with_suffix(".tmp")

        temporary_file.write_text(
            json.dumps(users, indent=4),
            encoding="utf-8"
        )

        temporary_file.replace(USERS_FILE)


# --------------------------------------------------
# Request Models
# --------------------------------------------------

class SignupRequest(BaseModel):
    email: str = Field(min_length=5, max_length=254)
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: str = Field(min_length=5, max_length=254)
    password: str = Field(min_length=8, max_length=128)


# --------------------------------------------------
# Validation
# --------------------------------------------------

def validate_email(email):
    pattern = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"

    if not re.fullmatch(pattern, email):
        raise HTTPException(
            status_code=400,
            detail="Please enter a valid email address"
        )

    return email.lower().strip()


# --------------------------------------------------
# JWT Functions
# --------------------------------------------------

def create_access_token(user_id):
    expiration = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": user_id,
        "exp": expiration
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    if credentials is None:
        raise HTTPException(
            status_code=401,
            detail="Please login first"
        )

    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("sub")

        if not user_id:
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication token"
            )

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Token is invalid or expired"
        )

    users = read_users()

    for user in users:
        if user["id"] == user_id:
            return user

    raise HTTPException(
        status_code=401,
        detail="User account not found"
    )


# --------------------------------------------------
# Frontend Pages
# --------------------------------------------------

@app.get("/", include_in_schema=False)
def login_page():
    return FileResponse(FRONTEND_DIR / "index.html")


@app.get("/signup", include_in_schema=False)
def signup_page():
    return FileResponse(FRONTEND_DIR / "signup.html")


@app.get("/dashboard", include_in_schema=False)
def dashboard_page():
    return FileResponse(FRONTEND_DIR / "dashboard.html")


# --------------------------------------------------
# Home API
# --------------------------------------------------

@app.get("/api/health")
def health():
    return {
        "status": "running",
        "message": "Authentication server is working"
    }


# --------------------------------------------------
# Signup API
# --------------------------------------------------

@app.post("/api/signup", status_code=201)
def signup(data: SignupRequest):
    email = validate_email(data.email)

    users = read_users()

    for user in users:
        if user["email"] == email:
            raise HTTPException(
                status_code=409,
                detail="Email is already registered"
            )

    new_user = {
        "id": str(uuid4()),
        "email": email,
        "password_hash": password_hash.hash(data.password),
        "created_at": datetime.now(timezone.utc).isoformat()
    }

    users.append(new_user)
    write_users(users)

    return {
        "message": "Account created successfully",
        "email": email
    }


# --------------------------------------------------
# Login API
# --------------------------------------------------

@app.post("/api/login")
def login(data: LoginRequest):
    email = validate_email(data.email)

    users = read_users()

    user = next(
        (item for item in users if item["email"] == email),
        None
    )

    if not user or not password_hash.verify(
        data.password,
        user["password_hash"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(user["id"])

    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer",
        "email": user["email"]
    }


# --------------------------------------------------
# Protected User Profile API
# --------------------------------------------------

@app.get("/api/me")
def get_profile(current_user: dict = Depends(get_current_user)):
    return {
        "id": current_user["id"],
        "email": current_user["email"],
        "created_at": current_user["created_at"]
    }


# --------------------------------------------------
# Run with Uvicorn
# --------------------------------------------------

@app.get("/api/protected")
def protected_route(current_user: dict = Depends(get_current_user)):
    return {
        "message": "You accessed a protected API",
        "email": current_user["email"]
    }
