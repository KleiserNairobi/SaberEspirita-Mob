import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getLeaderboardPodiumStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    podium: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      height: 236,
      marginBottom: 10,
    },
    podiumFirst: {
      flex: 1,
      alignItems: 'center',
      height: '100%',
      justifyContent: 'flex-end',
    },
    podiumSecond: {
      flex: 1,
      alignItems: 'center',
      height: '80%',
      justifyContent: 'flex-end',
    },
    podiumThird: {
      flex: 1,
      alignItems: 'center',
      height: '80%',
      justifyContent: 'flex-end',
    },
    avatarContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.buttonBack,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      borderWidth: 3,
      borderColor: theme.colors.primary,
    },
    avatar: {
      width: 74,
      height: 74,
      borderRadius: 37,
    },
    avatarText: {
      fontSize: theme.fontSizes.xl,
      fontFamily: theme.fontFamily.semibold,
      color: theme.colors.titleBold,
    },
    scoreBar: {
      width: '80%',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    firstPlaceBar: {
      height: 120,
      backgroundColor: theme.colors.cardProgressPrimary,
    },
    secondPlaceBar: {
      height: 90,
      backgroundColor: theme.colors.cardProgressSecondary,
    },
    thirdPlaceBar: {
      height: 90,
      backgroundColor: theme.colors.cardProgressBorder,
    },
    scoreText: {
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.titleBlack,
    },
    positionText: {
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.titleBold,
    },
    namesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingHorizontal: 10,
    },
    nameText: {
      flex: 1,
      textAlign: 'center',
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.semibold,
      color: theme.colors.titleBold,
      marginHorizontal: 5,
    },
    emptyText: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: theme.fontSizes.md,
      color: theme.colors.titleNormal,
    },
  });
