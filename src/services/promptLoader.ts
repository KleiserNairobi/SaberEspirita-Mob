export async function loadPromptFromFile(filePath: string): Promise<string> {
  try {
    if (filePath === 'emotional') {
      const emotionalPrompt = await import('@/assets/prompts/chatEmotional');
      return emotionalPrompt.default;
    } else if (filePath === 'cientific') {
      const cientificPrompt = await import('@/assets/prompts/chatScientific');
      return cientificPrompt.default;
    }
    throw new Error(`Tipo de prompt não encontrado: ${filePath}`);
  } catch (error) {
    console.error('Erro ao carregar prompt:', error);
    throw new Error(`Não foi possível carregar o prompt: ${filePath}`);
  }
}
