import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import outputs from '../../amplify_outputs.json';

let isConfigured = false;

export const configureAmplify = () => {
  if (isConfigured) {
    return;
  }

  Amplify.configure(outputs, { ssr: true });
  isConfigured = true;
};

export const getDataClient = () => {
  configureAmplify();
  return generateClient<Schema>();
};
