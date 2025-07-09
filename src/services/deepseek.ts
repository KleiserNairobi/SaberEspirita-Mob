import axios, { AxiosInstance } from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_DEEPSEAK_API_KEY;
const API_URL = process.env.EXPO_PUBLIC_DEEPSEAK_API_URL;
const CONTEXT = '/chat/completions';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Interceptor para debug
api.interceptors.request.use((request) => {
  console.log('Request Config:', {
    url: request.url,
    baseURL: request.baseURL,
    headers: request.headers,
  });
  return request;
});

export async function askQuestion(question: string) {
  try {
    const response = await api.post(CONTEXT, {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: question,
        },
      ],
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao fazer a pergunta:', error);
    throw error;
  }
}
