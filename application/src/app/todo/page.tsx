import { getDataClient } from '@/lib/amplifyClient';

const TODO_CONTENT = 'Seed Todo – DynamoDB connectivity test';

export default async function TodoPage() {
  const client = getDataClient();

  let todoContent = 'Aucun Todo seedé trouvé.';
  let metadata: { id?: string; createdAt?: string } | undefined;
  let error: string | undefined;

  try {
    const { data, errors } = await client.models.Todo.list({
      filter: {
        content: {
          eq: TODO_CONTENT,
        },
      },
    });

    if (errors && errors.length) {
      error = errors.map((e) => e.message).join(' | ');
    }

    if (data.length > 0) {
      const [todo] = data;
      todoContent = todo.content ?? todoContent;
      metadata = { id: todo.id, createdAt: todo.createdAt };
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Erreur inconnue';
  }

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '420px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1>Todo DynamoDB</h1>
        <p>{todoContent}</p>
        {metadata && (
          <div style={{ fontSize: '0.9rem', color: '#555' }}>
            <p>ID: {metadata.id}</p>
            <p>Créé le: {metadata.createdAt}</p>
          </div>
        )}
        {error && (
          <p style={{ color: 'red' }}>Erreur: {error}</p>
        )}
      </div>
    </main>
  );
}
