
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from pathlib import Path
from uuid import uuid4
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="File Sharing Server",
    description="Upload, download and manage files",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@app.get("/")
def home():
    return {"message": "File Sharing Server is running"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="Filename is required")

    file_id = str(uuid4())
    extension = Path(file.filename).suffix
    saved_name = file_id + extension

    file_path = UPLOAD_DIR / saved_name

    content = await file.read()
    file_path.write_bytes(content)

    return {
        "message": "File uploaded successfully",
        "file_id": file_id,
        "filename": file.filename,
        "download_url": f"/download/{saved_name}"
    }

@app.get("/files")
def list_files():
    files = []

    for path in UPLOAD_DIR.iterdir():
        if path.is_file() and path.name != ".gitkeep":
            files.append({
                "filename": path.name,
                "size": path.stat().st_size,
                "download_url": f"/download/{path.name}"
            })

    return {"files": files}

@app.get("/download/{filename}")
def download_file(filename: str):
    file_path = UPLOAD_DIR / filename

    if not file_path.is_file():
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(
        path=file_path,
        filename=filename
    )

@app.delete("/files/{filename}")
def delete_file(filename: str):
    file_path = UPLOAD_DIR / filename

    if not file_path.is_file():
        raise HTTPException(status_code=404, detail="File not found")

    file_path.unlink()

    return {"message": "File deleted successfully"}
