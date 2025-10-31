import { loadPromptFromFile } from './promptLoader';
import { getApiConfig } from './deepseek';
import { ChatService } from '@/models/Chat';

export const emotionalChatService: ChatService = async function (
  userMessage: string,
  onChunkReceived: (chunk: string) => void,
  onComplete: (fullResponse: string) => void
): Promise<void> {
  try {
    const sistemaPrompt = await loadPromptFromFile('emotional');
    const { apiKey, apiUrl } = getApiConfig();

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

    console.log('Enviando requisição para DeepSeek API...');

    // NO EXPO: usar fetch sem streaming
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        stream: false, // ⚠️ IMPORTANTE: sem streaming no Expo
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response recebida');

    const fullResponse = data.choices[0]?.message?.content;

    if (!fullResponse) {
      throw new Error('Resposta vazia da API');
    }

    // SIMULAÇÃO DE STREAMING para manter a experiência do usuário
    console.log('Simulando streaming da resposta...');

    // Validação robusta da resposta
    if (!fullResponse || typeof fullResponse !== 'string') {
      console.warn('Resposta inválida da API, usando fallback');
      onComplete('Desculpe, não consegui processar a resposta. Por favor, tente novamente.');
      return;
    }

    // Divide a resposta em partes para simular streaming com fallback seguro
    const sentences = fullResponse.split(/(?<=[.!?])\s+/) || [];
    let accumulatedResponse = '';

    // Se não houver frases identificadas, usa fallback simples
    if (sentences.length === 0) {
      console.log('Usando fallback de streaming por palavras');
      const words = fullResponse.split(' ') || [];

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (!word.trim()) continue;

        const chunk = word + (i < words.length - 1 ? ' ' : '');
        accumulatedResponse += chunk;
        onChunkReceived(chunk);

        // Delay natural entre palavras
        await new Promise((resolve) => setTimeout(resolve, 30 + Math.random() * 40));
      }
    } else {
      // Processamento normal por frases
      for (const sentence of sentences) {
        if (!sentence || !sentence.trim()) continue;

        // Adiciona palavras gradualmente
        const words = sentence.split(' ') || [];
        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          if (!word) continue;

          const chunk = word + (i < words.length - 1 ? ' ' : '');
          accumulatedResponse += chunk;
          onChunkReceived(chunk);

          // Delay natural entre palavras
          await new Promise((resolve) => setTimeout(resolve, 30 + Math.random() * 40));
        }

        // Delay maior entre frases
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    console.log('Streaming simulado concluído');
    onComplete(fullResponse);
  } catch (error) {
    console.error('Erro no serviço emocional:', error);
    throw error;
  }
};
