# Ultimate Mahjong Connect - Frontend

Application Angular pour le jeu Ultimate Mahjong Connect, déployée sur Kubernetes.

## 🛠️ Tech Stack
- **Frontend:** Angular 19, TypeScript
- **Backend:** .NET API (déployé sur Kubernetes)
- **Infrastructure:** Kubernetes, Docker
- **CI/CD:** GitHub Actions

## 🚀 Déploiement

### Prérequis
- Cluster Kubernetes configuré
- `kubectl` installé et configuré
- Docker installé

### Déploiement local
```bash
# Installation des dépendances
npm install

# Build de production
npm run build:prod

# Déploiement Kubernetes
npm run deploy:k8s
```

### CI/CD automatique
Le déploiement se fait automatiquement via GitHub Actions à chaque push sur `main`.

**Secrets GitHub requis :**
- `KUBE_CONFIG` : Configuration Kubernetes (base64 encodée)

## 🏗️ Architecture Kubernetes

### Namespace
- `mahjong-connect` : Isolation de l'application

### Ressources
- **Deployment** : `ultimate-mahjong-connect-front`
- **Service** : `ultimate-mahjong-connect-front-service`
- **Ingress** : `ultimate-mahjong-connect-front-ingress`

### Configuration
- **Replicas** : 1 (optimisé pour Raspberry Pi)
- **Port** : 8080 (container) → 80 (service)
- **Ressources** : 64Mi-128Mi RAM, 50m-100m CPU

## 🔗 Communication Backend

L'application communique avec le backend .NET via :
- **Développement** : `https://localhost:7049` (backend local)
- **Production** : `http://ultimate-mahjong-connect:8080` (service Kubernetes)
- **Endpoints** : 
  - `/api/Gamer` (gestion des joueurs)
  - `/api/v1/board` (plateau de jeu)

### Configuration automatique
Le service `ApiConfigService` détecte automatiquement l'environnement :
- **Mode dev** : Utilise localhost:7049
- **Mode prod** : Utilise le service Kubernetes interne

## 🛠️ Développement

### Installation
```bash
npm install
```

### Démarrage en développement
```bash
npm start
```

### Tests
```bash
npm test
```

## 📁 Structure

```
ultimate-mahjong-connect/
├── src/                    # Code source Angular
├── public/                 # Assets statiques
├── k8s/                    # Manifests Kubernetes
│   ├── namespace.yaml
│   └── deployment.yaml
├── .github/workflows/      # CI/CD
├── Dockerfile             # Image Docker
└── package.json
```

## 📝 Notes

- L'application utilise Angular 19
- Déploiement automatisé sur Kubernetes
- Communication avec backend .NET via API REST
- Assets des tuiles dans `public/tile/`
