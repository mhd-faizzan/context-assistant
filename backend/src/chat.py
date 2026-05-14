import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


async def get_ai_response(user_message: str, user_name: str, weather_data: dict | None = None) -> str:
    system_prompt = f"You are a personal assistant for {user_name}. Be helpful, short and friendly."

    if weather_data:
        system_prompt += f"\n\nCurrent weather context: {weather_data}"

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]
    )
    return response.choices[0].message.content