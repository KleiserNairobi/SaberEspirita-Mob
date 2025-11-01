import { ChatService } from '@/models/Chat';
import { ChatType } from './promptService';
import { emotionalChatService } from './emotionalChat';
import { cientificChatService } from './cientificChat';

/**
 * Serviço unificado de chat que escolhe o serviço correto baseado no tipo
 * E aplica filtros de intenção automaticamente
 */
export const getChatService = (chatType: ChatType): ChatService => {
  switch (chatType) {
    case ChatType.EMOTIONAL:
      return emotionalChatService;
    case ChatType.SCIENTIFIC:
      return cientificChatService;
    default:
      return emotionalChatService;
  }
};

/**
 * Verifica se uma mensagem deve ser bloqueada antes de enviar para API
 */
export const shouldBlockMessage = (
  message: string,
  chatType: ChatType
): { blocked: boolean; response?: string } => {
  // Importação dinâmica para evitar circular dependency
  const { detectIntention, IntentionType } = require('./intentionDetector');

  const intention = detectIntention(message);

  // Para o Guia (emocional), bloqueia off-topic e questões doutrinárias
  if (chatType === ChatType.EMOTIONAL) {
    if (intention.type === IntentionType.OFF_TOPIC) {
      return {
        blocked: true,
        response: `Desculpe, meu amigo...🌿 \n\nCompreendo sua curiosidade, mas fui criado especificamente para oferecer **apoio emocional** e **consolo espiritual**.\n\n**Posso ajudá-lo se você estiver passando por:**  \n• Momentos de tristeza ou angústia  \n• Dificuldades emocionais  \n• Busca por paz interior  \n• Crises existenciais  \n\n*Para outros temas, outros recursos podem ser mais úteis.*\n\n**Como posso oferecer **conforto** para seu coração hoje?"**`,
      };
    }

    if (intention.type === IntentionType.DOCTRINAL_QUESTION) {
      return {
        blocked: true,
        response: `**Excelente pergunta!** \n\n*Vejo que você busca um entendimento mais profundo sobre a **doutrina espírita**.*\n\n*Para questões doutrinárias específicas, estudos sistemáticos e explicações detalhadas sobre a codificação, recomendo que você converse com o **Sr. Allan Kardec**.*\n\n*Ele poderá oferecer as **respostas precisas** que você busca, baseadas nas obras fundamentais do Espiritismo.*\n\n**Enquanto isso, se estiver enfrentando algum **desafio emocional** ou buscando **consolo espiritual**, estou aqui para você!** 🙏`,
      };
    }
  }

  return { blocked: false };
};
