
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["message"] == "CI/CD Pipeline Demo"


def test_add():
    response = client.get("/add/10/20")
    assert response.status_code == 200
    assert response.json()["result"] == 30


def test_multiply():
    response = client.get("/multiply/5/4")
    assert response.status_code == 200
    assert response.json()["result"] == 20
