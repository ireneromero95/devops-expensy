# 🧾 Expensy - End-to-End DevOps Deployment

![CI/CD](https://github.com/ireneromero95/devops-expensy/actions/workflows/ci-cd.yaml/badge.svg)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)

A lightweight expense tracker app built with Next.js and Node/Express, deployed with a full DevOps lifecycle.

## 🛠️ Stack

- **Frontend**: Next.js 14 + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB
- **Cache**: Redis
- **Container Registry**: DockerHub
- **CI/CD**: GitHub Actions
- **Orchestration**: Kubernetes (k3d locally)

## 🏗️ Architecture

Browser → Frontend (Next.js) → Backend (Express) → MongoDB
                                                  → Redis

## 💻 Local Development

### Prerequisites

- Docker
- Node.js >= 20
- k3d
- kubectl

### Run with Docker Compose

    docker compose up --build

App available at http://localhost:3000

### Run manually

**1. Start MongoDB and Redis**

    docker run --name mongo -d -p 27017:27017 \
      -e MONGO_INITDB_ROOT_USERNAME=root \
      -e MONGO_INITDB_ROOT_PASSWORD=example \
      mongo:latest

    docker run --name redis -d -p 6379:6379 \
      redis:latest redis-server --requirepass someredispassword

**2. Start Backend**

    cd expensy_backend
    npm install
    export DATABASE_URI=mongodb://root:example@localhost:27017
    export REDIS_HOST=localhost
    export REDIS_PORT=6379
    export REDIS_PASSWORD=someredispassword
    npm start

**3. Start Frontend**

    cd expensy_frontend
    npm install
    echo "NEXT_PUBLIC_API_URL=http://localhost:8706" > .env.local
    npm run dev

## 🔄 CI/CD Pipeline

GitHub Actions workflow at .github/workflows/ci-cd.yaml:

1. **Build** - Install dependencies and build both services
2. **Docker Build and Push** - Build images and push to DockerHub with commit SHA tag

### 🔐 Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| DOCKERHUB_USERNAME | DockerHub username |
| DOCKERHUB_TOKEN | DockerHub access token |

## ☸️ Kubernetes Deployment (k3d)

### Create cluster

    k3d cluster create expensy --agents 2

### Deploy

    kubectl apply -f k8s/namespace.yaml
    kubectl apply -f k8s/secrets.yaml
    kubectl apply -f k8s/mongo.yaml
    kubectl apply -f k8s/redis.yaml
    kubectl apply -f k8s/backend.yaml
    kubectl apply -f k8s/frontend.yaml

### Access the app

    kubectl port-forward svc/frontend-service 3000:3000 -n expensy

Open http://localhost:3000

### Check status

    kubectl get pods -n expensy

## 📁 Project Structure

    devops-expensy/
    ├── expensy_backend/       # Node.js + Express API
    │   ├── src/
    │   ├── Dockerfile
    │   └── .dockerignore
    ├── expensy_frontend/      # Next.js frontend
    │   ├── app/
    │   ├── Dockerfile
    │   └── .dockerignore
    ├── k8s/                   # Kubernetes manifests
    │   ├── namespace.yaml
    │   ├── secrets.yaml       # not committed - apply manually
    │   ├── mongo.yaml
    │   ├── redis.yaml
    │   ├── backend.yaml
    │   └── frontend.yaml
    ├── docker-compose.yaml
    └── .github/
        └── workflows/
            └── ci-cd.yaml
