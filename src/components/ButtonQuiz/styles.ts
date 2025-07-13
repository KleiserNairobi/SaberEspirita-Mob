import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getButtonQuizStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: theme.vSpacings.sm,
      paddingHorizontal: theme.hSpacings.sm,
      marginBottom: theme.vSpacings.sm,
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
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    titleChecked: {
      color: theme.colors.optionSelectedTitle,
    },
  });
