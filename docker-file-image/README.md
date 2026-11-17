# Task: Dockerfile & Image (`02-docker-file-image`)

This folder contains the complete setup and instructions for containerizing a lightweight Python-based HTTP server using Docker.

## 📂 Folder Structure
* `app.py` - A simple Python HTTP server script that handles incoming GET requests.
* `Dockerfile` - Multi-instruction configuration file used to build the Docker image.
* `README.md` - Documentation and execution guide for the container task.

## 🛠️ Technologies Used
* **Python 3.10-slim** (Base lightweight image)
* **Docker** (Containerization platform)

---

## 🚀 Setup and Execution Guide

### 1. Prerequisites
Ensure that Docker is installed and running on your local machine (or cloud environment).

### 2. Build the Docker Image
Open your terminal inside this folder (`02-docker-file-image`) and run the following command to build the image:
```bash
docker build -t vct-docker-task:v1 .

Run the Docker Container
Once the image is built successfully, run it as a container and map port 5000:
docker run -d -p 5000:5000 --name docker-task-container vct-docker-task:v1


Verify and Test the Application
Open your web browser or run a curl command to test the server:

URL: http://localhost:5000

Expected Response: Hello from VCT Cloud Infrastructure Docker Task!


Stop the Container (When done)
Bash
docker stop docker-task-container
docker rm docker-task-container


