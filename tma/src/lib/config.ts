// Environment detection
const isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === 'development';
const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production';

export const config = {
  // Application
  appName: 'Task Manager Application',
  version: process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0',
  environment: process.env.NEXT_PUBLIC_APP_ENV || 'development',
  
  // Flags
  isDevelopment,
  isProduction,
  debug: process.env.NEXT_PUBLIC_DEBUG === 'true',
  
  // API
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  },
  
  // AWS Configuration
  // Dev et Prod utilisent des ressources AWS distinctes (pas de ressources locales)
  aws: {
    region: process.env.NEXT_PUBLIC_AWS_REGION || 'eu-west-1',
    cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID || '',
      clientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID || '',
    },
    appSync: {
      endpoint: process.env.NEXT_PUBLIC_AWS_APPSYNC_ENDPOINT || '',
    },
    dynamoDB: {
      tablePrefix: process.env.DYNAMODB_TABLE_PREFIX || (isDevelopment ? 'dev_' : 'prod_'),
    },
  },
  
  // Features
  features: {
    googleDrive: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_ENABLED === 'true',
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'error'),
  },
} as const;

// Type export for type safety
export type AppConfig = typeof config;
