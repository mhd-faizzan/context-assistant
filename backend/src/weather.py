import httpx
from fastapi import HTTPException


async def get_weather(city: str) -> dict:
    url = f"https://wttr.in/{city}?format=j1"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail=f"Could not fetch weather for {city}")
        data = response.json()
        current = data["current_condition"][0]
        return {
            "city": city,
            "temp_c": current["temp_C"],
            "feels_like_c": current["FeelsLikeC"],
            "description": current["weatherDesc"][0]["value"],
            "humidity": current["humidity"],
            "wind_kmph": current["windspeedKmph"]
        }