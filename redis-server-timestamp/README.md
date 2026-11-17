# Task: Redis Server Timestamp (`06-redis-server-timestamp`)

This folder contains a FastAPI backend implementation integrated with a Redis in-memory data store to capture, store, and retrieve real-time request timestamps.

## 📂 Folder Structure
* `app.py` - FastAPI application containing the `/timestamp` endpoint connected to Redis.
* `requirements.txt` - Python package dependencies required to run the application.
* `README.md` - Documentation and setup guide for the task.

## 🛠️ Technologies Used
* **Python 3.10+**
* **FastAPI** (Modern, fast web framework for building APIs)
* **Uvicorn** (ASGI server implementation)
* **Redis** (In-memory data structure store)

---

## 🚀 Setup and Execution Guide

### 1. Prerequisites
Ensure you have Python installed along with a running Redis server (either locally or via Docker container on port `6379`).

### 2. Install Dependencies
Open your terminal inside this folder and run:
```bash
pip install -r requirements.txt

Run the Redis Server (Optional if running locally)
If running via Docker:
docker run --name redis-server -p 6379:6379 -d redis

Start the FastAPI Application
Run the Uvicorn development server:
uvicorn app:app --reload


Test the Endpoint
Open your browser or run a curl command to test the timestamp generation:

Endpoint URL: http://127.0.0.1:8000/timestamp

Expected JSON Response:
{
  "status": "success",
  "current_timestamp": "2026-11-17T18:45:00.123456",
  "redis_stored_timestamp": "2026-11-17T18:45:00.123456"
}

