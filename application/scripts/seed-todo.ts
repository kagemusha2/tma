import process from 'node:process';
import { getDataClient } from '@/lib/amplifyClient';

const TODO_CONTENT = 'Seed Todo – DynamoDB connectivity test';

async function main() {
  try {
    const client = getDataClient();

    const existing = await client.models.Todo.list({
      filter: {
        content: {
          eq: TODO_CONTENT,
        },
      },
    });

    if (existing.data.length > 0) {
      console.log('Todo already present:', existing.data[0]);
      return;
    }

    const result = await client.models.Todo.create({
      content: TODO_CONTENT,
    });

    console.log('Todo created:', result);
  } catch (error) {
    console.error('Failed to seed Todo:', error);
    process.exitCode = 1;
  }
}

void main();
