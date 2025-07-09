import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { getButtonActionOutileneStyles } from './styles';

type CardType = TouchableOpacityProps & {
  title: string;
};

export function ButtonActionOutilene({ title, disabled, ...rest }: CardType) {
  const styles = useThemedStyles(getButtonActionOutileneStyles);

  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.containerDisabled]}
      {...rest}
      disabled={disabled}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
