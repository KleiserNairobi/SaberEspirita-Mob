import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getButtonFilterProgressStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      height: '100%',
      marginRight: 8,
      marginBottom: theme.vSpacings.sm,
      borderRadius: 40,
      backgroundColor: theme.colors.secondary,
    },
    buttonActive: {
      backgroundColor: theme.colors.primary,
    },
    title: {
      paddingVertical: theme.vSpacings.xs,
      paddingHorizontal: theme.hSpacings.sm,
      color: theme.colors.titleBlack,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.medium,
    },
    titleActive: {
      fontFamily: theme.fontFamily.bold,
    },
  });
