#!/bin/bash
set -e

# Récupérer les variables d'environnement Amplify ..
BRANCH="${AWS_BRANCH:-main}"
APP_ID="${AWS_APP_ID:-d2nmiulwzohoge}"

echo "Deploying backend for branch: $BRANCH, app: $APP_ID"

npx ampx pipeline-deploy --branch "$BRANCH" --app-id "$APP_ID"
