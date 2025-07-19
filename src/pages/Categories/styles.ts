import { Platform, StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getCategoriesStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    greetingBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: Platform.OS === 'android' ? theme.vSpacings.xl3 : theme.vSpacings.md,
      marginLeft: theme.hSpacings.md,
      marginRight: theme.hSpacings.md,
    },
    greeting: {
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.medium,
    },
    title: {
      marginLeft: theme.hSpacings.md,
      marginRight: theme.hSpacings.md,
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.medium,
    },
    category: {
      marginLeft: theme.hSpacings.md,
      marginRight: theme.hSpacings.md,
      marginTop: theme.vSpacings.md,
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.xl,
      fontFamily: theme.fontFamily.bold,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleLoading: {
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.medium,
    },
  });
