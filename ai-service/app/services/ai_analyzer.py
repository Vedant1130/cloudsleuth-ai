import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv(
    "GEMINI_MODEL",
    "gemini-3.1-flash-lite"
)

if not GEMINI_API_KEY:
    raise ValueError(
        "GEMINI_API_KEY is missing from environment variables"
    )

client = genai.Client(api_key=GEMINI_API_KEY)

print(f"CloudSleuth AI using Gemini model: {GEMINI_MODEL}")


async def analyze_investigation(investigation_data: dict):

    prompt = f"""
    You are CloudSleuth AI, an expert cloud operations
    and infrastructure security analyst.

    Analyze the following cloud investigation data:

    {investigation_data}

    Provide analysis covering:

    1. Overall infrastructure health.
    2. Important operational and security insights.
    3. Prioritized recommendations.
    4. Overall risk assessment.

    Return ONLY valid JSON in this structure:

    {{
        "overview": "Investigation summary",
        "key_insights": [
            "Insight 1",
            "Insight 2"
        ],
        "prioritized_actions": [
            "Action 1",
            "Action 2"
        ],
        "risk_assessment": "Overall risk assessment"
    }}

    Base your analysis only on the supplied data.
    Do not invent resources, incidents, or metrics.
    """

    try:
        response = await client.aio.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config={
                "response_mime_type": "application/json"
            }
        )

        return response.text

    except Exception as error:
        print(f"Gemini analysis error: {error}")
        raise