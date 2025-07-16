import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

export const getBottomSheetMessageStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginVertical: theme.vSpacings.xs,
      marginHorizontal: theme.hSpacings.xs,
      alignItems: 'center',
      flexDirection: 'column',
    },
    title: {
      textAlign: 'center',
      paddingHorizontal: theme.hSpacings.md,
      marginTop: theme.vSpacings.xs,
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.semibold,
    },
    subtitle: {
      textAlign: 'center',
      paddingHorizontal: theme.hSpacings.md,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.medium,
    },
    boxButton: {
      marginTop: theme.vSpacings.md,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    buttonSecondary: {
      width: scale(80),
      padding: 6,
      borderWidth: 2,
      borderRadius: 18,
      alignItems: 'center',
      borderColor: theme.colors.buttonActionOutileneBorder,
    },
    buttonPrimary: {
      width: scale(80),
      padding: 6,
      borderRadius: 18,
      alignItems: 'center',
      marginLeft: 10,
      backgroundColor: theme.colors.primary,
    },
    titleButtonPrimary: {
      color: theme.colors.titleBlack,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.semibold,
    },
    titleButtonSecondary: {
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.semibold,
    },
  });
