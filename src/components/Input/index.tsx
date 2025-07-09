import { useState } from 'react';
import { Platform, TextInput, TextInputProps, View, Text, TouchableOpacity } from 'react-native';
import Icon, { IconName } from 'react-native-remix-icon';
import { scale } from 'react-native-size-matters';
import { useTheme } from '@/hooks/useTheme';
import { useThemedStylesProps } from '@/hooks/useThemedStyles';
import { getInputStyles } from './styles';

type InputProps = TextInputProps & {
  multiline?: boolean;
  label: string;
  error?: string;
  iconName?: IconName;
  password?: boolean;
  onFocus?: () => void;
};

export function Input({
  multiline = false,
  label,
  error,
  iconName,
  password = false,
  onFocus,
  ...rest
}: InputProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);

  const styles = useThemedStylesProps(getInputStyles, {
    error: !!error,
    isFocused,
    platform: Platform.OS,
    multiline,
  });

  return (
    <View style={styles.Container}>
      <Text style={styles.MyLabel}>{label}</Text>
      <View style={styles.InputContainer}>
        <View style={styles.IconLeft}>
          {iconName && (
            <Icon
              name={iconName}
              size={scale(20)}
              color={isFocused ? theme.colors.primary : theme.colors.inputPlaceholder}
            />
          )}
        </View>
        <TextInput
          style={styles.StyledTextInput}
          secureTextEntry={hidePassword}
          multiline={multiline}
          placeholderTextColor={theme.colors.inputPlaceholder}
          onFocus={() => {
            onFocus?.();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {password && (
          <TouchableOpacity style={styles.IconRight} onPress={() => setHidePassword(!hidePassword)}>
            <Icon
              name={hidePassword ? 'eye-line' : 'eye-off-line'}
              size={scale(20)}
              color={isFocused ? theme.colors.primary : theme.colors.inputPlaceholder}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.StyleError}>{error}</Text>}
    </View>
  );
}
