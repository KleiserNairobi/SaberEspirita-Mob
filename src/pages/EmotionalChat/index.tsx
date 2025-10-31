import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, ActivityIndicator } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useDeepSeekChat } from '@/hooks/useChat';
import { ChatMessage } from '@/models/Chat';
import { styles } from './styles'; // Importa estilos

const MarkdownDisplay = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === 'user';
  const containerStyle = isUser ? styles.userMessage : styles.assistantMessage;

  return (
    <View style={[styles.messageContainer, containerStyle]}>
      {/* O componente Markdown usará o style `styles.markdownContainer` globalmente */}
      <Markdown style={styles.markdownContainer}>{message.content}</Markdown>
    </View>
  );
};

export const EmotionalChatScreen: React.FC = () => {
  const { messages, isLoading, error, sendMessage } = useDeepSeekChat();
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    if (inputMessage.trim() && !isLoading) {
      sendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}>
        {messages.map(
          (message, index) =>
            // Exclui a mensagem do sistema da exibição de chat
            message.role !== 'system' && <MarkdownDisplay key={index} message={message} />
        )}

        {/* Indicador de carregamento durante o stream */}
        {isLoading && (
          <View style={{ alignSelf: 'flex-start', marginVertical: 10 }}>
            <ActivityIndicator size="small" color="#007AFF" />
          </View>
        )}

        {/* Exibição de erro */}
        {error && <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{error}</Text>}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Digite sua mensagem..."
          editable={!isLoading}
          onSubmitEditing={handleSend} // Envia ao pressionar enter/submit
        />
        <Button
          title={isLoading ? 'Enviando...' : 'Enviar'}
          onPress={handleSend}
          disabled={isLoading || !inputMessage.trim()}
        />
      </View>
    </View>
  );
};
