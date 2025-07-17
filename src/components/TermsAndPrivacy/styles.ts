import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getTermsAndPrivacyStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    text: {
      width: '100%',
      textAlign: 'center',
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    link: {
      color: theme.colors.primary,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.semibold,
    },
    modalContainer: {
      flex: 1,
    },
    webview: {
      flex: 1,
    },
    closeButton: {
      padding: 15,
      backgroundColor: '#f8f8f8',
    },
    closeButtonText: {
      color: '#007AFF',
      textAlign: 'right',
      fontWeight: 'bold',
    },
  });
