import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getSubcategoriesStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: theme.hSpacings.md,
    },
    category: {
      marginTop: 20,
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.xl3,
      fontFamily: theme.fontFamily.bold,
    },
    description: {
      marginTop: theme.vSpacings.xs,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    continue: {
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.xl,
      fontFamily: theme.fontFamily.semibold,
    },
    quizes: {
      marginTop: theme.vSpacings.lg,
      marginBottom: theme.vSpacings.sm,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.lg,
      fontFamily: theme.fontFamily.semibold,
    },
    scroll: {
      marginTop: 0,
    },
    containerModal: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 10,
      elevation: 10,
    },
  });
