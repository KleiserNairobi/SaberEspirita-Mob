export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isError?: boolean;
}

export interface ChatService {
  (
    userMessage: string,
    onChunkReceived: (chunk: string) => void,
    onComplete: (fullResponse: string) => void
  ): Promise<void>;
}

export interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  currentStreamingMessage: string;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  clearChat: () => void;
}

export interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  currentStreamingMessage: string;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  clearChat: () => void;
  title?: string;
  subtitle?: string;
  headerColor?: string;
}

// Novas interfaces

// Tipagem para uma mensagem de chat
export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// Configuração para o hook
export type UseDeepSeekChat = {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
};

// Defina seu modelo DeepSeek aqui
export const DEEPSEEK_MODEL = 'deepseek-chat'; // ou 'deepseek-reasoner'
