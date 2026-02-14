# Tokenholic - Technical Design Document

## 1. System Overview

### 1.1 Architecture Diagram

```
                                    ┌─────────────────────┐
                                    │   Load Balancer     │
                                    │   (Nginx/ALB)       │
                                    └──────────┬──────────┘
                                               │
                    ┌──────────────────────────┼──────────────────────────┐
                    │                          │                          │
           ┌────────▼────────┐       ┌────────▼────────┐                 │
           │    Frontend     │       │    Backend      │                 │
           │  (Vite+React)   │       │   (FastAPI)     │                 │
           │    :3000        │       │    :8000        │                 │
           └─────────────────┘       └────────┬────────┘                 │
                                              │                          │
                    ┌─────────────────────────┼─────────────────────────┐│
                    │                         │                         ││
           ┌────────▼────────┐      ┌────────▼────────┐      ┌─────────▼▼────────┐
           │  AgentScope     │      │   Vector Store  │      │     Database      │
           │  Multi-Agent    │      │   (FAISS/       │      │   (PostgreSQL)    │
           │   System        │      │    Milvus)      │      │     :5432         │
           └────────┬────────┘      └─────────────────┘      └───────────────────┘
                    │
           ┌────────▼────────┐      ┌─────────────────┐      ┌───────────────────┐
           │    Bailian      │      │    AgentBay     │      │      Redis        │
           │   (LLM API)     │      │   (Sandbox)     │      │     :6379         │
           └─────────────────┘      └─────────────────┘      └───────────────────┘
```

### 1.2 Technology Stack Summary

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Frontend | React | 18.x | UI Components |
| Frontend | Vite | 5.x | Build & Dev Server |
| Frontend | TailwindCSS | 3.x | Styling |
| Frontend | Shadcn/UI | Latest | Component Library |
| Frontend | D3.js | 7.x | Data Visualization |
| Frontend | react-i18next | 14.x | Internationalization |
| Backend | Python | 3.11+ | Runtime |
| Backend | FastAPI | 0.109+ | API Framework |
| Backend | AgentScope | Latest | Agent Orchestration |
| Backend | SQLAlchemy | 2.x | ORM |
| Backend | Pydantic | 2.x | Data Validation |
| Database | PostgreSQL | 15+ | Primary Storage |
| Cache | Redis | 7.x | Caching Layer |
| Vector DB | FAISS | Latest | RAG Embeddings |
| Container | Docker | 24.x | Containerization |
| Orchestration | Docker Compose | 2.x | Local Orchestration |

---

## 2. Frontend Architecture

### 2.1 Project Structure

```
frontend/
├── public/
│   ├── locales/
│   │   ├── en/
│   │   │   └── translation.json
│   │   └── zh/
│   │       └── translation.json
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Loading.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── token-map/
│   │   │   ├── TokenMapCanvas.tsx
│   │   │   ├── TokenMapNode.tsx
│   │   │   ├── TokenMapLegend.tsx
│   │   │   └── TokenMapEditor.tsx
│   │   ├── solution/
│   │   │   ├── SolutionCard.tsx
│   │   │   ├── SolutionHistory.tsx
│   │   │   └── FeedbackInput.tsx
│   │   └── roleplay/
│   │       ├── ChatInterface.tsx
│   │       ├── ScenarioSelector.tsx
│   │       └── FeedbackPanel.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── TokenMap.tsx
│   │   ├── Solution.tsx
│   │   ├── RolePlay.tsx
│   │   └── Settings.tsx
│   ├── hooks/
│   │   ├── useTokenMap.ts
│   │   ├── useSolution.ts
│   │   ├── useRolePlay.ts
│   │   └── useApi.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── tokenMapService.ts
│   │   ├── solutionService.ts
│   │   └── rolePlayService.ts
│   ├── store/
│   │   ├── index.ts
│   │   ├── tokenMapStore.ts
│   │   ├── solutionStore.ts
│   │   └── uiStore.ts
│   ├── types/
│   │   ├── tokenMap.ts
│   │   ├── solution.ts
│   │   └── rolePlay.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── i18n/
│   │   └── config.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

### 2.2 Key Components

#### Token Map Canvas (D3.js)
```typescript
// src/components/token-map/TokenMapCanvas.tsx
interface TokenMapData {
  customer: {
    name: string;
    industry: string;
  };
  layers: {
    external: BusinessLayer[];
    internal: BusinessLayer[];
    resources: ResourceSummary;
  };
  providers: ProviderDistribution[];
  metrics: {
    totalTokens: number;
    alibabaShare: number;
    growthRate: number;
  };
}

interface BusinessLayer {
  category: string;
  useCases: UseCase[];
}

interface UseCase {
  name: string;
  model: string;
  tokens: number;  // in billions
  provider: 'alibaba' | 'volcano' | 'baidu' | 'foreign' | 'self-hosted';
  editable: boolean;
}
```

#### State Management (Zustand)
```typescript
// src/store/tokenMapStore.ts
interface TokenMapState {
  currentMap: TokenMapData | null;
  isLoading: boolean;
  isEditing: boolean;
  
  // Actions
  generateMap: (customerName: string) => Promise<void>;
  updateUseCase: (categoryId: string, useCaseId: string, data: Partial<UseCase>) => void;
  saveMap: () => Promise<void>;
  exportMap: (format: 'pdf' | 'png' | 'json') => Promise<void>;
}
```

### 2.3 Responsive Design Breakpoints

```css
/* TailwindCSS breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### 2.4 Internationalization Structure

```json
// public/locales/en/translation.json
{
  "nav": {
    "home": "Home",
    "tokenMap": "Token Battle Map",
    "solution": "Solution Recommender",
    "rolePlay": "Role Play",
    "settings": "Settings"
  },
  "tokenMap": {
    "title": "Token Battle Map",
    "generate": "Generate Map",
    "enterCompany": "Enter company name",
    "layers": {
      "external": "External Business Layer",
      "internal": "Internal Platform Layer",
      "resources": "Resource Dashboard"
    }
  }
}
```

---

## 3. Backend Architecture

### 3.1 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── config.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── token_map.py
│   │   │   ├── solution.py
│   │   │   ├── role_play.py
│   │   │   └── health.py
│   │   └── dependencies.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── customer.py
│   │   ├── token_map.py
│   │   ├── solution.py
│   │   └── role_play.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── customer.py
│   │   ├── token_map.py
│   │   ├── solution.py
│   │   └── role_play.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── token_map_service.py
│   │   ├── solution_service.py
│   │   └── role_play_service.py
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── token_map/
│   │   │   ├── __init__.py
│   │   │   ├── research_agent.py
│   │   │   ├── analysis_agent.py
│   │   │   └── visualization_agent.py
│   │   ├── solution/
│   │   │   ├── __init__.py
│   │   │   ├── query_agent.py
│   │   │   ├── retrieval_agent.py
│   │   │   └── synthesis_agent.py
│   │   └── role_play/
│   │       ├── __init__.py
│   │       ├── persona_agent.py
│   │       ├── evaluation_agent.py
│   │       └── feedback_agent.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── database.py
│   │   ├── redis.py
│   │   ├── llm.py
│   │   └── vector_store.py
│   └── utils/
│       ├── __init__.py
│       ├── web_scraper.py
│       └── text_processor.py
├── tests/
│   ├── __init__.py
│   ├── test_token_map.py
│   ├── test_solution.py
│   └── test_role_play.py
├── alembic/
│   └── versions/
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

### 3.2 API Endpoints

#### Token Map APIs
```python
# POST /api/v1/token-map/generate
# Generate a new token battle map for a customer
Request:
{
  "customer_name": "字节跳动",
  "industry": "互联网",  // optional
  "additional_info": "..."  // optional manual input
}

Response:
{
  "id": "uuid",
  "customer": {...},
  "layers": {...},
  "providers": [...],
  "metrics": {...},
  "created_at": "2026-02-13T10:00:00Z"
}

# GET /api/v1/token-map/{id}
# Retrieve a saved token map

# PUT /api/v1/token-map/{id}
# Update/edit a token map

# GET /api/v1/token-map/{id}/export?format=pdf
# Export token map to specified format
```

#### Solution APIs
```python
# POST /api/v1/solution/recommend
# Get solution recommendations
Request:
{
  "customer_id": "uuid",
  "use_case": "视频生成",
  "requirements": "需要支持1080p视频..."
}

Response:
{
  "id": "uuid",
  "recommendation": {
    "products": [...],
    "architecture": "...",
    "differentiators": [...],
    "references": [...]
  },
  "version": 1,
  "created_at": "..."
}

# POST /api/v1/solution/{id}/refine
# Refine solution based on feedback
Request:
{
  "feedback": "客户觉得价格太高，需要更经济的方案"
}

Response:
{
  "id": "uuid",
  "recommendation": {...},
  "version": 2,
  "changes": ["调整了推荐的模型规格", "..."],
  "parent_version_id": "..."
}

# GET /api/v1/solution/{id}/history
# Get all versions of a solution
```

#### Role Play APIs
```python
# POST /api/v1/role-play/start
# Start a new role play session
Request:
{
  "scenario": "discovery" | "technical" | "objection" | "executive",
  "difficulty": "easy" | "medium" | "hard",
  "customer_context": {
    "industry": "金融",
    "company_size": "large",
    "current_provider": "Azure"
  }
}

Response:
{
  "session_id": "uuid",
  "customer_persona": {...},
  "opening_message": "你好，我是XX公司的CTO..."
}

# POST /api/v1/role-play/{session_id}/respond
# Send a response in the role play
Request:
{
  "message": "感谢您的时间，我想了解一下贵公司目前的AI应用情况..."
}

Response:
{
  "customer_response": "我们目前主要在用...",
  "evaluation": {
    "score": 85,
    "strengths": ["开场白专业", "..."],
    "improvements": ["可以更多询问痛点", "..."]
  }
}

# POST /api/v1/role-play/{session_id}/end
# End session and get final feedback
```

### 3.3 Database Schema

```sql
-- Customers table
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Token Maps table
CREATE TABLE token_maps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id),
    data JSONB NOT NULL,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Solutions table
CREATE TABLE solutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id),
    use_case VARCHAR(255),
    recommendation JSONB NOT NULL,
    version INTEGER DEFAULT 1,
    parent_version_id UUID REFERENCES solutions(id),
    feedback_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Role Play Sessions table
CREATE TABLE role_play_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scenario_type VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    customer_persona JSONB,
    conversation_history JSONB DEFAULT '[]',
    final_score INTEGER,
    feedback JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_token_maps_customer ON token_maps(customer_id);
CREATE INDEX idx_solutions_customer ON solutions(customer_id);
CREATE INDEX idx_solutions_parent ON solutions(parent_version_id);
```

---

## 4. Multi-Agent System Design

### 4.1 AgentScope Integration

```python
# app/agents/token_map/research_agent.py
from agentscope.agents import AgentBase
from agentscope.message import Msg

class ResearchAgent(AgentBase):
    """Agent responsible for gathering public data about a customer."""
    
    def __init__(self, model_config_name: str = "qwen-max"):
        super().__init__(
            name="ResearchAgent",
            model_config_name=model_config_name,
            sys_prompt="""You are a research specialist focused on gathering 
            information about companies' AI and LLM usage. Your task is to:
            1. Search for public information about the company
            2. Identify their technology stack and AI initiatives
            3. Find news about their AI projects and partnerships
            4. Analyze job postings for AI/ML related roles
            """
        )
    
    def research_company(self, company_name: str) -> dict:
        """Research a company and return structured findings."""
        # Implementation using web scraping tools
        pass
```

### 4.2 Agent Communication Flow

```
Token Map Generation Flow:
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Research   │────▶│  Analysis   │────▶│Visualization│
│   Agent     │     │   Agent     │     │   Agent     │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │                   │
      ▼                   ▼                   ▼
 [Raw Data]        [Structured         [Map JSON]
                    Insights]

Role Play Flow:
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Persona   │◀───▶│  Evaluation │◀───▶│  Feedback   │
│   Agent     │     │   Agent     │     │   Agent     │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │                   │
      ▼                   ▼                   ▼
 [Customer         [Score &           [Improvement
  Response]         Analysis]          Suggestions]
```

### 4.3 LLM Configuration

```python
# app/core/llm.py
from agentscope.models import ModelWrapperBase

MODEL_CONFIGS = {
    "qwen-max-thinking": {
        "model_type": "dashscope_chat",
        "config_name": "qwen-max-thinking",
        "model_name": "qwen-max",
        "api_key": "${DASHSCOPE_API_KEY}",
        "generate_args": {
            "temperature": 0.7,
            "enable_thinking": True
        }
    },
    "glm-5": {
        "model_type": "zhipuai_chat", 
        "config_name": "glm-5",
        "model_name": "glm-5",
        "api_key": "${ZHIPUAI_API_KEY}",
        "generate_args": {
            "temperature": 0.5
        }
    },
    "embedding": {
        "model_type": "dashscope_embedding",
        "config_name": "embedding",
        "model_name": "text-embedding-v3",
        "api_key": "${DASHSCOPE_API_KEY}"
    }
}

# Admin-configurable model routing
TASK_MODEL_MAPPING = {
    "planning": "qwen-max-thinking",
    "coding": "glm-5",
    "general": "glm-5",
    "embedding": "embedding"
}
```

---

## 5. RAG System Design

### 5.1 Knowledge Base Structure

```
knowledge_base/
├── alibaba_cloud/
│   ├── products/
│   │   ├── pai.md
│   │   ├── eas.md
│   │   ├── dashscope.md
│   │   └── ...
│   ├── solutions/
│   │   ├── video_generation.md
│   │   ├── customer_service.md
│   │   └── ...
│   └── case_studies/
│       ├── case_001.md
│       └── ...
├── competitive/
│   ├── azure_openai.md
│   ├── volcano_engine.md
│   └── ...
└── metadata/
    └── index.json
```

### 5.2 Embedding & Retrieval

```python
# app/core/vector_store.py
from langchain.vectorstores import FAISS
from langchain.embeddings import DashScopeEmbeddings

class KnowledgeBase:
    def __init__(self):
        self.embeddings = DashScopeEmbeddings(
            model="text-embedding-v3"
        )
        self.vector_store = FAISS.load_local(
            "knowledge_index",
            self.embeddings
        )
    
    def search(self, query: str, k: int = 5) -> list[Document]:
        """Search knowledge base for relevant documents."""
        return self.vector_store.similarity_search(query, k=k)
    
    def add_documents(self, documents: list[Document]):
        """Add new documents to the knowledge base."""
        self.vector_store.add_documents(documents)
        self.vector_store.save_local("knowledge_index")
```

---

## 6. Deployment Configuration

### 6.1 Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://backend:8000
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/tokenholic
      - REDIS_URL=redis://redis:6379
      - DASHSCOPE_API_KEY=${DASHSCOPE_API_KEY}
      - ZHIPUAI_API_KEY=${ZHIPUAI_API_KEY}
    depends_on:
      - db
      - redis
    volumes:
      - ./knowledge_base:/app/knowledge_base

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=tokenholic
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### 6.2 Frontend Dockerfile

```dockerfile
# frontend/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
```

### 6.3 Backend Dockerfile

```dockerfile
# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Run the application
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 6.4 ECS Deployment Script

```bash
#!/bin/bash
# deploy.sh - Deploy to Alibaba Cloud ECS

set -e

ECS_HOST="your-ecs-ip"
ECS_USER="root"

echo "Building Docker images..."
docker-compose build

echo "Saving images..."
docker save tokenholic-frontend tokenholic-backend | gzip > images.tar.gz

echo "Copying to ECS..."
scp images.tar.gz docker-compose.yml .env ${ECS_USER}@${ECS_HOST}:/opt/tokenholic/

echo "Deploying on ECS..."
ssh ${ECS_USER}@${ECS_HOST} << 'EOF'
cd /opt/tokenholic
docker load < images.tar.gz
docker-compose down
docker-compose up -d
docker-compose ps
EOF

echo "Deployment complete!"
```

---

## 7. Security Considerations

### 7.1 Phase 1 Security (Demo Mode)

- No authentication required
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration for frontend origin only
- Environment variables for sensitive config

### 7.2 Future Security (Phase 2+)

- JWT-based authentication
- SSO integration (DingTalk, Aliyun)
- Role-based access control (RBAC)
- API key management for external access
- Audit logging
- Data encryption at rest

---

## 8. Monitoring & Logging

### 8.1 Logging Configuration

```python
# app/core/logging.py
import logging
import structlog

structlog.configure(
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer()
    ],
    wrapper_class=structlog.make_filtering_bound_logger(logging.INFO),
)

logger = structlog.get_logger()
```

### 8.2 Key Metrics to Track

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| API Response Time | P95 latency | > 3s |
| LLM API Latency | Time for model inference | > 10s |
| Error Rate | 5xx responses | > 1% |
| Token Map Generation Time | End-to-end time | > 60s |
| Cache Hit Rate | Redis cache effectiveness | < 50% |

---

## 9. Development Workflow

### 9.1 Local Development Setup

```bash
# Clone repository
git clone <repo-url>
cd tokenholic

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with API keys

# Frontend setup
cd ../frontend
npm install
cp .env.example .env.local

# Start services
docker-compose up -d db redis
cd backend && uvicorn app.main:app --reload
cd frontend && npm run dev
```

### 9.2 Testing Strategy

| Level | Tool | Coverage Target |
|-------|------|-----------------|
| Unit Tests | pytest | 80% |
| Integration Tests | pytest + testcontainers | Key flows |
| E2E Tests | Playwright | Critical paths |
| API Tests | pytest + httpx | All endpoints |

---

## 10. Implementation Phases

### Phase 1 Milestones (4-6 weeks)

| Week | Deliverable |
|------|-------------|
| 1 | Project setup, basic API structure, database schema |
| 2 | Token Map research agent, basic UI skeleton |
| 3 | Solution recommender with RAG, Token Map visualization |
| 4 | Role Play simulator, refinement engine |
| 5 | UI polish, responsive design, i18n |
| 6 | Testing, bug fixes, ECS deployment |

### Definition of Done (Phase 1)

- [ ] All 4 core features functional
- [ ] Bilingual UI (CN/EN)
- [ ] Responsive design working on desktop and mobile
- [ ] Deployed to Alibaba Cloud ECS
- [ ] Basic documentation complete
- [ ] Demo-ready for stakeholder review

---

*Document Version: 1.0*
*Last Updated: 2026-02-13*
*Authors: Engineering Team*
