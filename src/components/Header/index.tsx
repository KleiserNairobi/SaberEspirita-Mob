import Icon from 'react-native-remix-icon';
import { TouchableOpacityProps } from 'react-native';
import { View, TouchableOpacity, Text } from 'react-native';
import { getHeaderStyles } from './styles';
import { useTheme } from '@/hooks/useTheme';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { scale } from 'react-native-size-matters';

type HeaderType = TouchableOpacityProps & {
  title?: string;
};

export function Header({ title, ...rest }: HeaderType) {
  const theme = useTheme();
  const styles = useThemedStyles(getHeaderStyles);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} {...rest}>
        <Icon name="arrow-left-line" size={scale(20)} color={theme.colors.buttonBackTitle} />
      </TouchableOpacity>
      {title && <Text style={styles.category}>{title}</Text>}
    </View>
  );
}
