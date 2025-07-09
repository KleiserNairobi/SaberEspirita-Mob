import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

export const getButtonQuizStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      padding: verticalScale(12),
      marginBottom: verticalScale(12),
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.optionNormalBorder,
      backgroundColor: theme.colors.optionNormalBackground,
    },
    containerCheckedSuccess: {
      borderColor: theme.colors.optionSuccessBorder,
      backgroundColor: theme.colors.optionSuccessBackground,
    },
    containerCheckedError: {
      borderColor: theme.colors.optionErrorBorder,
      backgroundColor: theme.colors.optionErrorBackground,
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
      color: theme.colors.optionNormalTitle,
      fontSize: RFValue(theme.fontSizes.sm),
      fontFamily: theme.fontFamily.regular,
    },
    titleChecked: {
      color: theme.colors.optionSelectedTitle,
    },
  });
