import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

export const getBottomNavigationStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      bottom: 0,
      width: '100%',
      height: verticalScale(64),
      paddingLeft: scale(50),
      paddingRight: scale(50),
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
