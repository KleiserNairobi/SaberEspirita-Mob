import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { getButtonFilterProgressStyles } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  active: boolean;
};

export function ButtonFilterProgress({ title, active, ...rest }: Props) {
  const styles = useThemedStyles(getButtonFilterProgressStyles);

  return (
    <TouchableOpacity style={[styles.button, active && styles.buttonActive]} {...rest}>
      <Text style={[styles.title, active && styles.titleActive]}>{title}</Text>
    </TouchableOpacity>
  );
}
