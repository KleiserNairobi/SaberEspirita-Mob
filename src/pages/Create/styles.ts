import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getCreateStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 24,
      marginRight: 24,
    },
    title: {
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.xl3,
      fontFamily: theme.fontFamily.bold,
    },
    subtitle: {
      marginTop: 8,
      marginBottom: 20,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    viewDropdown: {
      marginBottom: 15,
      zIndex: 1,
    },
    containerModal: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    buttonContainer: {
      marginTop: 25,
      marginBottom: 50,
    },
  });
