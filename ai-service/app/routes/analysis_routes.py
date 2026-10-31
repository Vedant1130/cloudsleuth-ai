from fastapi import APIRouter, HTTPException
import json

from app.schemas.analysis_schema import (
    AnalysisRequest,
    AIAnalysisResponse
)

from app.services.ai_analyzer import analyze_investigation

router = APIRouter(
    prefix="/api/analysis",
    tags=["AI Analysis"]
)


@router.post("/investigation", response_model=AIAnalysisResponse)
async def analyze_cloud_investigation(
    request: AnalysisRequest
):
    try:
        investigation_data = request.model_dump()

        ai_response = await analyze_investigation(
            investigation_data
        )

        parsed_response = json.loads(ai_response)

        return AIAnalysisResponse(**parsed_response)

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=502,
            detail="Gemini returned an invalid JSON response"
        )

    except Exception as error:
     error_message = str(error)
    print(f"Analysis route error: {error_message}")

    if "503" in error_message or "UNAVAILABLE" in error_message:
        raise HTTPException(
            status_code=503,
            detail="Gemini is temporarily unavailable. Please try again later."
        )

    if "429" in error_message or "RESOURCE_EXHAUSTED" in error_message:
        raise HTTPException(
            status_code=429,
            detail="Gemini API quota or rate limit exceeded."
        )

    raise HTTPException(
        status_code=502,
        detail="Gemini analysis failed."
    )