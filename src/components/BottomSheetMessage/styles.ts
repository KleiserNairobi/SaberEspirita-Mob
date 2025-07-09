import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { scale, verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

export const getBottomSheetMessageStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      margin: scale(10),
      alignItems: 'center',
      flexDirection: 'column',
    },
    title: {
      textAlign: 'center',
      paddingLeft: 24,
      paddingRight: 24,
      marginTop: verticalScale(8),
      color: theme.colors.titleBold,
      fontSize: RFValue(theme.fontSizes.md),
      fontFamily: theme.fontFamily.bold,
    },
    subtitle: {
      textAlign: 'center',
      paddingLeft: 24,
      paddingRight: 24,
      color: theme.colors.titleNormal,
      fontSize: RFValue(theme.fontSizes.sm),
      fontFamily: theme.fontFamily.semibold,
    },
    boxButton: {
      marginTop: verticalScale(20),
      justifyContent: 'center',
      flexDirection: 'row',
    },
    buttonSecondary: {
      width: scale(80),
      padding: verticalScale(8),
      borderWidth: 2,
      borderRadius: 18,
      alignItems: 'center',
      borderColor: theme.colors.buttonActionOutileneBorder,
    },
    buttonPrimary: {
      width: scale(80),
      padding: verticalScale(8),
      borderRadius: 18,
      alignItems: 'center',
      marginLeft: 10,
      backgroundColor: theme.colors.primary,
    },
    titleButtonPrimary: {
      color: theme.colors.titleBlack,
      fontSize: RFValue(theme.fontSizes.md),
      fontFamily: theme.fontFamily.semibold,
    },
    titleButtonSecondary: {
      color: theme.colors.titleBold,
      fontSize: RFValue(theme.fontSizes.md),
      fontFamily: theme.fontFamily.semibold,
    },
  });
