# 🔐 Security & Compliance

## Secrets Management

### Kubernetes Secrets
- Sensitive data (DATABASE_URI, REDIS_PASSWORD) is stored as Kubernetes Secrets
- `k8s/secrets.yaml` is listed in `.gitignore` and never committed to the repository
- Secrets must be applied manually to the cluster before deploying:

      kubectl apply -f k8s/secrets.yaml

### CI/CD Secrets
- DockerHub credentials are stored as GitHub Actions Secrets
- Secrets are never hardcoded or printed in pipeline logs
- Required secrets: DOCKERHUB_USERNAME, DOCKERHUB_TOKEN

### Environment Variables
- `.env` files are excluded from Docker images via `.dockerignore`
- `dotenv` is configured with `override: false` so container environment variables always take precedence over `.env` files

---

## Network Security

- All services communicate internally within the Kubernetes cluster via ClusterIP
- Only the frontend is exposed externally via Ingress (Traefik)
- Backend, MongoDB and Redis are not accessible from outside the cluster
- MongoDB requires username + password authentication
- Redis requires password authentication

---

## Container Security

- Multi-stage Docker builds minimize image size and attack surface
- Production images do not include development dependencies (`--omit=dev`)
- `.env` files are excluded from Docker images via `.dockerignore`
- Images are tagged with commit SHA for full traceability and auditability

---

## CI/CD Security

- Docker credentials stored as GitHub Secrets, never hardcoded
- Images tagged with commit SHA — every deployment is traceable to a specific commit
- No secrets are printed in pipeline logs

---

## Infrastructure Security (EKS/Terraform)

- EKS worker nodes run in private subnets
- Public access only through the cluster endpoint
- NAT Gateway used for outbound traffic from private subnets
- IAM roles follow least privilege principle

---

## Logging & Monitoring

- Container logs available via `kubectl logs`
- Prometheus scrapes metrics from all pods in the cluster
- Grafana provides visualization and alerting
- Grafana is only accessible locally via port-forward — not exposed externally

---

## Data Protection

- MongoDB requires authentication for all connections
- Redis requires password authentication
- No sensitive user data is logged
- All data remains within the deployment environment

---

## Compliance Notes

- This application stores expense data locally within the cluster
- No data is sent to third parties
- GDPR considerations: all data remains within the deployment environment and is not shared externally
- Logs are retained only within the cluster and not forwarded to external services
