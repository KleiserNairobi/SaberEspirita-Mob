import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { scale, verticalScale } from 'react-native-size-matters';
import { AppTheme } from '../../themes';

export const getHeaderStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: verticalScale(40),
    },
    backButton: {
      width: scale(40),
      height: scale(40),
      borderRadius: scale(20),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.buttonBack,
    },
    category: {
      marginLeft: 8,
      color: theme.colors.titleBold,
      fontSize: RFValue(theme.fontSizes.lg),
      fontFamily: theme.fontFamily.medium,
    },
  });
