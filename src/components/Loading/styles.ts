import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getLoadingStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerWithBackground: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });
