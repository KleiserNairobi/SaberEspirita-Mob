import { StyleSheet, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { scale, verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

type GetSearchInputStylesParams = {
  isFocused: boolean;
  platform: string;
};

export const getSearchInputStyles = (
  theme: AppTheme,
  { isFocused, platform }: GetSearchInputStylesParams
) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      marginVertical: theme.vSpacings.sm,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 6,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: platform === 'ios' ? verticalScale(10) : 0,
      paddingBottom: platform === 'ios' ? verticalScale(10) : 0,
      backgroundColor: theme.colors.terciary,
      borderColor: isFocused ? theme.colors.primary : theme.colors.optionNormalBorder,
    },
    iconLeft: {
      paddingRight: 10,
    },
    textInput: {
      flex: 1,
      borderWidth: 0,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    iconRight: {
      // vazio, mas pode receber estilos no futuro se necessário
    },
  });
