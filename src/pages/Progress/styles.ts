import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getProgressStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      marginLeft: 24,
      marginRight: 24,
    },
    title: {
      marginTop: 20,
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.xl3,
      fontFamily: theme.fontFamily.bold,
    },
    subtitle: {
      marginTop: 8,
      marginBottom: 25,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.medium,
    },
    completedQuizes: {
      marginBottom: 10,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.xl,
      fontFamily: theme.fontFamily.bold,
    },
    boxFlatListEmpty: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageSearch: {
      height: 80,
      width: 80,
      marginTop: 20,
    },
    titleFlatListEmpty: {
      marginTop: 24,
      marginBottom: 8,
      textAlign: 'center',
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.lg,
      fontFamily: theme.fontFamily.bold,
    },
    subtitleFlatListEmpty: {
      textAlign: 'center',
      marginBottom: 40,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.lg,
      fontFamily: theme.fontFamily.regular,
    },
  });
