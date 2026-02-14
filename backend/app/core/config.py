"""
Application configuration module
Handles environment variables and settings
"""

from functools import lru_cache
from typing import List, Optional

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""

    # Application
    APP_NAME: str = "Tokenholic"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True
    API_PREFIX: str = "/api/v1"

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://tokenholic:tokenholic123@localhost:5432/tokenholic"
    DATABASE_POOL_SIZE: int = 5
    DATABASE_MAX_OVERFLOW: int = 10

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    REDIS_PASSWORD: Optional[str] = None

    # LLM Configuration (Bailian/DashScope)
    DASHSCOPE_API_KEY: Optional[str] = None
    BAILIAN_API_KEY: Optional[str] = None

    # Model Configuration
    QWEN_MODEL: str = "qwen3-max-thinking"
    GLM_MODEL: str = "glm-5.0"
    EMBEDDING_MODEL: str = "text-embedding-v3"

    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:5173"

    # External APIs
    SEARCH_API_KEY: Optional[str] = None
    NEWS_API_KEY: Optional[str] = None

    # Session
    SESSION_EXPIRE_HOURS: int = 24

    @property
    def cors_origins(self) -> List[str]:
        """Parse CORS origins from comma-separated string"""
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]

    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()
