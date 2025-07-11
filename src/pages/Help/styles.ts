import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getHelpStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 24,
      marginRight: 24,
    },
    title: {
      marginTop: 20,
      marginBottom: 8,
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.xl3,
      fontFamily: theme.fontFamily.bold,
    },
    subtitle: {
      marginTop: 8,
      marginBottom: 24,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
  });
