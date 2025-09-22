import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getUpdateStyles = (theme: AppTheme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modal: {
      // backgroundColor: theme.colors.optionNormalBackground,
      borderRadius: 12,
      padding: 24,
      width: '100%',
      maxWidth: 340,
    },
    title: {
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.lg,
      fontFamily: theme.fontFamily.bold,
      marginBottom: 12,
      textAlign: 'center',
    },
    body: {
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.xs,
      lineHeight: 22,
      marginBottom: theme.vSpacings.lg,
      textAlign: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 12,
    },
    secondaryButton: {
      minWidth: 200,
      alignItems: 'center',
      paddingVertical: theme.vSpacings.xs,
      borderRadius: 18,
      borderWidth: 1,
      backgroundColor: theme.colors.terciary,
      marginBottom: theme.vSpacings.xs,
      borderColor: theme.colors.buttonActionOutileneBorder,
    },
    button: {
      minWidth: 200,
      alignItems: 'center',
      paddingVertical: theme.vSpacings.xs,
      borderRadius: 18,
      backgroundColor: theme.colors.primary,
    },
    secondaryButtonText: {
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.xs,
      fontFamily: theme.fontFamily.semibold,
    },
    buttonText: {
      color: theme.colors.titleBlack,
      fontSize: theme.fontSizes.xs,
      fontFamily: theme.fontFamily.semibold,
    },

    boxIcon: {
      marginBottom: theme.vSpacings.sm,
      alignItems: 'center',
    },
  });
