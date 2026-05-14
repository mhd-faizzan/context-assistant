import logging
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.auth import verify_token
from src.weather import get_weather
from src.chat import get_ai_response

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    city: str | None = None


@app.get("/api/profile")
async def get_profile(user: dict = Depends(verify_token)):
    logger.info("Profile fetched for %s", user.get("email"))
    return {
        "user_id": user.get("sub"),
        "email": user.get("email"),
        "name": user.get("name"),
    }


@app.post("/api/chat")
async def chat(request: ChatRequest, user: dict = Depends(verify_token)):
    weather_data = None
    if request.city:
        weather_data = await get_weather(request.city)

    user_name = user.get("name") or user.get("email")
    logger.info("Chat request from %s", user_name)

    response = await get_ai_response(request.message, user_name, weather_data)
    return {"response": response, "weather": weather_data}