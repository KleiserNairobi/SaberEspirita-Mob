import { StyleSheet } from 'react-native';

import { AppTheme } from '@/themes';

export const getBottomNavigationStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      bottom: 0,
      width: '100%',
      height: theme.vSpacings.xl4,
      paddingHorizontal: theme.hSpacings.xl2,
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderWidth: 1,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      borderColor: theme.colors.bottomNavigationBorder,
      backgroundColor: theme.colors.bottonNavigationBack,
    },
  });
