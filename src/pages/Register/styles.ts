import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getRegisterStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      height: 140,
      paddingTop: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      backgroundColor: theme.colors.bottonNavigationBack,
    },
    content: {
      flex: 1,
      position: 'relative',
      marginTop: 10,
      paddingLeft: 24,
      paddingRight: 24,
    },
    columnLogo: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    logo: {
      height: 50,
      width: 50,
      resizeMode: 'contain',
    },
    titleLogo: {
      color: theme.colors.titleQuiz,
      fontSize: theme.fontSizes.xl7,
      fontFamily: theme.fontLogo.regular,
    },
    containerHeader: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 40,
    },
    titleHeader: {
      textAlign: 'center',
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.xl2,
      fontFamily: theme.fontFamily.bold,
    },
    subtitleHeader: {
      textAlign: 'center',
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.semibold,
    },
    spaceButton: {
      marginTop: 20,
      marginBottom: 10,
    },
    buttonLogin: {
      marginTop: 20,
      marginBottom: 30,
    },
    login: {
      textAlign: 'center',
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.semibold,
    },
    linkLogin: {
      color: theme.colors.primary,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.semibold,
    },
    containerModal: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });
