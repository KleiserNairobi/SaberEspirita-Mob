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
      backgroundColor: 'white',
      marginTop: 40,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingTop: 24,
      minHeight: 500,
    },
  });
