import { ChatService } from '@/models/Chat';
import { streamDeepSeekChat } from './deepseek';
import { ChatType } from './promptService';

/**
 * Serviço do Guia (Apoio Emocional)
 * AGORA assume que a mensagem já foi filtrada pelo hook
 */
export const emotionalChatService: ChatService = async (
  userMessage: string,
  onChunkReceived: (chunk: string) => void,
  onComplete: (fullResponse: string) => void
): Promise<void> => {
  // console.log('🟢 emotionalService: Processando mensagem aprovada pelo filtro');

  try {
    // Prepara o histórico para a API
    const history = [
      {
        role: 'user',
        content: userMessage,
      } as const,
    ];

    // Chama a API DeepSeek (AGORA só mensagens válidas chegam aqui)
    const stream = await streamDeepSeekChat(history, ChatType.EMOTIONAL);

    let fullResponse = '';

    // Processa o stream da API
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullResponse += content;
        onChunkReceived(content);
      }
    }

    onComplete(fullResponse);
  } catch (error) {
    // console.error('❌ Erro na API DeepSeek:', error);
    throw error;
  }
};
