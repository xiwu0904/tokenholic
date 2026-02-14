# Tokenholic

A comprehensive AI-powered sales enablement platform for Alibaba Cloud, featuring intelligent customer analysis and sales training tools.

## Features

- **Token Battle Map**: AI-powered analysis of customer AI/LLM usage patterns and token consumption estimates
- **Solution Recommender**: Intelligent solution recommendation engine with RAG-based knowledge retrieval
- **Role-Play Simulator**: Interactive sales training with AI-powered customer personas
- **Refinement Engine**: Iterative improvement and version control for generated content

## Tech Stack

### Backend
- Python 3.11+
- FastAPI
- SQLAlchemy + Alembic
- PostgreSQL
- Redis
- AgentScope (Multi-agent framework)
- Bailian SDK (Qwen, GLM models)

### Frontend
- React 18+
- Vite
- TypeScript
- TailwindCSS
- Zustand (State Management)
- D3.js (Visualization)
- i18next (Internationalization)

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+
- Python 3.11+

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd tokenholic

# Copy environment variables
cp .env.example .env

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Development Setup

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
uvicorn app.main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
tokenholic/
├── frontend/          # React frontend application
├── backend/           # FastAPI backend application
│   ├── app/
│   │   ├── api/       # API routes
│   │   ├── models/    # Database models
│   │   ├── schemas/   # Pydantic schemas
│   │   ├── services/  # Business logic
│   │   ├── agents/    # AI agents
│   │   └── core/      # Core utilities
│   └── tests/         # Backend tests
├── docs/              # Documentation
└── docker-compose.yml # Docker configuration
```

## License

Proprietary - Alibaba Cloud
