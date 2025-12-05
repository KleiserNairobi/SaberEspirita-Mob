import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getSimpleProgressBarStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      height: 8,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progress: {
      height: '100%',
      borderRadius: 4,
    },
  });
