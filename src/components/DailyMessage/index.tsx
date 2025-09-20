import { useState } from 'react';
import Icon from 'react-native-remix-icon';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { scale } from 'react-native-size-matters';
import { View, Text, TouchableOpacity } from 'react-native';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { getDailyMessageStyles } from './styles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

type Props = TouchableOpacityProps & {
  title: string;
  content: string;
};

export function DailyMessage({ title, content, ...rest }: Props) {
  const theme = useTheme();
  const styles = useThemedStyles(getDailyMessageStyles);
  const [expanded, setExpanded] = useState(true);

  // Valores animados - usando maxHeight para conteúdo variável
  const animatedMaxHeight = useSharedValue(expanded ? 1000 : 0);
  const animatedOpacity = useSharedValue(expanded ? 1 : 0);

  function toggleExpansion() {
    const targetMaxHeight = expanded ? 0 : 1000;
    const targetOpacity = expanded ? 0 : 1;

    animatedMaxHeight.value = withTiming(targetMaxHeight, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });

    animatedOpacity.value = withTiming(targetOpacity, {
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    });

    setExpanded(!expanded);
  }

  // Estilos animados
  const animatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: animatedMaxHeight.value,
      opacity: animatedOpacity.value,
      overflow: 'hidden',
    };
  });

  return (
    <TouchableOpacity style={styles.container} onPress={toggleExpansion} {...rest}>
      <View style={styles.boxTitle}>
        <View style={styles.boxTitleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Icon
          name={expanded ? 'arrow-up-s-line' : 'arrow-down-s-line'}
          color={theme.colors.titleNormal}
          size={scale(24)}
        />
      </View>

      <Animated.View style={animatedStyle}>
        <Text style={styles.content}>{content}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}
