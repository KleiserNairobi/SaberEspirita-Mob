import { Platform, StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getTermsAndPrivacyStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    text: {
      width: '100%',
      textAlign: 'center',
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    link: {
      color: theme.colors.primary,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.semibold,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    webview: {
      flex: 1,
      marginVertical: theme.vSpacings.xs,
      marginHorizontal: theme.hSpacings.xs,
      backgroundColor: theme.colors.background,
    },
    iosHeader: {
      paddingTop: Platform.OS === 'ios' ? theme.vSpacings.xl : 0,
      paddingBottom: 15,
      paddingHorizontal: 15,
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#333333',
    },
    androidHeader: {
      paddingTop: Platform.OS === 'android' ? theme.vSpacings.xs : 0,
      paddingBottom: theme.vSpacings.xs,
      paddingHorizontal: theme.hSpacings.sm,
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#333333',
    },
  });
