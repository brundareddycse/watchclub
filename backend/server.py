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

users = []

movies = []

friends = []

recommendations = []


@app.get("/api")
def root():
    return {
        "message": "Watchclub API running"
    }


@app.post("/api/auth/register")
def register(data: dict):

    user = {
        "id": len(users) + 1,
        "name": data.get("name"),
        "email": data.get("email"),
    }

    users.append(user)

    return {
        "token": "demo-token",
        "user": user
    }


@app.post("/api/auth/login")
def login(data: dict):

    user = {
        "id": 1,
        "name": "Watchclub User",
        "email": data.get("email"),
    }

    return {
        "token": "demo-token",
        "user": user
    }


@app.get("/api/auth/me")
def me():

    return {
        "id": 1,
        "name": "Watchclub User",
        "email": "demo@watchclub.com"
    }


@app.get("/api/library")
def get_library():

    return {
        "movies": movies
    }


@app.post("/api/library")
def add_movie(data: dict):

    movies.append(data)

    return {
        "ok": True
    }


@app.get("/api/friends")
def get_friends():

    return {
        "friends": friends
    }


@app.post("/api/friends")
def add_friend(data: dict):

    friends.append(data)

    return {
        "friend": data,
        "already": False
    }


@app.get("/api/recommendations")
def get_recommendations():

    return {
        "recommendations": recommendations
    }


@app.post("/api/recommendations")
def add_recommendation(data: dict):

    recommendations.append(data)

    return {
        "ok": True
    }


@app.get("/api/stats")
def stats():

    return {
        "totalMovies": len(movies),
        "recommendations": len(recommendations),
        "friends": len(friends)
    }
