import { CientificChat as CientificChatInterface } from '@/pages/CientificChat';
import { useChat } from '@/hooks/useChat';
import { cientificChat as service } from '@/services/cientificChat';

export function CientificChat() {
  const chatProps = useChat(service);

  return (
    <CientificChatInterface
      {...chatProps}
      title="Conversando com o Sr. Allan"
      subtitle="Esclarecimento doutrinário"
      headerColor="#2c5530"
    />
  );
}
