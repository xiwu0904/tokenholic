"""
Redis cache manager for caching LLM responses and session data
"""

import json
from typing import Optional, Any
from datetime import timedelta

import redis.asyncio as redis
from redis.asyncio import Redis

from app.core.config import get_settings

settings = get_settings()


class CacheManager:
    """Redis cache manager for caching responses and session data"""

    def __init__(self):
        self._client: Optional[Redis] = None

    async def connect(self) -> None:
        """Connect to Redis server"""
        if self._client is None:
            self._client = redis.from_url(
                settings.REDIS_URL,
                password=settings.REDIS_PASSWORD,
                encoding="utf-8",
                decode_responses=True,
            )

    async def disconnect(self) -> None:
        """Disconnect from Redis server"""
        if self._client:
            await self._client.close()
            self._client = None

    @property
    def client(self) -> Redis:
        """Get Redis client"""
        if self._client is None:
            raise RuntimeError("Redis client not connected. Call connect() first.")
        return self._client

    async def get(self, key: str) -> Optional[Any]:
        """Get value from cache"""
        value = await self.client.get(key)
        if value:
            try:
                return json.loads(value)
            except json.JSONDecodeError:
                return value
        return None

    async def set(
        self,
        key: str,
        value: Any,
        expire: Optional[int] = None,
    ) -> bool:
        """Set value in cache with optional expiration"""
        if isinstance(value, (dict, list)):
            value = json.dumps(value)
        
        ttl = expire or settings.SESSION_EXPIRE_HOURS * 3600
        return await self.client.set(key, value, ex=ttl)

    async def delete(self, key: str) -> bool:
        """Delete key from cache"""
        return await self.client.delete(key) > 0

    async def exists(self, key: str) -> bool:
        """Check if key exists"""
        return await self.client.exists(key) > 0

    async def expire(self, key: str, seconds: int) -> bool:
        """Set expiration on key"""
        return await self.client.expire(key, seconds)

    async def ttl(self, key: str) -> int:
        """Get time-to-live for key"""
        return await self.client.ttl(key)

    # LLM Response Caching
    async def get_llm_response(self, prompt_hash: str) -> Optional[dict]:
        """Get cached LLM response by prompt hash"""
        key = f"llm:{prompt_hash}"
        return await self.get(key)

    async def set_llm_response(
        self,
        prompt_hash: str,
        response: dict,
        expire: int = 86400,  # 24 hours
    ) -> bool:
        """Cache LLM response"""
        key = f"llm:{prompt_hash}"
        return await self.set(key, response, expire)

    # Session Data
    async def get_session(self, session_id: str) -> Optional[dict]:
        """Get session data"""
        key = f"session:{session_id}"
        return await self.get(key)

    async def set_session(
        self,
        session_id: str,
        data: dict,
        expire: Optional[int] = None,
    ) -> bool:
        """Set session data"""
        key = f"session:{session_id}"
        ttl = expire or settings.SESSION_EXPIRE_HOURS * 3600
        return await self.set(key, data, ttl)

    async def delete_session(self, session_id: str) -> bool:
        """Delete session data"""
        key = f"session:{session_id}"
        return await self.delete(key)

    # Rate Limiting
    async def increment_rate_limit(self, key: str, window: int = 60) -> int:
        """Increment rate limit counter and return current count"""
        current = await self.client.incr(key)
        if current == 1:
            await self.client.expire(key, window)
        return current


# Global cache manager instance
cache_manager = CacheManager()


async def get_cache() -> CacheManager:
    """Dependency for getting cache manager"""
    if cache_manager._client is None:
        await cache_manager.connect()
    return cache_manager
