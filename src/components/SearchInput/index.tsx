import { useState } from 'react';
import { Platform, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-remix-icon';
import { scale } from 'react-native-size-matters';
import { useTheme } from '@/hooks/useTheme';
import { useThemedStylesProps } from '@/hooks/useThemedStyles';
import { getSearchInputStyles } from './styles';

type SearchInputProps = TextInputProps & {
  onClear?: () => void;
  value: string;
};

export function SearchInput({ value, onClear, ...rest }: SearchInputProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const styles = useThemedStylesProps(getSearchInputStyles, {
    isFocused,
    platform: Platform.OS,
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.iconLeft}>
          <Icon
            name="search-line"
            size={scale(20)}
            color={isFocused ? theme.colors.primary : theme.colors.inputPlaceholder}
          />
        </View>
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder="Buscar..."
          placeholderTextColor={theme.colors.inputPlaceholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
          keyboardType="default"
          {...rest}
        />
        {value.length > 0 && (
          <TouchableOpacity style={styles.iconRight} onPress={onClear}>
            <Icon name="close-line" size={scale(20)} color={theme.colors.inputPlaceholder} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
