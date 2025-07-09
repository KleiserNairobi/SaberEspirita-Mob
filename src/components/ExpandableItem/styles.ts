import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

export const getExpandableItemStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: verticalScale(10),
      marginBottom: verticalScale(16),
      flexDirection: 'column',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.colors.optionNormalBorder,
      backgroundColor: theme.colors.optionNormalBackground,
    },
    boxTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    boxTitleWrapper: {
      flex: 1,
      flexWrap: 'wrap',
    },
    title: {
      color: theme.colors.titleBold,
      fontSize: RFValue(theme.fontSizes.md),
      fontFamily: theme.fontFamily.semibold,
    },
    content: {
      marginTop: verticalScale(8),
      color: theme.colors.titleNormal,
      fontSize: RFValue(theme.fontSizes.sm),
      fontFamily: theme.fontFamily.regular,
    },
  });
