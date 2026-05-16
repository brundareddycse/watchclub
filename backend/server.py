from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fake_user = {
    "id": 1,
    "name": "Brunda",
    "email": "demo@watchclub.com"
}

@app.get("/api")
def root():
    return {"message": "Watchclub API running"}

@app.get("/api/auth/me")
def me():
    return fake_user

@app.post("/api/auth/register")
def register(data: dict):
    return {
        "id": 1,
        "name": data.get("name"),
        "email": data.get("email")
    }

@app.post("/api/auth/login")
def login(data: dict):
    return {
        "id": 1,
        "name": "Brunda",
        "email": data.get("email")
    }

@app.post("/api/auth/logout")
def logout():
    return {"ok": True}
