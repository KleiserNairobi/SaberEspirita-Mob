import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { verticalScale } from 'react-native-size-matters';
import { AppTheme } from '../../themes';

export const getProgressBarStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginTop: verticalScale(8),
      marginBottom: verticalScale(24),
      flexDirection: 'column',
    },
    questionBox: {
      width: '100%',
      marginTop: verticalScale(6),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    questionBoxTotal: {
      flexDirection: 'row',
    },
    questionTitle: {
      color: theme.colors.titleLight,
      fontSize: RFValue(theme.fontSizes.xs),
      fontFamily: theme.fontFamily.semibold,
    },
    questionCurrent: {
      marginLeft: 4,
      marginRight: 2,
      color: theme.colors.titleLight,
      fontSize: RFValue(theme.fontSizes.xs),
      fontFamily: theme.fontFamily.bold,
    },
    questionTotal: {
      marginLeft: 2,
      color: theme.colors.titleLight,
      fontSize: RFValue(theme.fontSizes.xs),
      fontFamily: theme.fontFamily.semibold,
    },
    bar: {
      height: verticalScale(6),
      width: '100%',
      marginTop: verticalScale(6),
      borderRadius: 8,
      backgroundColor: theme.colors.secondary,
    },
    progress: {
      height: verticalScale(6),
      borderRadius: 8,
      backgroundColor: theme.colors.primary,
    },
  });
