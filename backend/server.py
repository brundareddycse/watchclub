import os
import httpx

from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
def root():
    return {
        "message": "Watchclub API running"
    }

@app.get("/api/tmdb-search")
async def tmdb_search(q: str):
    url = "https://api.themoviedb.org/3/search/multi"

    params = {
        "api_key": TMDB_API_KEY,
        "query": q,
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)

    data = response.json()

    results = []

    for item in data.get("results", [])[:10]:
        poster = item.get("poster_path")

        results.append({
            "id": item.get("id"),
            "title": item.get("title") or item.get("name"),
            "overview": item.get("overview"),
            "poster_url": (
                f"https://image.tmdb.org/t/p/w500{poster}"
                if poster else None
            ),
            "year": (
                item.get("release_date", "")[:4]
                or item.get("first_air_date", "")[:4]
            ),
        })

    return {
        "results": results
    }
