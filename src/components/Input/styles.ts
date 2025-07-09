import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { scale, verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

type Props = {
  error: boolean;
  isFocused: boolean;
  platform: string;
  multiline?: boolean;
};

type PropsTextInput = {
  error: boolean;
  platform: string;
  isFocused: boolean;
};

export const getInputStyles = (theme: AppTheme, props: Props & PropsTextInput) =>
  StyleSheet.create({
    Container: {
      flexDirection: 'column',
      marginBottom: verticalScale(20),
    },
    MyLabel: {
      marginBottom: verticalScale(4),
      color: theme.colors.titleNormal,
      fontSize: RFValue(theme.fontSizes.sm),
      fontFamily: theme.fontFamily.semibold,
    },
    InputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 6,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: props.platform === 'ios' ? verticalScale(10) : 0,
      paddingBottom: props.platform === 'ios' ? verticalScale(10) : 0,
      backgroundColor: theme.colors.terciary,
      borderColor: props.error
        ? theme.colors.optionErrorBorder
        : props.isFocused
          ? theme.colors.primary
          : theme.colors.optionNormalBorder,
      height: props.multiline ? verticalScale(100) : undefined,
      textAlignVertical: props.multiline ? 'top' : undefined,
    },
    IconLeft: {
      paddingRight: 10,
    },
    IconRight: {
      // styled.TouchableOpacity sem estilos no styled original, manter vazio
    },
    StyledTextInput: {
      flex: 1,
      color: theme.colors.titleNormal,
      fontSize: RFValue(theme.fontSizes.sm),
      fontFamily: theme.fontFamily.regular,
      borderWidth: 0,
      borderColor: props.error
        ? theme.colors.optionErrorBorder
        : props.isFocused
          ? theme.colors.primary
          : theme.colors.optionNormalBorder,
    },
    StyleError: {
      marginTop: verticalScale(4),
      color: theme.colors.optionErrorBorder,
      fontSize: RFValue(theme.fontSizes.xs),
      fontFamily: theme.fontFamily.regular,
    },
  });
