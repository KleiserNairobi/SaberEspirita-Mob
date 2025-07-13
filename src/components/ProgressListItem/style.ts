import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

export const getProgressListItemStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingLeft: verticalScale(16),
      paddingRight: verticalScale(16),
      paddingTop: verticalScale(10),
      paddingBottom: verticalScale(10),
      marginBottom: verticalScale(10),
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.colors.cardQuizBorder,
      backgroundColor: theme.colors.cardQuizBackground,
    },
    boxRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    boxColumnLeft: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    boxColumnCenter: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    quizName: {
      flexWrap: 'wrap',
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.semibold,
    },
    dateTime: {
      color: theme.colors.titleLight,
      fontSize: theme.fontSizes.xs,
      fontFamily: theme.fontFamily.regular,
    },
    percentage: {
      color: theme.colors.accented,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.bold,
    },
    textPercentage: {
      marginTop: verticalScale(2),
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    boxStar: {
      marginTop: verticalScale(2),
      flexDirection: 'row',
    },
  });
