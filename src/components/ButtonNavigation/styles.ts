import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

export const getButtonNavigationStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'column',
    },
    title: {
      marginTop: verticalScale(2),
      color: theme.colors.bottonNavigationTitle,
      fontSize: RFValue(theme.fontSizes.sm),
      fontFamily: theme.fontFamily.medium,
    },
    titleActive: {
      color: theme.colors.bottonNavigationTitleFocus,
      fontFamily: theme.fontFamily.bold,
    },
  });
