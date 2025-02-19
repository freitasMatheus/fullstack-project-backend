# Fullstack E-commerce Project - Backend

This is the backend of a full-stack e-commerce application built to explore and integrate modern web development technologies.

## 🚀 Technologies Used
- **NestJS** 🛡️ – A progressive Node.js framework for building efficient and scalable server-side applications.
- **PostgreSQL** 🗄️ – Relational database for structured data management.
- **Redis** ⚡ – In-memory data store for caching and session management.
- **Elasticsearch** 🔍 – Distributed search engine for advanced product search.
- **Docker** 🐳 – Containerization for easy deployment and development.
- **CI/CD Pipelines** 🔄 – Automated testing and continuous deployment using GitHub Actions.

## 📂 Project Structure (Proposed)
```
/fullstack-project-backend
 ├── /src
 │   ├── /config       # Environment and service configurations
 │   ├── /controllers  # API endpoint logic
 │   ├── /models       # Database models (PostgreSQL entities)
 │   ├── /routes       # API routes
 │   ├── /services     # Business logic and external service integrations (Redis, Elasticsearch)
 │   ├── /utils        # Helper functions and utilities
 │   ├── app.module.ts # Main application module
 │   ├── main.ts       # Application entry point
 ├── .dockerignore
 ├── Dockerfile
 ├── .gitignore
 ├── package.json
 ├── README.md
```

## ⚡ Getting Started

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/fullstack-project-backend.git
cd fullstack-project-backend
```

### 2. Install dependencies:
```bash
yarn install
```

### 3. Run the project:
```bash
yarn start:dev
```

## 🐳 Running with Docker

### 1. Build the Docker image:
```bash
docker build -t fullstack-backend .
```

### 2. Run the container:
```bash
docker run -p 4000:4000 fullstack-backend
```

## 🔧 Environment Configuration

- Create a `.env` file with your environment variables (database connection, Redis, Elasticsearch, etc.).
- Sample `.env`:
  ```env
  DATABASE_URL=postgres://user:password@localhost:5432/ecommerce
  REDIS_HOST=localhost
  REDIS_PORT=6379
  ELASTICSEARCH_URL=http://localhost:9200
  JWT_SECRET=your_jwt_secret
  ```