import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppTheme } from '@/themes';

export const getCardContinueStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      height: 136,
      width: 230,
      padding: 16,
      marginTop: 16,
      borderRadius: 8,
      backgroundColor: theme.colors.cardProgressBackground,
    },
    title: {
      paddingTop: 8,
      color: theme.colors.cardTitle,
      fontSize: RFValue(theme.fontSizes.lg),
      fontFamily: theme.fontFamily.semibold,
    },
    subtitle: {
      paddingTop: 4,
      color: theme.colors.cardSubtitle,
      fontSize: RFValue(theme.fontSizes.sm),
      fontFamily: theme.fontFamily.regular,
    },
  });
