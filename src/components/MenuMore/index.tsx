import { TouchableOpacity, TouchableOpacityProps, View, Text } from 'react-native';
import Icon from 'react-native-remix-icon';
import { verticalScale } from 'react-native-size-matters';
import { useTheme } from '@/hooks/useTheme';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getMenuMoreStyles } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  iconName: string;
};

export function MenuMore({ iconName, title, ...rest }: Props) {
  const theme = useTheme();
  const styles = useThemedStyles(getMenuMoreStyles);

  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <View style={styles.boxTitle}>
        <Icon name={iconName as any} size={verticalScale(24)} color={theme.colors.primary} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Icon name="arrow-right-s-line" size={verticalScale(24)} color={theme.colors.titleNormal} />
    </TouchableOpacity>
  );
}
