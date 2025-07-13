import {
  ImageBackground,
  ImageSourcePropType,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { scale } from 'react-native-size-matters';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getCardCategoryStyles } from './styles';
import { useTheme } from '@/hooks/useTheme';

type CardType = TouchableOpacityProps & {
  title: string;
  subtitle: string;
  percentage: number;
  imageBackground?: ImageSourcePropType;
};

export function CardCategory({ title, subtitle, percentage, imageBackground, ...rest }: CardType) {
  const theme = useTheme();
  const styles = useThemedStyles(getCardCategoryStyles);

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground source={imageBackground} style={styles.backImage} resizeMode="stretch">
        <View style={styles.imageDataColumn}>
          <CircularProgress
            value={percentage}
            radius={scale(24)}
            valueSuffix={'%'}
            activeStrokeWidth={5}
            activeStrokeColor={theme.colors.cardProgressPrimary}
            inActiveStrokeWidth={5}
            inActiveStrokeColor={theme.colors.cardProgressSecondary}
            inActiveStrokeOpacity={0.7}
            progressValueColor={theme.colors.cardSubtitle}
            progressValueFontSize={theme.fontSizes.xs}
            progressValueStyle={{ fontFamily: theme.fontFamily.semibold }}
          />
          <View style={styles.columnTitle}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
