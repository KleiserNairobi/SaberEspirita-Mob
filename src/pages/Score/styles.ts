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
  });
