import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getCategoriesStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    greetingBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
      marginLeft: 24,
      marginRight: 24,
    },
    greeting: {
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.medium,
    },
    title: {
      marginLeft: 24,
      marginRight: 24,
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.medium,
    },
    category: {
      marginLeft: 24,
      marginRight: 24,
      marginTop: 20,
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.xl,
      fontFamily: theme.fontFamily.bold,
    },
  });
