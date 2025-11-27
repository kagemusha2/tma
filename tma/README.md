# Task Manager Application (TMA)

Application de gestion de tâches pour équipes.

## Stack technique

- **Frontend** : React, Next.js, React Admin
- **Backend** : Next.js API Routes (serverless)
- **Infrastructure** : AWS (DynamoDB, S3, Lambda, AppSync, Cognito)
- **CI/CD** : AWS Amplify

## Structure du projet

```
tma/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Layout racine
│   │   ├── page.tsx            # Page d'accueil
│   │   └── api/health/         # Route /api/health
│   ├── components/             # Composants React réutilisables
│   └── lib/                    # Utilitaires et configurations
├── public/                     # Assets statiques
├── package.json
├── tsconfig.json
└── next.config.js
```

## Commandes

### Installation des dépendances

```bash
cd tma
npm install
```

### Démarrage en développement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

### Vérification du endpoint health

```bash
curl http://localhost:3000/api/health
```

### Build de production

```bash
npm run build
npm start
```

## Endpoints API

| Méthode | Route        | Description           |
|---------|-------------|-----------------------|
| GET     | /api/health | Statut de l'application |
