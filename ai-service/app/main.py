from fastapi import FastAPI

from app.routes.analysis_routes import router as analysis_router

app = FastAPI(
    title="CloudSleuth AI",
    description="AI-powered cloud infrastructure analysis service",
    version="1.0.0"
)


@app.get("/")
async def root():
    return {
        "success": True,
        "message": "CloudSleuth AI Service is running 🚀"
    }


@app.get("/health")
async def health_check():
    return {
        "success": True,
        "service": "CloudSleuth AI",
        "status": "healthy"
    }


app.include_router(analysis_router)