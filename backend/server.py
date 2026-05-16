import os
import bcrypt
import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
from pymongo import MongoClient
from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URL = os.getenv("MONGO_URL")
JWT_SECRET = os.getenv("JWT_SECRET")

client = MongoClient(MONGO_URL)
db = client.watchclub

users = db.users
movies = db.movies
friends = db.friends
recommendations = db.recommendations


def create_token(user_id):
    payload = {
        "id": str(user_id),
        "exp": datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


def decode_token(token):
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except:
        return None


@app.get("/api")
def root():
    return {"message": "Watchclub API running"}


@app.post("/api/auth/register")
def register(data: dict):
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    return {"ok": True}
