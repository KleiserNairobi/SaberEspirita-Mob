import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getPodiumColumnStyles = (theme: AppTheme) =>
  StyleSheet.create({
    containerColumn: {
      width: '30%',
      alignItems: 'center',
      justifyContent: 'flex-end',
      position: 'relative',
    },

    avatarWrapper: {
      position: 'absolute',
      alignItems: 'center',
    },

    rankNumber: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 4,
      color: theme.colors.titleBold,
    },

    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.background,
      borderWidth: 2,
      borderColor: theme.colors.accented,
      alignItems: 'center',
      justifyContent: 'center',
    },

    chartBarContainer: {
      width: '80%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },

    chartBar: {
      width: '100%',
      backgroundColor: theme.colors.primary,
    },

    chartBarWinner: {
      backgroundColor: theme.colors.accented,
    },

    scoreContainer: {
      marginTop: 8,
    },

    scoreText: {
      fontSize: theme.fontSizes.md,
      fontWeight: 'bold',
      color: theme.colors.titleBold,
      textAlign: 'center',
    },

    textNameContainer: {
      marginTop: 10,
      alignItems: 'center',
    },

    textName: {
      textAlign: 'center',
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.semibold,
      color: theme.colors.titleBold,
    },
  });
