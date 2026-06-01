# 🔄 CI/CD Pipeline Documentation

## Overview

This project uses GitHub Actions for continuous integration and delivery. Every push to `main` triggers a pipeline that builds, tests, and publishes Docker images to DockerHub.

---

## Pipeline Stages

### 1. Build
- Installs dependencies for both frontend and backend
- Compiles TypeScript for the backend
- Builds the Next.js frontend

### 2. Docker Build & Push
- Builds Docker images for both services using multi-stage builds
- Tags images with the full commit SHA for traceability
- Pushes images to DockerHub

---

## Workflow File

Located at `.github/workflows/ci-cd.yaml`

    name: CI/CD Pipeline

    on:
      push:
        branches: [main]
      pull_request:
        branches: [main]

    jobs:
      build-and-push:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - uses: docker/login-action@v3
          - uses: docker/build-push-action@v5  # backend
          - uses: docker/build-push-action@v5  # frontend

---

## Image Tagging Strategy

Images are tagged with the full commit SHA:

    ireneromero95/expensy-backend:<commit-sha>
    ireneromero95/expensy-frontend:<commit-sha>

This ensures:
- Every deployment is traceable to a specific commit
- Easy rollback to any previous version
- No ambiguity about what is running in production

---

## Required GitHub Secrets

Go to your repository Settings → Secrets and variables → Actions and add:

| Secret | Description | How to get it |
|--------|-------------|---------------|
| DOCKERHUB_USERNAME | Your DockerHub username | hub.docker.com |
| DOCKERHUB_TOKEN | DockerHub access token | Account Settings → Security → New Access Token |

---

## Deployment

After the pipeline runs successfully, deploy to Kubernetes by updating the image tag in the manifest:

    # k8s/backend.yaml and k8s/frontend.yaml
    image: ireneromero95/expensy-backend:<new-commit-sha>

Then apply:

    kubectl apply -f k8s/backend.yaml
    kubectl apply -f k8s/frontend.yaml

---

## Triggering the Pipeline

The pipeline triggers automatically on:
- Push to `main` branch
- Pull request to `main` branch

To trigger manually, push any change to `main`:

    git add .
    git commit -m "trigger pipeline"
    git push
