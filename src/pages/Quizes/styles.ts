import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getQuizesStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 24,
      marginRight: 24,
    },
    containerModal: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    scroll: {
      // Estilo vazio mantido para compatibilidade
    },
    subcategory: {
      marginBottom: 24,
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.lg,
      fontFamily: theme.fontFamily.semibold,
    },
    quiz: {
      marginBottom: 30,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.semibold,
      lineHeight: theme.fontSizes.md * 1.2,
    },
    buttonBox: {
      width: '100%',
      marginTop: 30,
      marginBottom: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    boxBackButton: {
      width: '48%',
    },
    boxNextButton: {
      width: '48%',
    },
  });
