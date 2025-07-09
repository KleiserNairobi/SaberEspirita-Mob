import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getHomeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backGradientStart,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.md,
    },
    text: {
      color: theme.colors.titleBlack,
      fontSize: theme.fontSizes.lg,
      fontFamily: theme.fontFamily.bold,
    },
  });
