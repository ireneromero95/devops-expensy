# Infrastructure - EKS with Terraform

## Prerequisites

- Terraform >= 1.0
- AWS CLI configured with valid credentials
- kubectl

## Usage

    cd infrastructure
    terraform init
    terraform plan
    terraform apply

## Connect to the cluster

    aws eks update-kubeconfig --region eu-west-1 --name expensy-cluster

## Deploy the app

    kubectl apply -f ../k8s/

## Destroy

    terraform destroy
