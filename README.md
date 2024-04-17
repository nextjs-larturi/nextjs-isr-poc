# Next.js ISR PoC | Client Next.js

- Next 13.4.2

# Local

<https://github.com/larturi/next-isr-poc>

- Use node v18

```bash
    yarn
    yarn build
    yarn start --port=3001
```

# Prod Docker

### Important: Create the .env file with this variables and make sure you started the serve first:

```bash
    API_URL="https://next-isr-poc-server-api.vercel.app"
    CLIENT_URL="http://next-poc-isr.larturi.local:30000"
    MY_SECRET_TOKEN="diypkqZN35OIteEzpszu"
```

```bash
    docker build -t larturi/next-isr-poc:latest .
    docker push larturi/next-isr-poc:latest

    cd k8s/ingress
    kubectl apply -f .
    cd ..
    kubectl apply -f 01-next-poc-isr-deployment.yaml
    kubectl apply -f 02-next-poc-isr-svc.yaml
    kubectl apply -f 03-ingress.yaml
    
    # Optional, only to test the container
    docker run -p 3001:3000 --name next-isr-poc larturi/next-isr-poc:1.0
```

### Add in etc/hosts

```bash
127.0.0.1   next-poc-isr.larturi.local
```

<http://next-poc-isr.larturi.local:30000>

