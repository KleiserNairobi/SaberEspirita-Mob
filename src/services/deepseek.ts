import OpenAI from 'openai';
import { fetch as expoFetch } from 'expo/fetch';
import { ChatMessage, DEEPSEEK_MODEL } from '@/models/Chat';

// Configuração do cliente OpenAI para a API DeepSeek
// O `baseURL` é o que direciona a chamada para o DeepSeek.
const deepSeekClient = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_DEEPSEEK_API_KEY,
  baseURL: process.env.EXPO_PUBLIC_DEEPSEEK_API_URL,
  fetch: expoFetch as any,
});

/**
 * Envia uma mensagem para o DeepSeek e retorna um stream.
 * @param history Mensagens de histórico.
 * @returns Um objeto Stream para consumir a resposta em partes.
 */
export const streamDeepSeekChat = async (history: ChatMessage[]) => {
  if (!process.env.EXPO_PUBLIC_DEEPSEEK_API_KEY) {
    throw new Error('EXPO_PUBLIC_DEEPSEEK_API_KEY não está definida.');
  }

  // O uso de `stream: true` permite o consumo fluido (chunk by chunk)
  const stream = await deepSeekClient.chat.completions.create({
    model: DEEPSEEK_MODEL,
    messages: history,
    stream: true,
  });

  return stream;
};
