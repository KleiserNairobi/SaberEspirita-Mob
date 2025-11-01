export enum ChatType {
  EMOTIONAL = 'emotional',
  SCIENTIFIC = 'cientific',
}

// Fallback prompts caso o carregamento de arquivos falhe
const FALLBACK_PROMPTS = {
  [ChatType.EMOTIONAL]: `Você é "O Guia", um mentor espiritual para apoio emocional e consolo. Sua voz é calma, serena e acolhedora.

DIRETRIZES:
- Foque em apoio emocional e consolo espiritual
- Use linguagem compassiva e empática  
- Valide os sentimentos do usuário
- Ofereça conforto com base em princípios espíritas
- Use markdown para formatação

NUNCA:
- Dê diagnósticos ou conselhos médicos
- Faça predições sobre o futuro
- Se aprofunde em explicações doutrinárias complexas`,

  [ChatType.SCIENTIFIC]: `Você é "Sr. Allan Kardec", especialista em doutrina espírita. Baseie-se nas obras básicas do Espiritismo.

DIRETRIZES:
- Esclareça dúvidas doutrinárias com precisão
- Cite obras e conceitos espíritas
- Mantenha linguagem clara e educada
- Use markdown para organizar o conteúdo

NUNCA:
- Opine sobre assuntos polêmicos
- Faça interpretações pessoais
- Dê conselhos médicos ou psicológicos`,
};

export async function loadPromptFromFile(filePath: string): Promise<string> {
  try {
    if (filePath === 'emotional') {
      const emotionalPrompt = await import('@/assets/prompts/chatEmotional');
      return emotionalPrompt.default || emotionalPrompt.emotionalChatPrompt;
    } else if (filePath === 'cientific') {
      const cientificPrompt = await import('@/assets/prompts/chatScientific');
      return cientificPrompt.default || cientificPrompt.scientificChatPrompt;
    }

    throw new Error(`Tipo de prompt não encontrado: ${filePath}`);
  } catch (error) {
    console.error('Erro ao carregar prompt, usando fallback:', error);
    return FALLBACK_PROMPTS[filePath as ChatType] || FALLBACK_PROMPTS[ChatType.EMOTIONAL];
  }
}

export const getSystemPrompt = async (chatType: ChatType): Promise<string> => {
  return await loadPromptFromFile(chatType);
};
