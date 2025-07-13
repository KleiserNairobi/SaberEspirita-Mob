import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

export const getDropDownStyles = (theme: AppTheme) =>
  StyleSheet.create({
    label: {
      marginBottom: verticalScale(4),
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.semibold,
    },
    error: {
      marginTop: verticalScale(4),
      color: theme.colors.optionErrorBorder,
      fontSize: theme.fontSizes.xs,
      fontFamily: theme.fontFamily.regular,
    },
  });
