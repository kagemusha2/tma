import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
});

// Ajouter des tags pour identifier les ressources
backend.stack.tags.setTag('Application', 'TMA');
backend.stack.tags.setTag('Project', 'Task Manager Application');

// Get the environment name from the stack name (e.g., "main", "develop")
const env = backend.stack.stackName.split('-').pop() || 'dev';

// Note: Table names are managed by Amplify and include app-id + branch automatically
// To see your tables: aws dynamodb list-tables --region eu-west-3
