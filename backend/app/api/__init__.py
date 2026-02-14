"""
API routes initialization
"""

from fastapi import APIRouter

from app.api.routes import health

api_router = APIRouter()

# Include all route modules
api_router.include_router(health.router, prefix="/health", tags=["health"])

# Future routes will be added here:
# api_router.include_router(customers.router, prefix="/customers", tags=["customers"])
# api_router.include_router(token_map.router, prefix="/token-map", tags=["token-map"])
# api_router.include_router(solution.router, prefix="/solution", tags=["solution"])
# api_router.include_router(role_play.router, prefix="/role-play", tags=["role-play"])
