import { useState, useCallback } from 'react';
import { ChatMessage, UseDeepSeekChat } from '@/models/Chat';
import { streamDeepSeekChat } from '@/services/deepseek';

const SYSTEM_MESSAGE: ChatMessage = {
  role: 'system',
  content:
    'Você é um assistente atencioso e prestativo, e sempre responde em Markdown para facilitar a leitura.',
};

export const useDeepSeekChat = (): UseDeepSeekChat => {
  const [messages, setMessages] = useState<ChatMessage[]>([SYSTEM_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (userMessage: string) => {
      setIsLoading(true);
      setError(null);

      const newMessage: ChatMessage = { role: 'user', content: userMessage };
      const history = [...messages, newMessage];

      // Adiciona a mensagem do usuário imediatamente
      setMessages(history);

      // Inicializa a resposta do assistente (vazia)
      const initialAssistantMessage: ChatMessage = { role: 'assistant', content: '' };
      setMessages((prev) => [...prev, initialAssistantMessage]);

      try {
        const stream = await streamDeepSeekChat(history);
        let fullResponse = '';

        // Consome o stream e atualiza a última mensagem (assistente)
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';

          if (content) {
            fullResponse += content;
            // Atualiza o estado para renderizar o Markdown em tempo real (fluido)
            setMessages((prev) => {
              const newMsgs = [...prev];
              // Sempre modificamos a última mensagem (que é a do assistente)
              newMsgs[newMsgs.length - 1].content = fullResponse;
              return newMsgs;
            });
          }
        }
      } catch (err) {
        console.error('Erro na API DeepSeek:', err);
        setError('Desculpe, houve um erro ao se comunicar com a API DeepSeek.');
        // Remove a mensagem vazia do assistente se houver erro
        setMessages((prev) => prev.slice(0, prev.length - 1));
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  return { messages, isLoading, error, sendMessage };
};
