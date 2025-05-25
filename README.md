# 🚢 Full-Stack Maritime Vessel Tracking Application ("Under build mode")

A full-featured vessel tracking system providing real-time ship monitoring, filtering, historical data, and interactive mapping.

---

## 📌 Project Specifications

### 🖥️ Frontend (React + TypeScript)

An interactive, real-time map-based interface with advanced vessel search and filtering capabilities.

- **Map Interface** (Leaflet or Mapbox):
  - Real-time vessel positions with custom markers
  - Zoom/pan support with marker clustering
  - Vessel movement trails
  - Auto-updating every 30 seconds

- **Search & Filters**:
  - Instant search (by vessel name, IMO number, MMSI)
  - Filters by vessel type, status, and geographic region
  - User preference save/load for search and filters

- **Vessel Profile Pages**:
  - Static vessel data (dimensions, type, etc.)
  - Current location and status
  - 24-hour movement history
  - Timeline of key events

---

### 🧠 Backend (PHP + Node.js with TypeScript)

#### 🐘 PHP API Core
- CRUD operations for vessel data
- User authentication and rate limiting
- RESTful endpoints for static data
- PostgreSQL + PostGIS for spatial data queries

#### ⚙️ Node.js Real-Time Service
- Real-time AIS data streaming (via WebSockets)
- Vessel state caching
- AIS message simulation and processing
- Optional: Kafka-based data ingestion

#### 🧬 GraphQL API Layer
- Efficient, customizable data queries
- Real-time subscriptions
- Error handling and validations
- Full API documentation

---

### 🧱 Infrastructure

Containerized environment using Docker.

**Services:**
- React frontend
- PHP backend
- Node.js real-time processor
- PostgreSQL + PostGIS
- Redis cache
- Optional Kafka broker

---

### 🧪 Testing

- **Unit Testing**: Minimum 80% coverage
- **Integration Testing**: API endpoints
- **E2E Testing**: Core user flows
- **Performance Testing**: Real-time stream handling

---

### 🚀 CI/CD Pipeline

Automated DevOps using CI tools (GitHub Actions / GitLab CI):

- Build & test automation
- Code quality (SonarQube integration)
- Deployment to staging and production
- Security scanning and vulnerability checks

---

## 📦 Deliverables

- ✅ API Specifications (REST & GraphQL)
- ✅ Full Source Code with Documentation
- ✅ Test Reports & Coverage Stats
- ✅ Performance Benchmark Results
- ✅ Dockerized Deployment Instructions
- ✅ Technical Architecture Diagram

---

## ⏱ Timeline

**Duration**: 12 Weeks  
**Milestones**: Bi-weekly progress checkpoints (6 total)

---

## 📂 Repository Structure

```bash
/
├── frontend/              # React + TypeScript app
├── backend-php/           # PHP API core
├── backend-node/          # Node.js real-time processor
├── graphql-api/           # GraphQL API gateway
├── database/              # PostgreSQL schema and seed data
├── docker/                # Dockerfiles and compose files
├── tests/                 # Unit, integration, and E2E tests
└── docs/                  # Architecture diagram, API specs, etc.
```

---

## 📄 License

MIT License. See [LICENSE](./LICENSE) for details.
