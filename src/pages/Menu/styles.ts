import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getMenuStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 24,
      marginRight: 24,
    },
    wrapper: {
      width: '100%',
      marginTop: 32,
    },
    boxItems: {
      flexDirection: 'column',
      marginTop: 30,
    },
    boxVersion: {
      flexDirection: 'column',
      marginTop: 30,
    },
    version: {
      color: theme.colors.titleLight,
      fontSize: theme.fontSizes.xs,
      fontFamily: theme.fontFamily.medium,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    rowTitle: {
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.medium,
    },
    containerModal: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    titleModal: {
      textAlign: 'center',
      paddingLeft: 24,
      paddingRight: 24,
      marginTop: 8,
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.lg,
      fontFamily: theme.fontFamily.bold,
    },
    subtitleModal: {
      textAlign: 'center',
      paddingLeft: 24,
      paddingRight: 24,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.semibold,
    },
    rowModal: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: 30,
      marginBottom: 30,
      marginLeft: 30,
      marginRight: 30,
    },
    shareButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.buttonBack,
    },
    buttonPrimary: {
      width: 80,
      padding: 8,
      borderRadius: 18,
      marginLeft: 10,
      backgroundColor: theme.colors.primary,
    },
    titleButtonPrimary: {
      textAlign: 'center',
      color: theme.colors.titleBlack,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.semibold,
    },
    viewButton: {
      alignItems: 'center',
    },
  });
