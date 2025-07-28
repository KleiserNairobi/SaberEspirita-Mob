import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';
import { scale, verticalScale } from 'react-native-size-matters';

export const getLeaderboardPodiumStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: scale(20),
    },
    podium: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      height: verticalScale(210),
      marginBottom: verticalScale(10),
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
      width: scale(60),
      height: scale(60),
      borderRadius: scale(30),
      backgroundColor: theme.colors.buttonBack,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: verticalScale(10),
      borderWidth: 3,
      borderColor: theme.colors.primary,
    },
    avatar: {
      width: scale(60),
      height: scale(60),
      borderRadius: scale(30),
    },
    avatarText: {
      fontSize: theme.fontSizes.lg,
      fontFamily: theme.fontFamily.semibold,
      color: theme.colors.titleBold,
    },
    scoreBar: {
      width: '80%',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: verticalScale(10),
    },
    firstPlaceBar: {
      height: verticalScale(100),
      backgroundColor: theme.colors.firstPlace,
    },
    secondPlaceBar: {
      height: verticalScale(70),
      backgroundColor: theme.colors.secondPlace,
    },
    thirdPlaceBar: {
      height: verticalScale(70),
      backgroundColor: theme.colors.thirdPlace,
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
