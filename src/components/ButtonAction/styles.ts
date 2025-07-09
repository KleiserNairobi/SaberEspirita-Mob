import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

export const getButtonActionStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      padding: verticalScale(12),
      borderRadius: 30,
      alignItems: 'center',
      backgroundColor: theme.colors.secondary,
    },
    containerEnabled: {
      backgroundColor: theme.colors.primary,
    },
    title: {
      color: theme.colors.titleLight,
      fontSize: RFValue(theme.fontSizes.xl),
      fontFamily: theme.fontFamily.medium,
    },
    titleEnabled: {
      color: theme.colors.titleBlack,
      fontFamily: theme.fontFamily.bold,
    },
  });
