import { EmotionalChat as EmotionalChatInterface } from '@/pages/EmotionalChat';
import { useChat } from '@/hooks/useChat';
import { emotionalChat as service } from '@/services/emotionalChat';

export function EmotionalChat() {
  const chatProps = useChat(service);

  return (
    <EmotionalChatInterface
      {...chatProps}
      title="Conversando com o Guia"
      subtitle="Apoio emocional e consolo"
      headerColor="#4A90E2"
    />
  );
}
