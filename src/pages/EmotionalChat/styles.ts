// import { StyleSheet, Dimensions } from 'react-native';

// const { width } = Dimensions.get('window');

// // Estilos do Markdown separados
// export const userMarkdownStyles = {
//   body: {
//     fontSize: 16,
//     lineHeight: 22,
//     color: 'white',
//   },
//   strong: {
//     color: 'rgba(255, 255, 255, 0.9)',
//     fontWeight: 'bold' as const,
//   },
//   em: {
//     color: 'rgba(255, 255, 255, 0.8)',
//     fontStyle: 'italic' as const,
//   },
// };

// export const assistantMarkdownStyles = {
//   body: {
//     fontSize: 16,
//     lineHeight: 22,
//     color: '#2c3e50',
//   },
//   strong: {
//     color: '#2c5530',
//     fontWeight: 'bold' as const,
//   },
//   em: {
//     color: '#4A90E2',
//     fontStyle: 'italic' as const,
//   },
//   paragraph: {
//     marginBottom: 8,
//   },
//   bullet_list: {
//     marginVertical: 8,
//   },
//   ordered_list: {
//     marginVertical: 8,
//   },
//   list_item: {
//     marginBottom: 4,
//   },
//   blockquote: {
//     backgroundColor: '#f8f9fa',
//     borderLeftWidth: 4,
//     borderLeftColor: '#4A90E2',
//     paddingLeft: 12,
//     paddingVertical: 8,
//     marginVertical: 8,
//   },
//   code_inline: {
//     backgroundColor: '#f1f3f4',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//     fontFamily: 'monospace',
//   },
// };

// export const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   header: {
//     backgroundColor: '#4A90E2',
//     paddingHorizontal: 20,
//     paddingTop: 60,
//     paddingBottom: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   headerContent: {
//     flex: 1,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: 'white',
//     marginBottom: 4,
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: 'rgba(255, 255, 255, 0.9)',
//     fontWeight: '400',
//   },
//   clearButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 16,
//     marginLeft: 12,
//   },
//   clearButtonText: {
//     color: 'white',
//     fontSize: 13,
//     fontWeight: '600',
//   },
//   clearButtonDisabled: {
//     color: 'rgba(255, 255, 255, 0.5)',
//   },
//   chatContainer: {
//     flex: 1,
//   },
//   messagesList: {
//     flex: 1,
//   },
//   messagesContent: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   messageContainer: {
//     flexDirection: 'row',
//     marginVertical: 8,
//     maxWidth: width * 0.85,
//   },
//   userMessageContainer: {
//     alignSelf: 'flex-end',
//     flexDirection: 'row-reverse',
//   },
//   assistantMessageContainer: {
//     alignSelf: 'flex-start',
//   },
//   avatar: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 8,
//   },
//   userAvatar: {
//     backgroundColor: '#4A90E2',
//   },
//   assistantAvatar: {
//     backgroundColor: '#2c5530',
//   },
//   avatarText: {
//     fontSize: 16,
//     color: 'white',
//   },
//   messageBubble: {
//     padding: 16,
//     borderRadius: 20,
//     maxWidth: width * 0.7,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   userBubble: {
//     backgroundColor: '#4A90E2',
//     borderBottomRightRadius: 4,
//   },
//   assistantBubble: {
//     backgroundColor: 'white',
//     borderBottomLeftRadius: 4,
//     borderWidth: 1,
//     borderColor: '#e9ecef',
//   },
//   timestamp: {
//     fontSize: 11,
//     marginTop: 8,
//     opacity: 0.7,
//   },
//   userTimestamp: {
//     color: 'rgba(255, 255, 255, 0.7)',
//     textAlign: 'right',
//   },
//   assistantTimestamp: {
//     color: '#6c757d',
//   },
//   thinkingContainer: {
//     paddingHorizontal: 16,
//     marginBottom: 16,
//   },
//   thinkingBubble: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#e9ecef',
//     alignSelf: 'flex-start',
//     maxWidth: width * 0.7,
//   },
//   thinkingText: {
//     marginLeft: 12,
//     color: '#6c757d',
//     fontStyle: 'italic',
//     fontSize: 14,
//   },
//   errorContainer: {
//     paddingHorizontal: 16,
//     marginBottom: 16,
//   },
//   errorText: {
//     color: '#d32f2f',
//     fontSize: 14,
//     textAlign: 'center',
//     backgroundColor: '#ffebee',
//     padding: 12,
//     borderRadius: 8,
//   },
//   inputArea: {
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderTopColor: '#e9ecef',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 4,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     padding: 16,
//     alignItems: 'flex-end',
//   },
//   textInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#e9ecef',
//     borderRadius: 24,
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//     maxHeight: 100,
//     backgroundColor: '#f8f9fa',
//     marginRight: 12,
//     fontSize: 16,
//     lineHeight: 20,
//   },
//   textInputDisabled: {
//     backgroundColor: '#f1f3f4',
//     color: '#999',
//   },
//   sendButton: {
//     width: 44,
//     height: 44,
//     backgroundColor: '#4A90E2',
//     borderRadius: 22,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#4A90E2',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   sendButtonDisabled: {
//     backgroundColor: '#ced4da',
//     shadowColor: 'transparent',
//   },
//   sendButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 2,
//   },
// });
