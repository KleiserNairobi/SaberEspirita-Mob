import OpenAI from 'openai';
import { fetch as expoFetch } from 'expo/fetch';
import { ChatMessage, DEEPSEEK_MODEL } from '@/models/Chat';
import { getSystemPrompt, ChatType } from './promptService';

const deepSeekClient = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_DEEPSEEK_API_KEY,
  baseURL: process.env.EXPO_PUBLIC_DEEPSEEK_API_URL,
  fetch: expoFetch as any,
});

/**
 * Envia uma mensagem para o DeepSeek e retorna um stream.
 */
export const streamDeepSeekChat = async (history: ChatMessage[], chatType: ChatType) => {
  if (!process.env.EXPO_PUBLIC_DEEPSEEK_API_KEY) {
    throw new Error('EXPO_PUBLIC_DEEPSEEK_API_KEY não está definida.');
  }

  if (!process.env.EXPO_PUBLIC_DEEPSEEK_API_URL) {
    throw new Error('EXPO_PUBLIC_DEEPSEEK_API_URL não está definida.');
  }

  // console.log(`🎯 Chamando API DeepSeek para: ${chatType}`);

  // Carrega o prompt específico para o tipo de chat
  const systemPrompt = await getSystemPrompt(chatType);

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: systemPrompt,
    },
    ...history, // Já vem filtrado pelo emotionalService
  ];

  // const messages: ChatMessage[] = [
  //   {
  //     role: 'system',
  //     content: systemPrompt,
  //   },
  //   ...history.filter((msg) => msg.role !== 'system'), // Remove system message antiga
  // ];

  try {
    const stream = await deepSeekClient.chat.completions.create({
      model: DEEPSEEK_MODEL,
      messages: messages,
      stream: true,
      temperature: chatType === ChatType.EMOTIONAL ? 0.7 : 0.3,
      max_tokens: chatType === ChatType.EMOTIONAL ? 800 : 1200,
    });

    // console.log('✅ Stream da API criado com sucesso');
    return stream;
  } catch (error: any) {
    // console.error('❌ Erro ao criar stream da API:', error);
    throw new Error(`Falha na comunicação com DeepSeek: ${error.message}`);
  }
};

/**
 * Versão alternativa sem streaming (para fallback)
 */
export const getDeepSeekCompletion = async (
  history: ChatMessage[],
  chatType: ChatType
): Promise<string> => {
  if (!process.env.EXPO_PUBLIC_DEEPSEEK_API_KEY) {
    throw new Error('EXPO_PUBLIC_DEEPSEEK_API_KEY não está definida.');
  }

  if (!process.env.EXPO_PUBLIC_DEEPSEEK_API_URL) {
    throw new Error('EXPO_PUBLIC_DEEPSEEK_API_URL não está definida.');
  }

  const systemPrompt = await getSystemPrompt(chatType);

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: systemPrompt,
    },
    ...history,
  ];

  try {
    const response = await deepSeekClient.chat.completions.create({
      model: DEEPSEEK_MODEL,
      messages: messages,
      stream: false,
      temperature: chatType === ChatType.EMOTIONAL ? 0.7 : 0.3,
      max_tokens: chatType === ChatType.EMOTIONAL ? 800 : 1200,
    });

    return response.choices[0]?.message?.content || 'Desculpe, não consegui gerar uma resposta.';
  } catch (error: any) {
    // console.error('❌ Erro na completion da API:', error);
    throw new Error(`Falha na comunicação com DeepSeek: ${error.message}`);
  }
};
