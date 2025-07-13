import { StyleSheet } from 'react-native';

import { AppTheme } from '@/themes';

export const getExpandableItemStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingVertical: theme.vSpacings.xs,
      paddingHorizontal: theme.hSpacings.xs,
      marginBottom: theme.vSpacings.xs,
      flexDirection: 'column',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.colors.optionNormalBorder,
      backgroundColor: theme.colors.optionNormalBackground,
    },
    boxTitle: {
      flexWrap: 'nowrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    boxTitleWrapper: {
      flexShrink: 1,
      flexGrow: 1,
      flexBasis: 0,
    },
    title: {
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.semibold,
    },
    content: {
      marginTop: 6,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
  });
