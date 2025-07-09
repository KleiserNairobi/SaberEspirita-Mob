import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { scale, verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

export const getCardSubcategoryStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      padding: scale(10),
      marginBottom: verticalScale(12),
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.optionNormalBorder,
      backgroundColor: theme.colors.optionNormalBackground,
    },
    box: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    boxTitle: {
      width: '90%',
      justifyContent: 'center',
    },
    boxIcon: {
      width: '10%',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    title: {
      color: theme.colors.cardSubcategoryTitle,
      fontSize: RFValue(theme.fontSizes.md),
      fontFamily: theme.fontFamily.semibold,
    },
    subtitle: {
      color: theme.colors.cardSubcategorySubtitle,
      fontSize: RFValue(theme.fontSizes.sm),
      fontFamily: theme.fontFamily.regular,
    },
    quizCount: {
      paddingTop: verticalScale(4),
      color: theme.colors.cardSubcategoryQuizCount,
      fontSize: RFValue(theme.fontSizes.sm),
      fontFamily: theme.fontFamily.regular,
    },
  });
