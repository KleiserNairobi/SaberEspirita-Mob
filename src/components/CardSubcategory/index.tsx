import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Icon from 'react-native-remix-icon';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getCardSubcategoryStyles } from './styles';
import { useTheme } from '@/hooks/useTheme';
import { verticalScale } from 'react-native-size-matters';

type CardType = TouchableOpacityProps & {
  title: string;
  subtitle: string;
  quizCount: number;
  completed: boolean;
};

export function CardSubcategory({ title, subtitle, quizCount, completed, ...rest }: CardType) {
  const theme = useTheme();
  const styles = useThemedStyles(getCardSubcategoryStyles);

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <View style={styles.box}>
        <View style={styles.boxTitle}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          {quizCount && <Text style={styles.quizCount}>{quizCount.toString()} questões</Text>}
        </View>
        <View style={styles.boxIcon}>
          {completed ? (
            <Icon
              name="checkbox-circle-line"
              color={theme.colors.primary}
              size={verticalScale(28)}
            />
          ) : (
            <Icon
              name="checkbox-blank-circle-line"
              color={theme.colors.optionNormalBorder}
              size={verticalScale(28)}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
