import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Text,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useDeepSeekChat } from '@/hooks/useChat';
import { ChatMessage } from '@/models/Chat';
import { ChatType } from '@/services/promptService';
import { styles, userMarkdownStyles, assistantMarkdownStyles } from './styles';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <View
      style={[
        styles.messageContainer,
        isUser ? styles.userMessageContainer : styles.assistantMessageContainer,
      ]}>
      {/* Avatar */}
      <View style={[styles.avatar, isUser ? styles.userAvatar : styles.assistantAvatar]}>
        <Text style={styles.avatarText}>{isUser ? '👤' : '🕊️'}</Text>
      </View>

      {/* Message Bubble */}
      <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.assistantBubble]}>
        <Markdown style={isUser ? userMarkdownStyles : assistantMarkdownStyles}>
          {message.content}
        </Markdown>

        {/* Timestamp */}
        <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.assistantTimestamp]}>
          {new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  );
};

export const EmotionalChatScreen: React.FC = () => {
  const { messages, isLoading, error, sendMessage, clearChat } = useDeepSeekChat(
    ChatType.EMOTIONAL
  );
  const [inputMessage, setInputMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // Scroll para baixo quando novas mensagens chegarem
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = () => {
    if (inputMessage.trim() && !isLoading) {
      sendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleClearChat = () => {
    Alert.alert('Limpar Conversa', 'Tem certeza que deseja limpar toda a conversa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Limpar',
        onPress: clearChat,
        style: 'destructive',
      },
    ]);
  };

  const getHeaderTitle = () => {
    return 'Conversando com o Guia';
  };

  const getHeaderSubtitle = () => {
    return 'Apoio emocional e consolo espiritual';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>
          <Text style={styles.headerSubtitle}>{getHeaderSubtitle()}</Text>
        </View>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearChat}
          disabled={messages.length === 0}>
          <Text
            style={[styles.clearButtonText, messages.length === 0 && styles.clearButtonDisabled]}>
            Limpar
          </Text>
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <View style={styles.chatContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => <MessageBubble message={item} />}
          keyExtractor={(_, index) => index.toString()}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />

        {/* Loading Indicator */}
        {isLoading && (
          <View style={styles.thinkingContainer}>
            <View style={styles.thinkingBubble}>
              <ActivityIndicator size="small" color="#4A90E2" />
              <Text style={styles.thinkingText}>O Guia está pensando...</Text>
            </View>
          </View>
        )}

        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}
      </View>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputArea}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.textInput,
              (!inputMessage.trim() || isLoading) && styles.textInputDisabled,
            ]}
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="Compartilhe seus sentimentos..."
            placeholderTextColor="#999"
            multiline
            maxLength={500}
            editable={!isLoading}
            onSubmitEditing={handleSend}
            returnKeyType="send"
            blurOnSubmit={false}
          />

          <TouchableOpacity
            style={[
              styles.sendButton,
              (!inputMessage.trim() || isLoading) && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!inputMessage.trim() || isLoading}>
            <Text style={styles.sendButtonText}>{isLoading ? '⋯' : '➤'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
