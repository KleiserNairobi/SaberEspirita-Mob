import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getFinishStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 24,
      marginRight: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    starsAndBooks: {
      width: '100%',
      height: '24%',
    },
    subcategory: {
      marginTop: 32,
      textAlign: 'center',
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.lg,
      fontFamily: theme.fontFamily.semibold,
    },
    category: {
      textAlign: 'center',
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.medium,
    },
    boxRow: {
      width: '100%',
      marginTop: 16,
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
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.medium,
    },
    title: {
      marginTop: 32,
      marginBottom: 8,
      textAlign: 'center',
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.lg,
      fontFamily: theme.fontFamily.semibold,
    },
    message: {
      marginBottom: 50,
      textAlign: 'center',
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    boxButton: {
      marginTop: 20,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    buttonSecondary: {
      width: 100,
      padding: 8,
      borderWidth: 2,
      borderRadius: 18,
      alignItems: 'center',
      borderColor: theme.colors.buttonActionOutileneBorder,
    },
    buttonPrimary: {
      width: 100,
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
