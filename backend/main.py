from fastapi import FastAPI
from app.routes import tasks

app = FastAPI(title="Phase II Todo Full Stack Web Application Backend")

app.include_router(tasks.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Phase II Todo Full Stack Web Application Backend Running"}
