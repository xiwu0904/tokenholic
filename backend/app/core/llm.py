"""
LLM integration module for Bailian/DashScope
Supports Qwen and GLM models via Bailian SDK
"""

from typing import Optional, Dict, Any, List
from enum import Enum
import json

from app.core.config import get_settings

settings = get_settings()


class ModelType(str, Enum):
    """Available LLM model types"""
    QWEN_THINKING = "qwen3-max-thinking"
    QWEN_MAX = "qwen-max"
    QWEN_PLUS = "qwen-plus"
    QWEN_TURBO = "qwen-turbo"
    GLM_5 = "glm-5.0"
    GLM_4 = "glm-4"


class TaskType(str, Enum):
    """Task types for model routing"""
    RESEARCH = "research"           # Token Map research
    ANALYSIS = "analysis"           # Token Map analysis
    VISUALIZATION = "visualization" # Token Map visualization
    QUERY = "query"                 # Solution query processing
    RETRIEVAL = "retrieval"         # Solution retrieval
    SYNTHESIS = "synthesis"         # Solution synthesis
    PERSONA = "persona"             # Role play persona
    EVALUATION = "evaluation"       # Role play evaluation


# Task to model mapping
TASK_MODEL_MAP: Dict[TaskType, ModelType] = {
    TaskType.RESEARCH: ModelType.QWEN_THINKING,
    TaskType.ANALYSIS: ModelType.QWEN_MAX,
    TaskType.VISUALIZATION: ModelType.QWEN_TURBO,
    TaskType.QUERY: ModelType.QWEN_MAX,
    TaskType.RETRIEVAL: ModelType.QWEN_PLUS,
    TaskType.SYNTHESIS: ModelType.QWEN_THINKING,
    TaskType.PERSONA: ModelType.QWEN_MAX,
    TaskType.EVALUATION: ModelType.QWEN_MAX,
}


class LLMConfig:
    """LLM configuration for different models"""
    
    def __init__(self):
        self.dashscope_api_key = settings.DASHSCOPE_API_KEY
        self.bailian_api_key = settings.BAILIAN_API_KEY
        
        # Model configurations
        self.models = {
            ModelType.QWEN_THINKING: {
                "name": "qwen3-max-thinking",
                "provider": "dashscope",
                "max_tokens": 8192,
                "temperature": 0.7,
                "enable_thinking": True,
            },
            ModelType.QWEN_MAX: {
                "name": "qwen-max",
                "provider": "dashscope",
                "max_tokens": 8192,
                "temperature": 0.7,
            },
            ModelType.QWEN_PLUS: {
                "name": "qwen-plus",
                "provider": "dashscope",
                "max_tokens": 4096,
                "temperature": 0.7,
            },
            ModelType.QWEN_TURBO: {
                "name": "qwen-turbo",
                "provider": "dashscope",
                "max_tokens": 4096,
                "temperature": 0.7,
            },
            ModelType.GLM_5: {
                "name": "glm-5.0",
                "provider": "bailian",
                "max_tokens": 8192,
                "temperature": 0.7,
            },
            ModelType.GLM_4: {
                "name": "glm-4",
                "provider": "bailian",
                "max_tokens": 4096,
                "temperature": 0.7,
            },
        }
    
    def get_model_for_task(self, task: TaskType) -> ModelType:
        """Get the appropriate model for a task"""
        return TASK_MODEL_MAP.get(task, ModelType.QWEN_MAX)
    
    def get_model_config(self, model: ModelType) -> Dict[str, Any]:
        """Get configuration for a specific model"""
        return self.models.get(model, self.models[ModelType.QWEN_MAX])


class BaseLLMClient:
    """Base class for LLM clients"""
    
    def __init__(self, config: LLMConfig):
        self.config = config
    
    async def generate(
        self,
        prompt: str,
        model: ModelType,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        **kwargs,
    ) -> str:
        """Generate text completion"""
        raise NotImplementedError("Subclasses must implement generate()")
    
    async def generate_with_history(
        self,
        messages: List[Dict[str, str]],
        model: ModelType,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        **kwargs,
    ) -> str:
        """Generate with conversation history"""
        raise NotImplementedError("Subclasses must implement generate_with_history()")


class DashScopeClient(BaseLLMClient):
    """Client for Alibaba DashScope (Qwen models)"""
    
    async def generate(
        self,
        prompt: str,
        model: ModelType,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        **kwargs,
    ) -> str:
        """Generate text using DashScope API"""
        # TODO: Implement actual DashScope API call
        # This is a placeholder implementation
        model_config = self.config.get_model_config(model)
        
        # Placeholder response
        return f"[DashScope {model.value} Response] This is a placeholder for: {prompt[:100]}..."
    
    async def generate_with_history(
        self,
        messages: List[Dict[str, str]],
        model: ModelType,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        **kwargs,
    ) -> str:
        """Generate with conversation history using DashScope"""
        # TODO: Implement actual DashScope API call
        last_message = messages[-1]["content"] if messages else ""
        return f"[DashScope {model.value}] Response to: {last_message[:100]}..."


class BailianClient(BaseLLMClient):
    """Client for Bailian (GLM models)"""
    
    async def generate(
        self,
        prompt: str,
        model: ModelType,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        **kwargs,
    ) -> str:
        """Generate text using Bailian API"""
        # TODO: Implement actual Bailian API call
        return f"[Bailian {model.value} Response] This is a placeholder for: {prompt[:100]}..."
    
    async def generate_with_history(
        self,
        messages: List[Dict[str, str]],
        model: ModelType,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        **kwargs,
    ) -> str:
        """Generate with conversation history using Bailian"""
        # TODO: Implement actual Bailian API call
        last_message = messages[-1]["content"] if messages else ""
        return f"[Bailian {model.value}] Response to: {last_message[:100]}..."


class LLMService:
    """Main LLM service for generating completions"""
    
    def __init__(self):
        self.config = LLMConfig()
        self.dashscope_client = DashScopeClient(self.config)
        self.bailian_client = BailianClient(self.config)
    
    def _get_client(self, model: ModelType) -> BaseLLMClient:
        """Get the appropriate client for a model"""
        model_config = self.config.get_model_config(model)
        provider = model_config.get("provider", "dashscope")
        
        if provider == "bailian":
            return self.bailian_client
        return self.dashscope_client
    
    async def generate(
        self,
        prompt: str,
        task: Optional[TaskType] = None,
        model: Optional[ModelType] = None,
        **kwargs,
    ) -> str:
        """Generate text completion"""
        if model is None and task:
            model = self.config.get_model_for_task(task)
        elif model is None:
            model = ModelType.QWEN_MAX
        
        client = self._get_client(model)
        return await client.generate(prompt, model, **kwargs)
    
    async def generate_with_history(
        self,
        messages: List[Dict[str, str]],
        task: Optional[TaskType] = None,
        model: Optional[ModelType] = None,
        **kwargs,
    ) -> str:
        """Generate with conversation history"""
        if model is None and task:
            model = self.config.get_model_for_task(task)
        elif model is None:
            model = ModelType.QWEN_MAX
        
        client = self._get_client(model)
        return await client.generate_with_history(messages, model, **kwargs)


# Global LLM service instance
llm_service = LLMService()


async def get_llm_service() -> LLMService:
    """Dependency for getting LLM service"""
    return llm_service
