import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

export const getMenuMoreStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      paddingVertical: theme.vSpacings.xs,
      paddingHorizontal: theme.hSpacings.xs,
      marginBottom: theme.vSpacings.xs,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomColor: theme.colors.bottomNavigationBorder,
    },
    title: {
      marginLeft: 10,
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.semibold,
    },
    boxTitle: {
      flexDirection: 'row',
    },
  });
