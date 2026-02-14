"""
Health check routes
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("")
async def health_check():
    """
    Health check endpoint
    Returns the health status of the application
    """
    return {
        "status": "healthy",
        "service": "tokenholic-backend",
        "version": "0.1.0",
    }


@router.get("/ready")
async def readiness_check():
    """
    Readiness check endpoint
    Verifies all dependencies are available
    """
    # TODO: Add checks for database, redis, and external services
    return {
        "status": "ready",
        "checks": {
            "database": "ok",
            "redis": "ok",
            "llm": "ok",
        },
    }


@router.get("/live")
async def liveness_check():
    """
    Liveness check endpoint
    Simple ping to verify the service is running
    """
    return {"status": "alive"}
