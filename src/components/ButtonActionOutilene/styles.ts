import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getButtonActionOutileneStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: theme.vSpacings.sm,
      paddingHorizontal: theme.hSpacings.sm,
      borderRadius: 30,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.buttonActionOutileneBorder,
      backgroundColor: theme.colors.backGradientEnd,
    },
    containerDisabled: {
      borderColor: theme.colors.optionNormalBorder,
    },
    title: {
      color: theme.colors.buttonActionOutileneTitle,
      fontSize: theme.fontSizes.xl,
      fontFamily: theme.fontFamily.bold,
    },
  });
