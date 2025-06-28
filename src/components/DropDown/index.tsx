import React, {useState} from 'react';
import DropDownPicker, {
  DropDownPickerProps,
} from 'react-native-dropdown-picker';
import Icon from 'react-native-remix-icon';
import {RFValue} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from 'styled-components/native';
import {StyleError, StyleLabel} from './styles';

function ArrowUpIcon() {
  const theme = useTheme();
  return (
    <Icon
      name={'arrow-up-s-line'}
      color={theme.colors.titleNormal}
      size={scale(24)}
    />
  );
}

function ArrowDownIcon() {
  const theme = useTheme();
  return (
    <Icon
      name={'arrow-down-s-line'}
      color={theme.colors.titleNormal}
      size={scale(24)}
    />
  );
}

type Props = DropDownPickerProps<any> & {
  label: string;
  error?: string;
  onFocus?: () => void;
};

export function DropDown({label, error, onFocus, ...rest}: Props) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  function handleBlur() {
    setIsFocused(false);
  }

  function handleFocus() {
    setIsFocused(true);
    if (onFocus) {
      onFocus();
    }
  }

  return (
    <>
      <StyleLabel>{label}</StyleLabel>
      <DropDownPicker
        {...rest}
        // Configurações do DropDown
        showTickIcon={false}
        placeholderStyle={{color: theme.colors.inputPlaceholder}}
        labelStyle={{color: theme.colors.titleNormal}}
        style={{
          backgroundColor: theme.colors.terciary,
          borderColor: isFocused
            ? theme.colors.primary
            : theme.colors.optionNormalBorder,
          paddingLeft: scale(20),
        }}
        textStyle={{
          fontFamily: theme.fontFamily.nunito.regular,
          fontSize: RFValue(theme.fontSize.sm),
        }}
        // Configurações da modal
        listMode='MODAL'
        modalTitle='Selecione uma opção'
        modalProps={{animationType: 'fade'}}
        modalContentContainerStyle={{
          backgroundColor: theme.colors.terciary,
          padding: verticalScale(20),
        }}
        modalTitleStyle={{
          color: theme.colors.titleBold,
          fontWeight: 'bold',
        }}
        searchContainerStyle={{
          marginBottom: verticalScale(20),
          backgroundColor: theme.colors.terciary,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.optionNormalBorder,
        }}
        listItemContainerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.optionNormalBorder,
        }}
        listItemLabelStyle={{
          color: theme.colors.titleNormal,
          fontFamily: theme.fontFamily.nunito.regular,
        }}
        selectedItemLabelStyle={{
          color: theme.colors.primary,
          fontFamily: theme.fontFamily.nunito.regular,
          fontWeight: 'bold',
        }}
        closeIconStyle={{
          tintColor: theme.colors.buttonBackTitle,
          width: scale(20),
          height: scale(20),
        }}
        closeIconContainerStyle={{
          backgroundColor: theme.colors.buttonBack,
          borderRadius: scale(20),
          padding: scale(8),
        }}
        ArrowUpIconComponent={ArrowUpIcon}
        ArrowDownIconComponent={ArrowDownIcon}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onOpen={handleFocus}
        onClose={handleBlur}
      />
      {error && <StyleError>{error}</StyleError>}
    </>
  );
}
