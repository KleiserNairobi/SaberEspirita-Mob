import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getButtonActionStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: theme.vSpacings.sm,
      paddingHorizontal: theme.hSpacings.sm,
      borderRadius: 30,
      alignItems: 'center',
      backgroundColor: theme.colors.secondary,
    },
    containerEnabled: {
      backgroundColor: theme.colors.primary,
    },
    title: {
      color: theme.colors.titleLight,
      fontSize: theme.fontSizes.xl,
      fontFamily: theme.fontFamily.medium,
    },
    titleEnabled: {
      color: theme.colors.titleBlack,
      fontFamily: theme.fontFamily.bold,
    },
  });
