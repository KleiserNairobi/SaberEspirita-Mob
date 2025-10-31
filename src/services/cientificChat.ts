import { loadPromptFromFile } from './promptLoader';
import { streamCompletion } from './streaming';

export async function cientificChatService(
  userMessage: string,
  onChunkReceived: (chunk: string) => void,
  onComplete: (fullResponse: string) => void
): Promise<void> {
  try {
    const sistemaPrompt = await loadPromptFromFile('cientific');

    const messages = [
      {
        role: 'system',
        content: sistemaPrompt,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ];

    await streamCompletion(messages, onChunkReceived, onComplete, {
      temperature: 0.3,
      max_tokens: 1000,
    });
  } catch (error) {
    console.error('Erro no serviço do Allan:', error);
    throw error;
  }
}
