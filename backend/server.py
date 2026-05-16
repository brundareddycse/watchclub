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
        return jwt.decode(
            token,
            JWT_SECRET,
            algorithms=["HS256"]
        )
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

    existing = users.find_one({"email": email})

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed = bcrypt.hashpw(
        password.encode(),
        bcrypt.gensalt()
    ).decode()

    user = {
        "name": name,
        "email": email,
        "password": hashed
    }

    inserted = users.insert_one(user)

    token = create_token(inserted.inserted_id)

    return {
        "token": token,
        "user": {
            "id": str(inserted.inserted_id),
            "name": name,
            "email": email
        }
    }


@app.post("/api/auth/login")
def login(data: dict):

    email = data.get("email")
    password = data.get("password")

    user = users.find_one({"email": email})

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    valid = bcrypt.checkpw(
        password.encode(),
        user["password"].encode()
    )

    if not valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_token(user["_id"])

    return {
        "token": token,
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        }
    }


@app.get("/api/auth/me")
def me(authorization: str = Header(None)):

    if not authorization:
        raise HTTPException(401, "Unauthorized")

    token = authorization.replace("Bearer ", "")

    payload = decode_token(token)

    if not payload:
        raise HTTPException(401, "Invalid token")

    user = users.find_one({
        "_id": payload["id"]
    })

    if not user:
        raise HTTPException(404, "User not found")

    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"]
    }


@app.get("/api/library")
def get_library():

    data = list(
        movies.find({}, {"_id": 0})
    )

    return {"movies": data}


@app.post("/api/library")
def add_movie(data: dict):

    movies.insert_one(data)

    return {"ok": True}


@app.get("/api/stats")
def stats():

    return {
        "totalMovies": movies.count_documents({}),
        "recommendations": recommendations.count_documents({}),
        "friends": friends.count_documents({})
    }


@app.get("/api/friends")
def get_friends():

    data = list(
        friends.find({}, {"_id": 0})
    )

    return {"friends": data}


@app.post("/api/friends")
def add_friend(data: dict):

    friends.insert_one(data)

    return {
        "friend": data,
        "already": False
    }


@app.get("/api/recommendations")
def get_recommendations():

    data = list(
        recommendations.find({}, {"_id": 0})
    )

    return {"recommendations": data}


@app.post("/api/recommendations")
def add_recommendation(data: dict):

    recommendations.insert_one(data)

    return {"ok": True}
