
# Signup & Login Without Database

A simple authentication application built using FastAPI, HTML, CSS and JavaScript.

## Features

- User registration
- User login
- Argon2 password hashing
- JWT authentication
- Protected user profile API
- Logout
- JSON file-based user storage
- Responsive frontend

## Technology Stack

- Python
- FastAPI
- JWT
- Argon2
- HTML
- CSS
- JavaScript
- JSON

## Installation

```bash
python -m venv venv
```

Activate virtual environment:

Windows PowerShell:

```powershell
venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

## Run Application

```bash
python -m uvicorn app.main:app --reload
```

Open:

http://127.0.0.1:8000

API Documentation:

http://127.0.0.1:8000/docs

## Storage

User details are stored in a local JSON file.

No SQL or NoSQL database is used.

Passwords are hashed using Argon2.
