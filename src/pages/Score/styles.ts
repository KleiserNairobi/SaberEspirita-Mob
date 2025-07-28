import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getScoreStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      marginLeft: 24,
      marginRight: 24,
    },
    scrollContent: {
      paddingBottom: 250,
    },
    playersList: {
      marginTop: 20,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingTop: 10,
      minHeight: 500,

      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.colors.cardQuizBorder,
      backgroundColor: theme.colors.cardQuizBackground,
    },
  });
