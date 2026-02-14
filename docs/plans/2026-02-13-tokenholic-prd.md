# Tokenholic - Product Requirements Document (Refined)

## 1. Product Overview

### 1.1 Product Name
**Tokenholic**

### 1.2 Vision Statement
An AI-powered sales enablement platform that helps Alibaba Cloud sales teams identify and win LLM/MaaS (Model-as-a-Service) token opportunities from enterprise customers.

### 1.3 Problem Statement
Alibaba Cloud sales teams face significant challenges in the rapidly growing LLM/AI market:

- **Visibility Gap**: Difficulty understanding how customers currently use AI/LLM across their business operations
- **Competitive Intelligence**: Hard to identify which workloads run on competitor platforms (Volcano Engine, Baidu Cloud, Azure, etc.) vs. Alibaba Cloud
- **Solution Complexity**: Struggle to articulate the right solution for each customer's unique AI use cases
- **Preparation Gap**: Limited ability to practice and prepare for complex technical sales conversations

### 1.4 Solution
Tokenholic provides four integrated AI-powered capabilities:

| Capability | Description |
|------------|-------------|
| **Token Battle Map Generator** | Automatically researches customers and visualizes their AI token consumption landscape, revealing competitive opportunities |
| **Solution Recommender** | Suggests tailored Alibaba Cloud solutions based on customer use cases, powered by RAG over a curated knowledge base |
| **Sales Role-Play Simulator** | AI-powered practice environment for rehearsing customer conversations across multiple scenarios |
| **Iterative Refinement Engine** | Captures customer feedback and evolves solutions through versioned iterations |

---

## 2. Target Users

### 2.1 Primary Personas

#### Sales Representatives
- **Role**: Frontline customer engagement
- **Key Needs**: Quick customer research, compelling presentations, conversation preparation
- **Primary Features Used**: Token Battle Map, Role-Play Simulator

#### Sales Managers / Leaders
- **Role**: Strategic account planning across multiple customers
- **Key Needs**: Portfolio-level opportunity visibility, team enablement
- **Primary Features Used**: Token Battle Map (aggregate views), Solution history

#### Pre-sales Engineers / Solution Architects
- **Role**: Technical solution design and validation
- **Key Needs**: Accurate technical recommendations, competitive differentiation
- **Primary Features Used**: Solution Recommender, Refinement Engine

### 2.2 User Experience Principles
- Role-based views and workflows tailored to each persona
- Bilingual interface (Chinese and English) from day one
- Responsive design for both desktop and mobile use
- Intuitive, visually striking UI that makes complex data accessible

---

## 3. Core Features

### 3.1 Token Battle Map Generator

#### 3.1.1 Overview
Generates a comprehensive visualization of a customer's AI/LLM token consumption across their business, similar to the reference "Token业务白板图" (Token Business Whiteboard).

#### 3.1.2 Visualization Components
- **Business Use Case Mapping**: Script writing, image generation, video production, voice/audio, editing, etc.
- **Token Consumption by Use Case**: Estimated token volumes (in billions)
- **Cloud Provider Distribution**: Color-coded by provider (Alibaba Cloud, Volcano Engine, Baidu Cloud, foreign models, self-hosted)
- **Model Attribution**: Which specific models power each use case
- **Opportunity Indicators**: Highlight areas where Alibaba Cloud can capture market share
- **Growth Projections**: Estimated growth rates and future token volumes

#### 3.1.3 Interaction Model
- **Interactive Dashboard**: Click to drill down, filter by use case/provider, zoom in/out
- **Light Editing**: Sales can add notes, adjust estimates, customize before presenting
- **Export**: Generate shareable formats for customer presentations

#### 3.1.4 Data Sources

**Phase 1 (Public Data)**:
- Company websites and tech blogs
- News articles and press releases
- Job postings (indicating AI/ML hiring)
- GitHub repositories and open-source activity
- Industry reports and analyst coverage

**Future Phases**:
- Internal CRM data integration
- Industry benchmark databases
- Private data source connectors

**Always Available**:
- Manual input interface for sales to add known information

#### 3.1.5 Sample Output Structure
```
Customer: [Company Name]
Industry: [Industry]
Generated: [Date]

┌─────────────────────────────────────────────────────────────────┐
│                    TOKEN BUSINESS LANDSCAPE                      │
├─────────────┬─────────────┬─────────────┬─────────────┬─────────┤
│ Script      │ Image Gen   │ Video Prod  │ Voice/Audio │ Editing │
│ Creation    │             │             │             │         │
├─────────────┼─────────────┼─────────────┼─────────────┼─────────┤
│ [Models]    │ [Models]    │ [Models]    │ [Models]    │ [Models]│
│ [xx B tokens│ [xx B tokens│ [xx B tokens│ [xx B tokens│ [xx B]  │
│ [Provider]  │ [Provider]  │ [Provider]  │ [Provider]  │ [Prov.] │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────┘

Alibaba Cloud Opportunity: xx% of workloads on competitor platforms
Estimated Annual Token Value: ¥xxx Million
```

---

### 3.2 Solution Recommender

#### 3.2.1 Overview
Provides tailored Alibaba Cloud solution recommendations based on customer's identified use cases and requirements.

#### 3.2.2 Architecture
- **RAG-based System**: Retrieval-Augmented Generation over curated knowledge base
- **Grounded Responses**: All recommendations cite source documentation
- **Use Case Mapping**: Maps customer needs to Alibaba Cloud products and services

#### 3.2.3 Knowledge Base Content

**Phase 1 (Public Sources)**:
- Alibaba Cloud official documentation
- Product pages and feature lists
- Published case studies
- Pricing information (public tiers)
- Technical blog posts

**Future Phases**:
- Internal solution architectures
- Competitive migration guides
- ROI calculators and TCO models
- Customer success stories (with permission)

#### 3.2.4 Recommendation Output
- Recommended Alibaba Cloud products/services
- Architecture diagrams (when applicable)
- Key differentiators vs. current/competitor solution
- Implementation considerations
- Relevant case studies or references

---

### 3.3 Sales Role-Play Simulator

#### 3.3.1 Overview
AI-powered simulation environment where sales team members practice customer conversations.

#### 3.3.2 Available Scenarios

| Scenario | Description | Difficulty Levels |
|----------|-------------|-------------------|
| **Customer Discovery** | Understanding customer's AI needs and pain points | Easy / Medium / Hard |
| **Technical Deep-Dive** | Answering detailed questions about Alibaba Cloud's LLM offerings | Easy / Medium / Hard |
| **Objection Handling** | Responding to pushbacks (pricing, security, vendor lock-in) | Easy / Medium / Hard |
| **Executive Pitch** | Presenting to C-level with business value focus | Easy / Medium / Hard |

#### 3.3.3 Features
- **User-Selected Scenarios**: Sales chooses which scenario to practice
- **Customizable Customer Persona**: Industry, company size, technical sophistication
- **Real-time Feedback**: AI evaluates responses and suggests improvements
- **Progress Tracking**: Track which scenarios completed and performance over time

#### 3.3.4 AI Behavior
- Simulates realistic customer personas with appropriate skepticism
- Asks follow-up questions based on sales responses
- Raises common objections at appropriate moments
- Adjusts difficulty based on selected level

---

### 3.4 Iterative Refinement Engine

#### 3.4.1 Overview
Allows sales to capture customer feedback and iterate on solutions until deal-ready.

#### 3.4.2 Workflow
1. Sales presents initial solution to customer
2. Customer provides feedback (concerns, requirements, questions)
3. Sales inputs feedback as free-form text
4. AI regenerates refined solution addressing feedback
5. Repeat until solution is accepted

#### 3.4.3 Features
- **Simple Text Input**: Natural language feedback entry
- **Version History**: Track all solution versions and what changed
- **Diff View**: See changes between versions
- **Rollback**: Ability to revert to previous versions

#### 3.4.4 Scope Exclusions (Phase 1)
- No structured feedback forms
- No multi-user collaboration
- No win/loss tracking

---

## 4. Technical Architecture

### 4.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│                    (Vite + React)                                │
│         Responsive Web App (Desktop + Mobile)                    │
└─────────────────────────┬───────────────────────────────────────┘
                          │ REST API / WebSocket
┌─────────────────────────▼───────────────────────────────────────┐
│                      API GATEWAY                                 │
│                   (FastAPI / Python)                             │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                 MULTI-AGENT SYSTEM                               │
│                   (AgentScope)                                   │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│  │ Token Map    │ │ Solution     │ │ Role-Play    │             │
│  │ Agent System │ │ Agent System │ │ Agent System │             │
│  └──────────────┘ └──────────────┘ └──────────────┘             │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                    INTEGRATIONS                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ Bailian  │ │ AgentBay │ │ Vector   │ │ Database │           │
│  │ (LLMs)   │ │ (Sandbox)│ │ Store    │ │ (SQLite/ │           │
│  │          │ │          │ │ (RAG)    │ │ Postgres)│           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Frontend Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Framework | React 18+ | Component-based UI |
| Build Tool | Vite | Fast development and builds |
| Styling | TailwindCSS + Shadcn/UI | Modern, responsive design |
| State Management | Zustand or React Query | Client-side state |
| Visualization | D3.js / ECharts | Token Battle Map rendering |
| i18n | react-i18next | Bilingual support |

### 4.3 Backend Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| API Framework | FastAPI | REST API endpoints |
| Agent Framework | AgentScope | Multi-agent orchestration |
| LLM Access | Bailian SDK | Model inference |
| Vector Store | FAISS / Milvus | RAG embeddings |
| Database | PostgreSQL | Persistent storage |
| Cache | Redis | Session and query caching |

### 4.4 Multi-Agent Architecture

**Feature-Based Organization**: Each major feature has its own agent system for modularity and independent scaling.

#### Token Map Agent System
- **Research Agent**: Gathers public data about customer
- **Analysis Agent**: Processes and structures findings
- **Visualization Agent**: Generates map data structure

#### Solution Agent System
- **Query Agent**: Processes user questions
- **Retrieval Agent**: Searches knowledge base
- **Synthesis Agent**: Composes recommendations

#### Role-Play Agent System
- **Persona Agent**: Simulates customer behavior
- **Evaluation Agent**: Assesses sales responses
- **Feedback Agent**: Provides improvement suggestions

### 4.5 LLM Model Configuration

| Task Type | Default Model | Configurable |
|-----------|---------------|--------------|
| Planning & Reasoning | Qwen3-Max-thinking | Yes |
| Code Generation | GLM 5.0 | Yes |
| General Tasks | GLM 5.0 | Yes |
| Embeddings | text-embedding-v3 | Yes |

Admin interface allows changing model assignments without code changes.

### 4.6 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Alibaba Cloud ECS                            │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                      Docker Host                             ││
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐   ││
│  │  │ Frontend  │ │ Backend   │ │ PostgreSQL│ │ Redis     │   ││
│  │  │ Container │ │ Container │ │ Container │ │ Container │   ││
│  │  └───────────┘ └───────────┘ └───────────┘ └───────────┘   ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

**Phase 1**: Single ECS instance with Docker Compose
**Future**: Migrate to Function Compute, ACS (Container Service), or Kubernetes

---

## 5. Data Model

### 5.1 Core Entities

```
User (future - Phase 2+)
├── id
├── email
├── name
├── role (sales_rep | manager | presales)
├── language_preference
└── created_at

Customer
├── id
├── name
├── industry
├── description
├── created_at
└── updated_at

TokenMap
├── id
├── customer_id (FK)
├── data (JSON - map structure)
├── version
├── created_at
└── updated_at

Solution
├── id
├── customer_id (FK)
├── use_case
├── recommendation (JSON)
├── version
├── parent_version_id (FK, nullable)
├── feedback_text
├── created_at
└── updated_at

RolePlaySession
├── id
├── scenario_type
├── difficulty
├── customer_persona (JSON)
├── conversation_history (JSON)
├── score
├── feedback
├── created_at
└── completed_at
```

### 5.2 Persistence Strategy

| Data Type | Storage | Retention |
|-----------|---------|-----------|
| Token Maps | PostgreSQL | Permanent |
| Solutions | PostgreSQL | Permanent (all versions) |
| Role-Play Sessions | PostgreSQL | Permanent |
| LLM Responses | Redis Cache | 24 hours |
| Search Results | Redis Cache | 1 hour |

---

## 6. Phase 1 Scope

### 6.1 In Scope

| Feature | Scope |
|---------|-------|
| Token Battle Map | Full feature with public data sources |
| Solution Recommender | RAG over public Alibaba Cloud docs |
| Role-Play Simulator | All 4 scenarios with 3 difficulty levels |
| Refinement Engine | Text feedback + version history |
| UI | Responsive, bilingual, interactive maps |
| Deployment | Docker on single ECS instance |

### 6.2 Out of Scope (Phase 1)

| Feature | Reason | Target Phase |
|---------|--------|--------------|
| User Authentication | Demo mode first | Phase 2 |
| CRM Integration | Requires internal access | Phase 2 |
| Win/Loss Tracking | Not critical for demo | Phase 3 |
| Collaboration Features | Complexity | Phase 3 |
| Advanced Analytics | Needs usage data first | Phase 3 |

### 6.3 Success Criteria (Phase 1)

- [ ] Generate Token Battle Map for any company given its name
- [ ] Produce relevant solution recommendations for identified use cases
- [ ] Complete role-play session for all 4 scenario types
- [ ] Iterate solution through 3+ feedback cycles
- [ ] UI renders correctly on desktop and mobile
- [ ] System responds in both Chinese and English
- [ ] Deploy successfully to Alibaba Cloud ECS

---

## 7. Future Roadmap

### Phase 2: Enterprise Ready
- User authentication (SSO with DingTalk/Aliyun)
- CRM data integration
- Team/organization management
- Usage analytics dashboard

### Phase 3: Intelligence Layer
- Win/Loss tracking and analysis
- Automated opportunity scoring
- Competitive intelligence alerts
- Cross-customer pattern recognition

### Phase 4: Scale & Optimize
- Multi-region deployment
- Advanced caching and performance
- Custom model fine-tuning
- API access for integrations

---

## 8. Appendix

### 8.1 Reference Materials
- [Token Business Whiteboard Sample](/Token白板图.png)
- [AgentScope Documentation](https://doc.agentscope.io/zh_CN/index.html)
- [Bailian Model Studio](https://help.aliyun.com/zh/model-studio/what-is-model-studio)
- [AgentBay SDK](https://github.com/agentbay-ai/wuying-agentbay-sdk/tree/main/docs)

### 8.2 Glossary

| Term | Definition |
|------|------------|
| Token | Unit of text processed by LLM (roughly 4 characters in English, 1-2 in Chinese) |
| MaaS | Model-as-a-Service - cloud-hosted LLM inference |
| RAG | Retrieval-Augmented Generation - combining search with LLM |
| Token Battle Map | Visualization of customer's AI token consumption landscape |

### 8.3 Open Questions

1. **Data Privacy**: How to handle sensitive customer information gathered during research?
2. **Rate Limits**: How to manage LLM API costs and rate limits during heavy usage?
3. **Accuracy**: How to validate Token Battle Map estimates when public data is limited?
4. **Feedback Loop**: How to improve the system based on actual sales outcomes without win/loss tracking?

---

*Document Version: 1.0*
*Last Updated: 2026-02-13*
*Authors: Product Team*
