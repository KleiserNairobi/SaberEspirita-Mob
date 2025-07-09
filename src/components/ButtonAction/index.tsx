import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { getButtonActionStyles } from './styles';

type CardType = TouchableOpacityProps & {
  title: string;
  disabled?: boolean;
};

export function ButtonAction({ title, disabled = false, ...rest }: CardType) {
  const styles = useThemedStyles(getButtonActionStyles);

  return (
    <TouchableOpacity
      style={[styles.container, !disabled && styles.containerEnabled]}
      disabled={disabled}
      {...rest}>
      <Text style={[styles.title, !disabled && styles.titleEnabled]}>{title}</Text>
    </TouchableOpacity>
  );
}
