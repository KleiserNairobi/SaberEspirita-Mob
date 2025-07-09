import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

export const getButtonFilterProgressStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      height: '100%',
      marginRight: 8,
      marginBottom: verticalScale(20),
      borderRadius: 40,
      backgroundColor: theme.colors.secondary,
    },
    buttonActive: {
      backgroundColor: theme.colors.primary,
    },
    title: {
      paddingVertical: verticalScale(8),
      paddingHorizontal: verticalScale(20),
      color: theme.colors.titleBlack,
      fontSize: RFValue(theme.fontSizes.sm),
      fontFamily: theme.fontFamily.medium,
    },
    titleActive: {
      fontFamily: theme.fontFamily.bold,
    },
  });
