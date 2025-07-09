import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

export const getMenuMoreStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      padding: verticalScale(8),
      marginBottom: verticalScale(8),
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomColor: theme.colors.bottomNavigationBorder,
    },
    title: {
      marginLeft: 10,
      color: theme.colors.titleBold,
      fontSize: RFValue(theme.fontSizes.md),
      fontFamily: theme.fontFamily.semibold,
    },
    boxTitle: {
      flexDirection: 'row',
    },
  });
