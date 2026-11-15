
from app.main import app
from fastapi.testclient import TestClient

app = FastAPI(
    title="DevOps CI/CD Demo",
    description="Mini project for GitHub Actions automation",
    version="1.0.0"
)


@app.get("/")
def home():
    return {"message": "CI/CD Pipeline Demo"}


@app.get("/add/{a}/{b}")
def add(a: int, b: int):
    return {"result": a + b}


@app.get("/multiply/{a}/{b}")
def multiply(a: int, b: int):
    return {"result": a * b}
