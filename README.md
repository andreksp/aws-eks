# aws-eks

aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin 395893388747.dkr.ecr.sa-east-1.amazonaws.com
docker build -t awseks .
docker tag awseks:latest 395893388747.dkr.ecr.sa-east-1.amazonaws.com/awseks:latest
docker push 395893388747.dkr.ecr.sa-east-1.amazonaws.com/awseks:latest


# Build Docker Image
docker run -p 80:8080 -d awseks

docker build -t awseks .

# After Enabling Kubernets on docker
kubectl get svc
kubectl get nodes

kubectl config get-contexts

kubectl get pods -n staging

kubectl describe pod awseks-5b494776b6-wbbr5 -n staging
kubectl delete pod awseks-5b494776b6-57v4b -n staging
kubectl delete --all pods --namespace=staging

kubectl apply -f k8s/1-awseks.yaml


kubectl logs awseks-5b494776b6-wbbr5 -n staging

set ACCOUNT=aws sts get-caller-identity --query 'Account' --output text
set REGION=sa-east-1
set SECRET_NAME=%REGION%-ecr-registry
set EMAIL=andrek.unknown@gmail.com

set TOKEN=(aws ecr --region=sa-east-1 get-authorization-token --output text --query authorizationData[].authorizationToken | base64 -d | cut -d: -f2)

kubectl delete secret --ignore-not-found $SECRET_NAME

# Accessing from outside

kubectl proxy --port=8080
http://localhost:8080/api/v1/proxy/namespaces/staging/services/awseks:8080/
kubectl exec -it awseks-5b494776b6-wbbr5 --sh  