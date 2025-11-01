import { useState, useCallback } from 'react';
import { ChatMessage, UseDeepSeekChat } from '@/models/Chat';
import { ChatType } from '@/services/promptService';
import { getChatService, shouldBlockMessage } from '@/services/chatService';
import { detectIntention, IntentionType } from '@/services/intentionDetector';

/**
 * Simula streaming para respostas locais (para mensagens bloqueadas ou fixas)
 */
const streamSimulatedResponse = async (
  response: string,
  onChunk: (chunk: string) => void,
  onComplete: (fullResponse: string) => void
): Promise<void> => {
  const sentences = response.split(/(?<=[.!?])\s+/);
  let fullText = '';

  for (const sentence of sentences) {
    if (!sentence.trim()) continue;
    const words = sentence.split(' ');

    for (let i = 0; i < words.length; i++) {
      const chunk = words[i] + (i < words.length - 1 ? ' ' : '');
      fullText += chunk;
      onChunk(chunk);
      await new Promise((r) => setTimeout(r, 30 + Math.random() * 20));
    }

    await new Promise((r) => setTimeout(r, 50));
  }

  onComplete(fullText);
};

export const useDeepSeekChat = (chatType: ChatType): UseDeepSeekChat => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionActive, setSessionActive] = useState(false);

  const chatService = getChatService(chatType);

  const sendMessage = useCallback(
    async (userMessage: string) => {
      // 1 Detecta intenção do usuário
      const intention = detectIntention(userMessage);

      // Adiciona mensagem do usuário
      const userMsg: ChatMessage = { role: 'user', content: userMessage };
      setMessages((prev) => [...prev, userMsg]);

      // 2 Verifica se é fim de conversa
      if (intention.type === IntentionType.END_CONVERSATION && sessionActive) {
        const farewell =
          '**Que a paz te acompanhe, meu amigo. 🌿**\n_Estarei aqui quando o coração desejar conversar novamente._';
        const assistantMsg: ChatMessage = { role: 'assistant', content: '' };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsLoading(true);

        await streamSimulatedResponse(
          farewell,
          (chunk) => {
            setMessages((prev) => {
              const newMsgs = [...prev];
              newMsgs[newMsgs.length - 1].content += chunk;
              return newMsgs;
            });
          },
          () => {
            setIsLoading(false);
            setSessionActive(false);
          }
        );

        return;
      }

      // 3 Verifica se é saudação / início de conversa
      if (intention.type === IntentionType.GREETING && !sessionActive) {
        const greeting =
          '🌼 **Seja bem-vindo.**\nSinto que deseja conversar sobre algo importante. Estou aqui para te ouvir com carinho.';
        const assistantMsg: ChatMessage = { role: 'assistant', content: '' };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsLoading(true);

        await streamSimulatedResponse(
          greeting,
          (chunk) => {
            setMessages((prev) => {
              const newMsgs = [...prev];
              newMsgs[newMsgs.length - 1].content += chunk;
              return newMsgs;
            });
          },
          () => {
            setIsLoading(false);
            setSessionActive(true);
          }
        );

        return;
      }

      // 4 Verifica bloqueio por filtros
      const blockCheck = shouldBlockMessage(userMessage, chatType);
      if (blockCheck.blocked) {
        // console.log('🔴 Mensagem bloqueada pelo filtro de intenção');
        const assistantMsg: ChatMessage = { role: 'assistant', content: '' };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsLoading(true);

        await streamSimulatedResponse(
          blockCheck.response!,
          (chunk) => {
            setMessages((prev) => {
              const newMsgs = [...prev];
              newMsgs[newMsgs.length - 1].content += chunk;
              return newMsgs;
            });
          },
          () => setIsLoading(false)
        );

        return;
      }

      // 5 Se passou, conversa normalmente via API
      setIsLoading(true);
      setError(null);
      const history = [...messages, userMsg];
      setMessages(history);

      const assistantMsg: ChatMessage = { role: 'assistant', content: '' };
      setMessages((prev) => [...prev, assistantMsg]);

      try {
        // console.log('🟢 Chamando API DeepSeek...');
        await chatService(
          userMessage,
          (chunk: string) => {
            setMessages((prev) => {
              const newMsgs = [...prev];
              newMsgs[newMsgs.length - 1].content += chunk;
              return newMsgs;
            });
          },
          (fullResponse: string) => setIsLoading(false)
        );
      } catch (err) {
        // console.error('Erro na API DeepSeek:', err);
        setError('Desculpe, houve um erro ao se comunicar com a API.');
        setMessages((prev) => prev.slice(0, prev.length - 1));
        setIsLoading(false);
      }
    },
    [messages, chatService, chatType, sessionActive]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    setSessionActive(false);
  }, []);

  return {
    messages: messages.filter((msg) => msg.role !== 'system'),
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
};
