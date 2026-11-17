import redis
from datetime import datetime
from fastapi import FastAPI

app = FastAPI()
r = redis.Redis(host='localhost', port=6379, decode_responses=True)

@app.get("/timestamp")
def get_timestamp():
    current_time = datetime.now().isoformat()
    try:
        r.set("last_access_timestamp", current_time)
        stored_time = r.get("last_access_timestamp")
    except Exception as e:
        stored_time = f"Redis offline: {str(e)}"
        
    return {
        "status": "success",
        "current_timestamp": current_time,
        "redis_stored_timestamp": stored_time
    }