import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

// Tipo para os estilos do Markdown
type MarkdownStyles = Record<string, TextStyle | ViewStyle>;

// Estilos específicos para o componente MarkdownDisplay
const markdownStyles: MarkdownStyles = {
  // Estilo para o H1
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  } as TextStyle,
  // Estilo para o código em bloco
  code_block: {
    fontFamily: 'monospace',
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  } as TextStyle,
  // Estilo para a ênfase (negrito)
  strong: {
    fontWeight: '700',
  } as TextStyle,
  // Estilo padrão do texto
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#111',
  } as TextStyle,
  // Adicione outros estilos de Markdown aqui
};

// Estilos gerais do componente
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  } as ViewStyle,
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  } as ViewStyle,
  messageContainer: {
    maxWidth: '85%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  } as ViewStyle,
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF', // Azul para o usuário
    borderBottomRightRadius: 0,
  } as ViewStyle,
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA', // Cinza claro para o assistente
    borderBottomLeftRadius: 0,
  } as ViewStyle,
  markdownContainer: {
    // Isso aplica os estilos customizados ao react-native-markdown-display
    ...markdownStyles,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  } as ViewStyle,
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  } as TextStyle,
});
