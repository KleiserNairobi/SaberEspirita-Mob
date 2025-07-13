import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';
import { scale } from 'react-native-size-matters';

export const getFinishStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: theme.hSpacings.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    starsAndBooks: {
      width: '100%',
      height: '24%',
    },
    subcategory: {
      marginTop: theme.vSpacings.md,
      textAlign: 'center',
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.semibold,
    },
    category: {
      textAlign: 'center',
      color: theme.colors.titleLight,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.medium,
    },
    boxRow: {
      width: '100%',
      marginTop: theme.vSpacings.sm,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    boxColumn: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    points: {
      textAlign: 'center',
      color: theme.colors.cardProgressPrimary,
      fontSize: theme.fontSizes.xl3,
      fontFamily: theme.fontFamily.bold,
    },
    titlePoints: {
      textAlign: 'center',
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.xs,
      fontFamily: theme.fontFamily.medium,
    },
    title: {
      marginTop: theme.vSpacings.lg,
      marginBottom: 8,
      textAlign: 'center',
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.medium,
    },
    message: {
      marginBottom: theme.vSpacings.lg,
      textAlign: 'center',
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    boxButton: {
      width: '100%',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    buttonSecondary: {
      width: scale(120),
      padding: 8,
      borderWidth: 2,
      borderRadius: 18,
      alignItems: 'center',
      borderColor: theme.colors.buttonActionOutileneBorder,
    },
    buttonPrimary: {
      width: scale(120),
      padding: 8,
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
