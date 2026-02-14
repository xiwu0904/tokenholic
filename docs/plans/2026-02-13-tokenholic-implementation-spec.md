# Tokenholic - Implementation Specification

## Overview

This document provides a detailed breakdown of implementation tasks for Tokenholic Phase 1. Each task includes acceptance criteria, dependencies, and estimated effort to enable tracking and progress monitoring.

> **Development Strategy: UI-First Approach**
> 
> This project follows a UI-first development methodology to validate user experience, features, and intended outcomes before implementing backend logic. Frontend UI will be built with mock data first, then connected to real backend APIs.

---

## Implementation Phases

| Phase | Focus | Duration | Status |
|-------|-------|----------|--------|
| **Phase 1.1** | Project Setup & Infrastructure | Week 1 | ✅ Complete |
| **Phase 1.2** | Frontend Foundation | Week 1-2 | 🔲 Not Started |
| **Phase 1.3** | UI: Token Battle Map | Week 2 | 🔲 Not Started |
| **Phase 1.4** | UI: Solution Recommender | Week 2-3 | 🔲 Not Started |
| **Phase 1.5** | UI: Role-Play Simulator | Week 3 | 🔲 Not Started |
| **Phase 1.6** | UI: Settings & Refinement | Week 3 | 🔲 Not Started |
| **Phase 1.7** | Backend Core & Agents | Week 4-5 | 🔲 Not Started |
| **Phase 1.8** | Integration & Polish | Week 5-6 | 🔲 Not Started |
| **Phase 1.9** | Deployment | Week 6 | 🔲 Not Started |

---

## Phase 1.1: Project Setup & Infrastructure ✅

### TASK-001: Initialize Monorepo Structure
**Priority:** P0 | **Effort:** 2h | **Status:** ✅

**Description:**
Create the root project structure with frontend and backend directories.

**Deliverables:**
```
tokenholic/
├── frontend/
├── backend/
├── docs/
├── docker-compose.yml
├── .gitignore
├── .env.example
└── README.md
```

**Acceptance Criteria:**
- [ ] Git repository initialized
- [ ] Directory structure created
- [ ] .gitignore configured for Python and Node.js
- [ ] Basic README with project description

**Dependencies:** None

---

### TASK-002: Setup Backend Project (FastAPI + Python)
**Priority:** P0 | **Effort:** 4h | **Status:** ✅

**Description:**
Initialize the Python backend with FastAPI, project structure, and dependencies.

**Deliverables:**
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
│   │   │   └── health.py
│   │   └── dependencies.py
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── agents/
│   ├── core/
│   │   ├── __init__.py
│   │   ├── database.py
│   │   └── config.py
│   └── utils/
├── tests/
├── requirements.txt
├── requirements-dev.txt
├── Dockerfile
├── .env.example
└── alembic.ini
```

**Acceptance Criteria:**
- [ ] FastAPI app runs with `uvicorn app.main:app --reload`
- [ ] Health check endpoint returns `{"status": "healthy"}`
- [ ] Environment variable loading works
- [ ] Basic test structure in place

**Dependencies:** TASK-001

---

### TASK-003: Setup Frontend Project (Vite + React)
**Priority:** P0 | **Effort:** 4h | **Status:** ✅

**Description:**
Initialize the React frontend with Vite, TailwindCSS, and base configuration.

**Deliverables:**
```
frontend/
├── public/
│   └── locales/
│       ├── en/
│       │   └── translation.json
│       └── zh/
│           └── translation.json
├── src/
│   ├── components/
│   │   ├── common/
│   │   └── layout/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── types/
│   ├── utils/
│   ├── i18n/
│   │   └── config.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── Dockerfile
```

**Acceptance Criteria:**
- [ ] `npm run dev` starts development server
- [ ] TailwindCSS working
- [ ] TypeScript configured
- [ ] i18n setup with EN/ZH translations
- [ ] Basic responsive layout component

**Dependencies:** TASK-001

---

### TASK-004: Setup Database (PostgreSQL)
**Priority:** P0 | **Effort:** 3h | **Status:** ✅

**Description:**
Configure PostgreSQL database with SQLAlchemy ORM and Alembic migrations.

**Deliverables:**
- Database connection module
- Alembic migration setup
- Initial schema migration
- Database models for core entities

**Acceptance Criteria:**
- [ ] PostgreSQL container starts via docker-compose
- [ ] SQLAlchemy connects to database
- [ ] Alembic migrations run successfully
- [ ] Base models created (Customer, TokenMap, Solution, RolePlaySession)

**Dependencies:** TASK-002

---

### TASK-005: Setup Redis Cache
**Priority:** P1 | **Effort:** 2h | **Status:** ✅

**Description:**
Configure Redis for caching LLM responses and session data.

**Deliverables:**
- Redis connection module
- Cache utility functions
- Docker compose configuration

**Acceptance Criteria:**
- [ ] Redis container starts via docker-compose
- [ ] Cache set/get operations work
- [ ] TTL-based expiration configured

**Dependencies:** TASK-002

---

### TASK-006: Configure LLM Integration (Bailian)
**Priority:** P0 | **Effort:** 4h | **Status:** ✅

**Description:**
Set up Bailian SDK for accessing Qwen and GLM models.

**Deliverables:**
```python
# app/core/llm.py
- Model configuration dictionary
- Task-to-model routing
- Admin-configurable model assignment
- Wrapper classes for each model type
```

**Acceptance Criteria:**
- [ ] Can call Qwen3-Max-thinking model
- [ ] Can call GLM 5.0 model
- [ ] Model routing based on task type
- [ ] Error handling for API failures
- [ ] Configuration via environment variables

**Dependencies:** TASK-002

---

### TASK-007: Setup AgentScope Framework
**Priority:** P0 | **Effort:** 4h | **Status:** ✅

**Description:**
Initialize AgentScope framework for multi-agent system.

**Deliverables:**
```python
# app/agents/
├── __init__.py
├── base.py          # Base agent configuration
├── token_map/
│   └── __init__.py
├── solution/
│   └── __init__.py
└── role_play/
    └── __init__.py
```

**Acceptance Criteria:**
- [ ] AgentScope initialized with model configs
- [ ] Base agent class created
- [ ] Agent directories structured by feature
- [ ] Simple test agent responds correctly

**Dependencies:** TASK-006

---

### TASK-008: Docker Compose Full Stack
**Priority:** P1 | **Effort:** 3h | **Status:** ✅

**Description:**
Create complete docker-compose configuration for all services.

**Deliverables:**
```yaml
# docker-compose.yml
services:
  - frontend
  - backend
  - db (PostgreSQL)
  - redis
```

**Acceptance Criteria:**
- [ ] `docker-compose up` starts all services
- [ ] Frontend accessible at localhost:3000
- [ ] Backend accessible at localhost:8000
- [ ] Database and Redis properly networked
- [ ] Environment variables properly passed

**Dependencies:** TASK-002, TASK-003, TASK-004, TASK-005

---

## Phase 1.2: Frontend Foundation

> **Goal:** Build the foundation UI components with mock data support before feature-specific UI.

### TASK-009: Implement Layout Components
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Create base layout components for the application.

**Deliverables:**
```typescript
// src/components/layout/
- MainLayout.tsx      // Main app wrapper
- Header.tsx          // Top navigation
- Sidebar.tsx         // Side navigation
- MobileNav.tsx       // Mobile navigation
```

**Acceptance Criteria:**
- [ ] Responsive layout (mobile/tablet/desktop)
- [ ] Collapsible sidebar on desktop
- [ ] Bottom navigation on mobile
- [ ] Language switcher in header
- [ ] Dark/light mode toggle

**Dependencies:** TASK-003

---

### TASK-010: Implement Common UI Components
**Priority:** P0 | **Effort:** 6h | **Status:** 🔲

**Description:**
Create reusable UI components using Shadcn/UI.

**Deliverables:**
```typescript
// src/components/common/
- Button.tsx
- Card.tsx
- Modal.tsx
- Input.tsx
- Select.tsx
- Loading.tsx
- Toast.tsx
- Tabs.tsx
- Badge.tsx
- Skeleton.tsx
```

**Acceptance Criteria:**
- [ ] All components follow design system
- [ ] Fully accessible (ARIA)
- [ ] Support loading/disabled states
- [ ] Responsive on all breakpoints

**Dependencies:** TASK-003

---

### TASK-011: Setup State Management with Mock Data
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Configure Zustand stores with mock data support for UI development.

**Deliverables:**
```typescript
// src/store/
- index.ts
- uiStore.ts           // UI state (sidebar, modals)
- tokenMapStore.ts     // Token map state + mock data
- solutionStore.ts     // Solution state + mock data
- rolePlayStore.ts     // Role play state + mock data
// src/mocks/
- mockData.ts          // Mock data generators
- mockTokenMap.ts      // Sample token map data
- mockSolution.ts      // Sample solution data
- mockRolePlay.ts      // Sample role play data
```

**Acceptance Criteria:**
- [ ] Stores properly typed with TypeScript
- [ ] Realistic mock data for each feature
- [ ] Persist critical state to localStorage
- [ ] DevTools integration

**Dependencies:** TASK-003

---

### TASK-012: Setup Mock API Service Layer
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Create API service layer with mock responses for UI development.

**Deliverables:**
```typescript
// src/services/
- api.ts               // Axios instance, interceptors
- mockApi.ts           // Mock API handler
- tokenMapService.ts   // Token map API (mock mode)
- solutionService.ts   // Solution API (mock mode)
- rolePlayService.ts   // Role play API (mock mode)
```

**Acceptance Criteria:**
- [ ] Mock mode toggle via VITE_MOCK_API env var
- [ ] Realistic mock data with simulated delays
- [ ] TypeScript types for all responses
- [ ] Easy switch to real API later

**Dependencies:** TASK-003, TASK-011

---

### TASK-013: Implement Page Routing
**Priority:** P0 | **Effort:** 2h | **Status:** 🔲

**Description:**
Setup React Router with all application pages.

**Routes:**
- `/` - Home/Dashboard
- `/token-map` - Token Map feature
- `/token-map/:id` - View specific map
- `/solution` - Solution Recommender
- `/solution/:id` - View specific solution
- `/role-play` - Role Play Simulator
- `/role-play/:sessionId` - Active session
- `/settings` - Settings page

**Acceptance Criteria:**
- [ ] All routes configured
- [ ] Page transitions smooth
- [ ] 404 page for unknown routes
- [ ] Browser back/forward works
- [ ] URL reflects current state

**Dependencies:** TASK-009

---

## Phase 1.3: UI - Token Battle Map

> **Goal:** Build complete Token Map UI with mock data to validate visualization and UX.

### TASK-014: Token Map Canvas Component
**Priority:** P0 | **Effort:** 12h | **Status:** 🔲

**Description:**
Implement the main Token Map visualization using D3.js or React Flow.

**Deliverables:**
```typescript
// src/components/token-map/
- TokenMapCanvas.tsx       // Main visualization canvas
- TokenMapLayer.tsx        // Business layer row
- TokenMapNode.tsx         // Use case node
- TokenMapLegend.tsx       // Provider legend
- TokenMapMetrics.tsx      // Side metrics panel
```

**Visual Requirements:**
- Match reference image layout (业务白板图)
- Color coding by provider (Azure=blue, AWS=orange, Alibaba=red)
- Token consumption numbers displayed
- Layer organization (External, Internal, Resources)

**Acceptance Criteria:**
- [ ] Renders complete map from mock JSON data
- [ ] Click to drill down on use cases
- [ ] Zoom and pan on large maps
- [ ] Provider color coding matches spec
- [ ] Responsive sizing
- [ ] Smooth animations

**Dependencies:** TASK-011, TASK-012

---

### TASK-015: Token Map Editor Component
**Priority:** P1 | **Effort:** 6h | **Status:** 🔲

**Description:**
Implement light editing capabilities for Token Map.

**Deliverables:**
```typescript
// src/components/token-map/
- TokenMapEditor.tsx       // Edit mode wrapper
- EditNodeModal.tsx        // Edit single node
- AddNoteOverlay.tsx       // Add notes to map
```

**Editing Capabilities:**
- Edit token estimates
- Change provider attribution
- Add/remove use cases
- Add notes/annotations
- Undo/redo support

**Acceptance Criteria:**
- [ ] Toggle between view and edit mode
- [ ] Inline editing for numbers
- [ ] Provider dropdown selection
- [ ] Changes saved to store (mock persistence)
- [ ] Undo last 10 actions

**Dependencies:** TASK-014

---

### TASK-016: Token Map Generation Page
**Priority:** P0 | **Effort:** 6h | **Status:** 🔲

**Description:**
Implement the full Token Map page with generation flow UI.

**Deliverables:**
```typescript
// src/pages/TokenMapPage.tsx
- Company input form
- Generation progress indicator (animated)
- Map display with canvas
- Export options
- History sidebar
```

**User Flow (with mock data):**
1. Enter company name (+ optional details)
2. Click Generate
3. See progress animation (research → analysis → visualization)
4. View completed map (from mock data)
5. Edit if needed
6. Export or save

**Acceptance Criteria:**
- [ ] Company input with validation
- [ ] Animated generation progress (simulated)
- [ ] Display mock map after "generation"
- [ ] List of previously generated maps (mock)
- [ ] Export UI ready (PDF/PNG buttons)

**Dependencies:** TASK-014, TASK-015, TASK-012

---

### TASK-017: Token Map Export Feature
**Priority:** P1 | **Effort:** 4h | **Status:** 🔲

**Description:**
Implement export functionality for Token Maps.

**Export Formats:**
- PNG - Image of the map
- PDF - Formatted report with map
- JSON - Raw data for further processing

**Acceptance Criteria:**
- [ ] PNG export captures full map
- [ ] PDF includes header, map, and summary
- [ ] JSON export matches expected schema
- [ ] Download triggers correctly
- [ ] Loading state during generation

**Dependencies:** TASK-016

---

## Phase 1.4: UI - Solution Recommender

> **Goal:** Build complete Solution Recommender UI with mock data.

### TASK-018: Solution Input Component
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Create the solution query input interface.

**Deliverables:**
```typescript
// src/components/solution/
- SolutionInput.tsx        // Main input form
- UseCaseSelector.tsx      // Pre-defined use cases
- ContextDisplay.tsx       // Show customer context
```

**Acceptance Criteria:**
- [ ] Free-text input for requirements
- [ ] Optional use case category selection
- [ ] Link to customer (if exists)
- [ ] Clear input validation
- [ ] Submit triggers mock API call

**Dependencies:** TASK-010, TASK-012

---

### TASK-019: Solution Display Component
**Priority:** P0 | **Effort:** 6h | **Status:** 🔲

**Description:**
Create the solution recommendation display.

**Deliverables:**
```typescript
// src/components/solution/
- SolutionCard.tsx         // Main recommendation display
- ProductList.tsx          // Recommended products
- ArchitectureDiagram.tsx  // Visual architecture
- SourceCitations.tsx      // Knowledge base sources
```

**Acceptance Criteria:**
- [ ] Clear product recommendations
- [ ] Expandable sections for details
- [ ] Source citations with links
- [ ] Copy to clipboard option
- [ ] Share functionality

**Dependencies:** TASK-010

---

### TASK-020: Solution Refinement Component
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Create the feedback and refinement interface.

**Deliverables:**
```typescript
// src/components/solution/
- FeedbackInput.tsx        // Text input for feedback
- VersionHistory.tsx       // List of versions
- VersionDiff.tsx          // Compare versions
```

**Acceptance Criteria:**
- [ ] Text area for feedback input
- [ ] Submit triggers refinement (mock)
- [ ] Version list shows all iterations
- [ ] Can view any previous version
- [ ] Diff highlights changes

**Dependencies:** TASK-019

---

### TASK-021: Solution Recommender Page
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Implement the full Solution Recommender page.

**Deliverables:**
```typescript
// src/pages/SolutionPage.tsx
- Input section
- Solution display
- Refinement sidebar
- History panel
```

**User Flow (with mock data):**
1. Select customer or start fresh
2. Enter requirements
3. View recommendation (mock)
4. Input feedback if needed
5. View refined solution (mock)
6. Save or export

**Acceptance Criteria:**
- [ ] End-to-end flow works with mock data
- [ ] Persists to localStorage
- [ ] Can resume previous solutions
- [ ] Mobile-friendly layout

**Dependencies:** TASK-018, TASK-019, TASK-020

---

## Phase 1.5: UI - Role-Play Simulator

> **Goal:** Build complete Role-Play UI with mock AI responses.

### TASK-022: Scenario Selector Component
**Priority:** P0 | **Effort:** 3h | **Status:** 🔲

**Description:**
Create the scenario selection interface.

**Deliverables:**
```typescript
// src/components/roleplay/
- ScenarioSelector.tsx     // Scenario cards
- DifficultyPicker.tsx     // Difficulty levels
- CustomerContextForm.tsx  // Optional context
```

**Scenarios:**
- Customer Discovery
- Technical Deep-Dive
- Objection Handling
- Executive Pitch

**Acceptance Criteria:**
- [ ] Visual cards for each scenario
- [ ] Description of what to expect
- [ ] Difficulty selection (Easy/Medium/Hard)
- [ ] Optional customer context input
- [ ] Start button initiates session

**Dependencies:** TASK-010

---

### TASK-023: Chat Interface Component
**Priority:** P0 | **Effort:** 8h | **Status:** 🔲

**Description:**
Create the role-play chat interface.

**Deliverables:**
```typescript
// src/components/roleplay/
- ChatInterface.tsx        // Main chat container
- MessageBubble.tsx        // Chat message
- TypingIndicator.tsx      // AI typing indicator
- ChatInput.tsx            // User input area
```

**Acceptance Criteria:**
- [ ] Real-time chat experience
- [ ] Distinguish user vs customer messages
- [ ] Typing indicator while "AI responds"
- [ ] Auto-scroll to latest message
- [ ] Input supports multiline
- [ ] Mobile keyboard handling

**Dependencies:** TASK-010, TASK-012

---

### TASK-024: Evaluation Panel Component
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Create the real-time feedback panel.

**Deliverables:**
```typescript
// src/components/roleplay/
- EvaluationPanel.tsx      // Sidebar panel
- ScoreDisplay.tsx         // Current score
- FeedbackList.tsx         // Strengths/improvements
- SessionSummary.tsx       // End-of-session summary
```

**Acceptance Criteria:**
- [ ] Shows score after each response (mock)
- [ ] Lists strengths (green)
- [ ] Lists improvements (yellow)
- [ ] Final summary at session end
- [ ] Option to review full conversation

**Dependencies:** TASK-010

---

### TASK-025: Role-Play Page
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Implement the full Role-Play Simulator page.

**Deliverables:**
```typescript
// src/pages/RolePlayPage.tsx
- Scenario selection (initial state)
- Active chat session
- Evaluation sidebar
- Session history
```

**User Flow (with mock data):**
1. Select scenario and difficulty
2. Optionally add customer context
3. Start conversation
4. Chat with mock AI customer
5. Receive mock feedback after each message
6. End session for final summary
7. Review past sessions

**Acceptance Criteria:**
- [ ] Smooth state transitions
- [ ] Session persisted on refresh
- [ ] Can end session early
- [ ] History shows past sessions
- [ ] Mobile-optimized chat

**Dependencies:** TASK-022, TASK-023, TASK-024

---

## Phase 1.6: UI - Settings & Refinement

> **Goal:** Build settings page and reusable refinement components.

### TASK-026: Version History Component
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Create a reusable version history component.

**Deliverables:**
```typescript
// src/components/common/
- VersionTimeline.tsx      // Timeline of versions
- VersionCard.tsx          // Version summary
- DiffViewer.tsx           // Side-by-side diff
```

**Acceptance Criteria:**
- [ ] Timeline shows all versions
- [ ] Click to view any version
- [ ] Compare any two versions
- [ ] Rollback to previous version
- [ ] Works for Token Maps and Solutions

**Dependencies:** TASK-010

---

### TASK-027: Settings Page
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Implement the settings page for user preferences.

**Deliverables:**
```typescript
// src/pages/SettingsPage.tsx
- API Key configuration section
- Language preference (EN/ZH)
- Theme preference (dark/light)
- Data management (export/clear)
```

**Acceptance Criteria:**
- [ ] API key input with secure storage
- [ ] Language switcher works
- [ ] Theme toggle works
- [ ] Export all user data
- [ ] Clear local data option

**Dependencies:** TASK-009, TASK-010

---

## Phase 1.7: Backend Core & Agents

> **Goal:** Implement backend APIs and AI agents to replace mock data.

### TASK-028: Implement Customer CRUD APIs
**Priority:** P0 | **Effort:** 3h | **Status:** 🔲

**Description:**
Create REST APIs for customer management.

**Endpoints:**
- `POST /api/v1/customers` - Create customer
- `GET /api/v1/customers` - List customers
- `GET /api/v1/customers/{id}` - Get customer
- `PUT /api/v1/customers/{id}` - Update customer
- `DELETE /api/v1/customers/{id}` - Delete customer

**Acceptance Criteria:**
- [ ] All CRUD operations work
- [ ] Proper validation with Pydantic schemas
- [ ] Error handling for not found, duplicates
- [ ] Unit tests for each endpoint

**Dependencies:** TASK-004

---

### TASK-029: Implement Web Scraping Utilities
**Priority:** P0 | **Effort:** 6h | **Status:** 🔲

**Description:**
Create utilities for gathering public data about companies.

**Deliverables:**
```python
# app/utils/web_scraper.py
- search_company_info(company_name: str) -> dict
- scrape_company_website(url: str) -> dict
- search_news(company_name: str) -> list
- search_job_postings(company_name: str) -> list
- search_github_repos(company_name: str) -> list
```

**Acceptance Criteria:**
- [ ] Search engine integration (via API or scraping)
- [ ] Website content extraction
- [ ] News article retrieval
- [ ] Job posting analysis
- [ ] Rate limiting and retry logic
- [ ] Error handling for unavailable sources

**Dependencies:** TASK-002

---

### TASK-030: Token Map Research Agent
**Priority:** P0 | **Effort:** 8h | **Status:** 🔲

**Description:**
Implement the research agent that gathers company AI/LLM usage data.

**Deliverables:**
```python
# app/agents/token_map/research_agent.py
class ResearchAgent(AgentBase):
    def research_company(company_name: str) -> ResearchResults
    def identify_ai_usage(data: dict) -> list[AIUsageCase]
    def estimate_token_consumption(usage: AIUsageCase) -> TokenEstimate
```

**Acceptance Criteria:**
- [ ] Gathers data from multiple public sources
- [ ] Identifies AI/LLM use cases
- [ ] Estimates token consumption
- [ ] Identifies cloud providers being used
- [ ] Returns structured research results
- [ ] Handles missing/incomplete data gracefully

**Dependencies:** TASK-007, TASK-029

---

### TASK-031: Token Map Analysis Agent
**Priority:** P0 | **Effort:** 6h | **Status:** 🔲

**Description:**
Implement the analysis agent that processes research data into insights.

**Deliverables:**
```python
# app/agents/token_map/analysis_agent.py
class AnalysisAgent(AgentBase):
    def analyze_research(data: ResearchResults) -> AnalysisResults
    def categorize_use_cases(use_cases: list) -> dict
    def calculate_provider_distribution() -> ProviderDistribution
    def identify_opportunities() -> list[Opportunity]
```

**Acceptance Criteria:**
- [ ] Categorizes use cases by business function
- [ ] Calculates token distribution by provider
- [ ] Identifies Alibaba Cloud opportunities
- [ ] Estimates growth projections
- [ ] Confidence scores for estimates

**Dependencies:** TASK-030

---

### TASK-032: Token Map Visualization Agent
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Implement the visualization agent that generates map data structure.

**Deliverables:**
```python
# app/agents/token_map/visualization_agent.py
class VisualizationAgent(AgentBase):
    def generate_map_data(analysis: AnalysisResults) -> TokenMapData
    def format_for_ui(data: TokenMapData) -> dict
```

**Acceptance Criteria:**
- [ ] Generates structured JSON for frontend visualization
- [ ] Includes all required fields (layers, providers, metrics)
- [ ] Handles missing data with defaults
- [ ] Output matches frontend data contract

**Dependencies:** TASK-031

---

### TASK-033: Token Map API Endpoints
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Create REST APIs for Token Map feature.

**Endpoints:**
- `POST /api/v1/token-map/generate` - Generate new map
- `GET /api/v1/token-map/{id}` - Get saved map
- `PUT /api/v1/token-map/{id}` - Update map (light editing)
- `GET /api/v1/token-map/{id}/export` - Export map
- `GET /api/v1/token-map/customer/{customer_id}` - List maps for customer

**Acceptance Criteria:**
- [ ] All endpoints functional
- [ ] Async generation with status polling or WebSocket
- [ ] Export formats: JSON, PDF (basic)
- [ ] Version tracking on updates
- [ ] Integration tests

**Dependencies:** TASK-030, TASK-031, TASK-032

---

### TASK-034: Setup RAG Vector Store
**Priority:** P0 | **Effort:** 6h | **Status:** 🔲

**Description:**
Initialize FAISS vector store and embed initial knowledge base.

**Deliverables:**
```python
# app/core/vector_store.py
class KnowledgeBase:
    def __init__(index_path: str)
    def search(query: str, k: int) -> list[Document]
    def add_documents(docs: list[Document])
    def update_index()
```

**Initial Knowledge Base:**
```
knowledge_base/
├── alibaba_cloud/
│   ├── products/    # 10-15 key product docs
│   └── solutions/   # 5-10 solution templates
└── index.json
```

**Acceptance Criteria:**
- [ ] FAISS index created and persisted
- [ ] Embedding generation with DashScope
- [ ] Similarity search returns relevant results
- [ ] Initial knowledge base documents embedded
- [ ] Index can be updated without full rebuild

**Dependencies:** TASK-006

---

### TASK-035: Solution Query Agent
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Implement agent that processes user solution queries.

**Deliverables:**
```python
# app/agents/solution/query_agent.py
class QueryAgent(AgentBase):
    def process_query(query: str, context: dict) -> ProcessedQuery
    def extract_requirements(query: ProcessedQuery) -> Requirements
```

**Acceptance Criteria:**
- [ ] Extracts key requirements from natural language
- [ ] Identifies use case category
- [ ] Handles ambiguous queries with clarification
- [ ] Supports both CN and EN input

**Dependencies:** TASK-007

---

### TASK-036: Solution Retrieval Agent
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Implement agent that searches knowledge base for relevant solutions.

**Deliverables:**
```python
# app/agents/solution/retrieval_agent.py
class RetrievalAgent(AgentBase):
    def search_solutions(requirements: Requirements) -> list[Document]
    def rank_results(docs: list[Document], query: str) -> list[RankedDoc]
```

**Acceptance Criteria:**
- [ ] Searches vector store effectively
- [ ] Re-ranks results by relevance
- [ ] Returns source citations
- [ ] Filters by product category if specified

**Dependencies:** TASK-034, TASK-035

---

### TASK-037: Solution Synthesis Agent
**Priority:** P0 | **Effort:** 6h | **Status:** 🔲

**Description:**
Implement agent that composes final solution recommendation.

**Deliverables:**
```python
# app/agents/solution/synthesis_agent.py
class SynthesisAgent(AgentBase):
    def compose_recommendation(
        requirements: Requirements,
        documents: list[Document]
    ) -> SolutionRecommendation
    
    def refine_recommendation(
        current: SolutionRecommendation,
        feedback: str
    ) -> SolutionRecommendation
```

**Acceptance Criteria:**
- [ ] Generates coherent solution recommendation
- [ ] Includes product list, architecture description
- [ ] Cites sources from knowledge base
- [ ] Handles refinement with feedback
- [ ] Tracks changes between versions

**Dependencies:** TASK-036

---

### TASK-038: Solution API Endpoints
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Create REST APIs for Solution Recommender feature.

**Endpoints:**
- `POST /api/v1/solution/recommend` - Get recommendation
- `GET /api/v1/solution/{id}` - Get solution
- `POST /api/v1/solution/{id}/refine` - Refine with feedback
- `GET /api/v1/solution/{id}/history` - Get version history

**Acceptance Criteria:**
- [ ] All endpoints functional
- [ ] Version history maintained
- [ ] Diff between versions available
- [ ] Integration tests

**Dependencies:** TASK-035, TASK-036, TASK-037

---

### TASK-039: Role-Play Persona Agent
**Priority:** P0 | **Effort:** 6h | **Status:** 🔲

**Description:**
Implement agent that simulates customer personas.

**Deliverables:**
```python
# app/agents/role_play/persona_agent.py
class PersonaAgent(AgentBase):
    def initialize_persona(scenario: str, difficulty: str, context: dict) -> Persona
    def generate_response(persona: Persona, sales_message: str) -> str
    def should_raise_objection(conversation: list) -> bool
```

**Scenario Personas:**
- Discovery: Curious but guarded customer
- Technical: Detail-oriented engineer
- Objection: Skeptical procurement manager
- Executive: Time-constrained C-level

**Acceptance Criteria:**
- [ ] 4 distinct personas implemented
- [ ] 3 difficulty levels affect behavior
- [ ] Realistic conversation flow
- [ ] Appropriate objections raised
- [ ] Supports CN and EN conversations

**Dependencies:** TASK-007

---

### TASK-040: Role-Play Evaluation Agent
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Implement agent that evaluates sales responses.

**Deliverables:**
```python
# app/agents/role_play/evaluation_agent.py
class EvaluationAgent(AgentBase):
    def evaluate_response(
        scenario: str,
        conversation: list,
        latest_response: str
    ) -> Evaluation
```

**Evaluation Criteria:**
- Clarity and professionalism
- Technical accuracy
- Addressing customer concerns
- Moving conversation forward
- Handling objections effectively

**Acceptance Criteria:**
- [ ] Scores responses 0-100
- [ ] Provides specific strengths
- [ ] Provides actionable improvements
- [ ] Consistent evaluation across scenarios

**Dependencies:** TASK-039

---

### TASK-041: Role-Play API Endpoints
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Create REST APIs for Role-Play Simulator feature.

**Endpoints:**
- `POST /api/v1/role-play/start` - Start session
- `POST /api/v1/role-play/{session_id}/respond` - Send response
- `POST /api/v1/role-play/{session_id}/end` - End session
- `GET /api/v1/role-play/{session_id}` - Get session details
- `GET /api/v1/role-play/sessions` - List past sessions

**Acceptance Criteria:**
- [ ] All endpoints functional
- [ ] Conversation history persisted
- [ ] Final scores calculated
- [ ] Session can be resumed
- [ ] Integration tests

**Dependencies:** TASK-039, TASK-040

---

## Phase 1.8: Integration & Polish

### TASK-042: Internationalization Completion
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Complete all translations for CN and EN.

**Deliverables:**
- Complete translation files
- Dynamic content translation
- Date/number formatting

**Acceptance Criteria:**
- [ ] All UI strings translated
- [ ] Language switcher works
- [ ] Persists language preference
- [ ] No untranslated strings visible
- [ ] RTL not required (CN/EN only)

**Dependencies:** All frontend tasks

---

### TASK-043: Mobile Optimization
**Priority:** P0 | **Effort:** 6h | **Status:** 🔲

**Description:**
Ensure all features work well on mobile devices.

**Focus Areas:**
- Token Map touch interactions
- Chat interface keyboard handling
- Navigation on small screens
- Form inputs on mobile

**Acceptance Criteria:**
- [ ] All pages usable on 375px width
- [ ] Touch gestures work (zoom, pan)
- [ ] Keyboard doesn't obscure inputs
- [ ] No horizontal scrolling
- [ ] Test on iOS Safari and Android Chrome

**Dependencies:** All frontend tasks

---

### TASK-044: Error Handling & Loading States
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Implement comprehensive error handling and loading states.

**Deliverables:**
- Error boundary components
- API error handling
- Retry mechanisms
- Loading skeletons

**Acceptance Criteria:**
- [ ] Graceful degradation on errors
- [ ] User-friendly error messages
- [ ] Retry option for failed requests
- [ ] Loading skeletons for all async content
- [ ] No unhandled promise rejections

**Dependencies:** All frontend tasks

---

### TASK-045: Performance Optimization
**Priority:** P1 | **Effort:** 4h | **Status:** 🔲

**Description:**
Optimize frontend and backend performance.

**Focus Areas:**
- Code splitting
- Image optimization
- API response caching
- Database query optimization

**Acceptance Criteria:**
- [ ] Lighthouse score > 80
- [ ] First contentful paint < 2s
- [ ] API responses cached appropriately
- [ ] No N+1 database queries

**Dependencies:** All tasks

---

### TASK-046: Write API Documentation
**Priority:** P1 | **Effort:** 3h | **Status:** 🔲

**Description:**
Document all API endpoints with OpenAPI/Swagger.

**Deliverables:**
- Auto-generated OpenAPI spec
- Swagger UI accessible at `/docs`
- Example requests/responses

**Acceptance Criteria:**
- [ ] All endpoints documented
- [ ] Request/response schemas accurate
- [ ] Examples provided
- [ ] Swagger UI works

**Dependencies:** All backend tasks

---

### TASK-047: Write Unit Tests
**Priority:** P1 | **Effort:** 8h | **Status:** 🔲

**Description:**
Write unit tests for critical components.

**Coverage Targets:**
- Backend: 80% coverage
- Frontend: 60% coverage (critical paths)

**Focus Areas:**
- Agent logic
- API endpoints
- State management
- Utility functions

**Acceptance Criteria:**
- [ ] pytest runs successfully
- [ ] Jest/Vitest runs successfully
- [ ] Coverage targets met
- [ ] CI pipeline runs tests

**Dependencies:** All implementation tasks

---

### TASK-048: Setup CI/CD Pipeline
**Priority:** P1 | **Effort:** 4h | **Status:** 🔲

**Description:**
Configure GitHub Actions for CI/CD.

**Pipeline Stages:**
1. Lint
2. Test
3. Build
4. (Manual) Deploy

**Acceptance Criteria:**
- [ ] Runs on PR and push to main
- [ ] Linting catches issues
- [ ] Tests pass
- [ ] Docker images built
- [ ] Deploy script ready

**Dependencies:** TASK-047

---

### TASK-049: Deploy to Alibaba Cloud ECS
**Priority:** P0 | **Effort:** 6h | **Status:** 🔲

**Description:**
Deploy the complete application to Alibaba Cloud ECS.

**Deliverables:**
- ECS instance provisioned
- Docker Compose running
- Domain/SSL configured (optional)
- Monitoring setup

**Acceptance Criteria:**
- [ ] Application accessible via public IP
- [ ] All features functional
- [ ] Database persisted
- [ ] Logs accessible
- [ ] Basic monitoring in place

**Dependencies:** TASK-048

---

### TASK-050: Demo Preparation
**Priority:** P0 | **Effort:** 4h | **Status:** 🔲

**Description:**
Prepare demo environment and materials.

**Deliverables:**
- Demo script
- Sample data (companies, maps)
- Known issues documentation
- Walkthrough video (optional)

**Acceptance Criteria:**
- [ ] Demo flow rehearsed
- [ ] Sample data loaded
- [ ] All features demonstrable
- [ ] Backup plan for failures

**Dependencies:** TASK-049

---

## Task Summary

| Phase | Focus | Tasks | Total Effort |
|-------|-------|-------|--------------|
| 1.1 | Project Setup & Infrastructure | TASK-001 to TASK-008 (8 tasks) | 26h |
| 1.2 | Frontend Foundation | TASK-009 to TASK-013 (5 tasks) | 20h |
| 1.3 | UI: Token Battle Map | TASK-014 to TASK-017 (4 tasks) | 28h |
| 1.4 | UI: Solution Recommender | TASK-018 to TASK-021 (4 tasks) | 18h |
| 1.5 | UI: Role-Play Simulator | TASK-022 to TASK-025 (4 tasks) | 19h |
| 1.6 | UI: Settings & Refinement | TASK-026 to TASK-027 (2 tasks) | 8h |
| 1.7 | Backend Core & Agents | TASK-028 to TASK-041 (14 tasks) | 67h |
| 1.8 | Integration & Polish | TASK-042 to TASK-048 (7 tasks) | 33h |
| 1.9 | Deployment | TASK-049 to TASK-050 (2 tasks) | 10h |
| **Total** | | **50 tasks** | **229h (~6 weeks)** |

---

## Progress Tracking

### Status Legend
- 🔲 Not Started
- 🔄 In Progress
- ✅ Complete
- ⏸️ Blocked
- ❌ Cancelled

### Weekly Checkpoints

**Week 1 Checkpoint:**
- [x] TASK-001 through TASK-008 complete (Phase 1.1 Infrastructure)
- [x] Local development environment working
- [x] All services running in Docker
- [ ] TASK-009 through TASK-013 started (Frontend Foundation)

**Week 2 Checkpoint:**
- [ ] TASK-009 through TASK-013 complete (Frontend Foundation)
- [ ] TASK-014 through TASK-017 complete (Token Map UI)
- [ ] Token Map visualization working with mock data

**Week 3 Checkpoint:**
- [ ] TASK-018 through TASK-021 complete (Solution Recommender UI)
- [ ] TASK-022 through TASK-025 complete (Role-Play Simulator UI)
- [ ] TASK-026 through TASK-027 complete (Settings & Refinement UI)
- [ ] All UI features working with mock data

**Week 4 Checkpoint:**
- [ ] TASK-028 through TASK-033 complete (Customer APIs + Token Map Agents)
- [ ] Token Map connected to real backend
- [ ] Backend agents generating real data

**Week 5 Checkpoint:**
- [ ] TASK-034 through TASK-041 complete (RAG + Solution + Role-Play Agents)
- [ ] All features connected to backend
- [ ] End-to-end flows working

**Week 6 Checkpoint:**
- [ ] TASK-042 through TASK-050 complete (Integration, Polish, Deployment)
- [ ] Deployed to ECS
- [ ] Demo ready

---

*Document Version: 2.0 (UI-First Restructure)*
*Last Updated: 2026-02-13*
*Total Tasks: 50*
*Estimated Duration: 6 weeks*
*Development Strategy: UI-First with Mock Data*
