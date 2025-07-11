import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getTermsStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 24,
      marginRight: 24,
    },
    title: {
      marginTop: 20,
      marginBottom: 16,
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.xl3,
      fontFamily: theme.fontFamily.bold,
    },
    subtitle: {
      marginTop: 8,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    containerItem: {
      marginTop: 10,
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 24,
      paddingRight: 48,
      flexDirection: 'column',
      borderWidth: 1,
      borderRadius: 16,
      borderColor: theme.colors.optionNormalBorder,
      backgroundColor: theme.colors.terciary,
    },
    containerItem2: {
      marginTop: 10,
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 24,
      paddingRight: 24,
      flexDirection: 'column',
      borderWidth: 1,
      borderRadius: 16,
      borderColor: theme.colors.optionNormalBorder,
      backgroundColor: theme.colors.terciary,
    },
    row: {
      flexDirection: 'row',
    },
    item: {
      marginTop: 16,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.lg,
      fontFamily: theme.fontFamily.semibold,
    },
    subitem: {
      marginBottom: 8,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    description: {
      marginLeft: 8,
      marginBottom: 8,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    update: {
      marginTop: 30,
      marginBottom: 50,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.regular,
    },
  });
