# Full-Stack Application Deployment and Management on Kubernetes

## Step 1: Setup the Kubernetes Environment

Start Minikube
```minikube start --driver=docker```

Create a Namespace
```kubectl create namespace fullstack-app```

## Step 2: Containerize the Application

Build and push the Docker image to Docker Hub<br>
Frontend<br>
```docker build -t yasirifthikar/fullstack-frontend .```<br>
```docker push yasirifthikar/fullstack-frontend```<br>
Backend<br>
```docker build -t yasirifthikar/fullstack-backend .```<br>
```docker push yasirifthikar/fullstack-backend```<br>

## Step 3: Create Kubernetes Manifests 

Apply the Persistent Volume and Claim<br>
```kubectl apply -f pv.yaml```<br>
```kubectl apply -f pvc.yaml```<br>

Apply the ConfigMap<br>
```kubectl apply -f configmap.yaml```<br>

Apply the Secret (Include the MongoDB credentials)<br>
```kubectl apply -f secrets.yaml```<br>

Deploy MongoDB<br>
```kubectl apply -f db-deployment.yaml```<br>

Deploy Node.js Backend<br>
```kubectl apply -f backend-deployment.yaml```<br>

Deploy Nginx Frontend<br>
```kubectl apply -f frontend-deployment.yaml```<br>

## Step 4: Application Management

Scale the deployments if needed<br>
```kubectl scale deployment backend-deployment --replicas=3 -n fullstack-app```<br>
```kubectl scale deployment frontend-deployment --replicas=3 -n fullstack-app```<br>

Monitoring<br>
```kubectl logs deployment/backend-deployment -n fullstack-app```<br>

Port Forwarding for local Access<br>
```kubectl port-forward service/mongodb-service 27017:27017 -n fullstack-app```<br>
```minikube service frontend-service -n fullstack-app```<br>
Perform rolling updates<br>
```kubectl set image deployment/backend-deployment backend=yasirifthikar/fullstack-backend:latest -n fullstack-app```<br>