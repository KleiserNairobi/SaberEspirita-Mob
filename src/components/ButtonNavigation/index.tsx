import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Icon, { IconName } from 'react-native-remix-icon';
import { scale } from 'react-native-size-matters';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { useTheme } from '../../hooks/useTheme';
import { getButtonNavigationStyles } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  iconName: IconName;
  iconSize: number;
  active: boolean;
};

export function ButtonNavigation({ title, iconName, iconSize, active = false, ...rest }: Props) {
  const theme = useTheme();
  const styles = useThemedStyles(getButtonNavigationStyles);

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Icon
        name={iconName}
        size={scale(iconSize)}
        color={active ? theme.colors.accented : theme.colors.bottonNavigationTitle}
      />
      <Text style={[styles.title, active && styles.titleActive]}>{title}</Text>
    </TouchableOpacity>
  );
}
