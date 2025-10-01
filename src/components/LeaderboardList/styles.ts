import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getLeaderboardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.optionNormalBorder,
    },
    positionContainer: {
      width: 40,
      alignItems: 'center',
    },
    positionText: {
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.titleLight,
    },
    avatarContainer: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: theme.colors.buttonBack,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    avatar: {
      width: 34,
      height: 34,
      borderRadius: 17,
    },
    avatarText: {
      fontSize: theme.fontSizes.xxs,
      fontFamily: theme.fontFamily.semibold,
      color: theme.colors.titleLight,
    },
    playerInfo: {
      flex: 1,
      marginLeft: 10,
    },
    playerName: {
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.titleBold,
    },
    playerLevel: {
      marginTop: 2,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.titleLight,
    },
    scoreContainer: {
      alignItems: 'flex-end',
    },
    score: {
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.bold,
      color: theme.colors.accented,
    },
  });
