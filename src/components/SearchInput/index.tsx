import React, {useState} from 'react';
import {Platform, TextInputProps} from 'react-native';
import {useTheme} from 'styled-components/native';
import Icon from 'react-native-remix-icon';
import {scale} from 'react-native-size-matters';

import {
  Container,
  InputContainer,
  IconLeft,
  StyledTextInput,
  IconRight,
} from './styles';

type SearchInputProps = TextInputProps & {
  onClear?: () => void;
  value: string;
};

export function SearchInput({value, onClear, ...rest}: SearchInputProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container>
      <InputContainer
        error={false}
        isFocused={isFocused}
        platform={Platform.OS}>
        <IconLeft>
          <Icon
            name='search-line'
            size={scale(20)}
            color={
              isFocused ? theme.colors.primary : theme.colors.inputPlaceholder
            }
          />
        </IconLeft>
        <StyledTextInput
          value={value}
          platform={Platform.OS}
          isFocused={isFocused}
          error={false}
          placeholder='Buscar...'
          placeholderTextColor={theme.colors.inputPlaceholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize='none'
          keyboardType='default'
          {...rest}
        />
        {value.length > 0 && (
          <IconRight onPress={onClear}>
            <Icon
              name='close-line'
              size={scale(20)}
              color={theme.colors.inputPlaceholder}
            />
          </IconRight>
        )}
      </InputContainer>
    </Container>
  );
}
