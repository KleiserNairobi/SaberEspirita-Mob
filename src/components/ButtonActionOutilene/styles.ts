import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

export const getButtonActionOutileneStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      padding: verticalScale(10),
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
      fontSize: RFValue(theme.fontSizes.xl),
      fontFamily: theme.fontFamily.bold,
    },
  });
