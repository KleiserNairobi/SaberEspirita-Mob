import { useState } from 'react';
import Icon from 'react-native-remix-icon';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { scale } from 'react-native-size-matters';
import { View, Text, TouchableOpacity } from 'react-native';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { getExpandableItemStyles } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  content: string;
};

export function ExpandableItem({ title, content, ...rest }: Props) {
  const theme = useTheme();
  const styles = useThemedStyles(getExpandableItemStyles);
  const [expanded, setExpanded] = useState(false);

  function toggleExpansion() {
    setExpanded(!expanded);
  }

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
      {expanded && <Text style={styles.content}>{content}</Text>}
    </TouchableOpacity>
  );
}
