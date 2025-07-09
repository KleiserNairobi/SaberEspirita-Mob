import { View, Text } from 'react-native';
import Icon from 'react-native-remix-icon';
import { verticalScale } from 'react-native-size-matters';
import { useTheme } from '@/hooks/useTheme';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getProgressListItemStyles } from './style';

type Props = {
  level: string;
  title: string;
  dateTime: string;
  percentage: string;
};

export function ProgressListItem({ level, title, dateTime, percentage }: Props) {
  const styles = useThemedStyles(getProgressListItemStyles);
  const theme = useTheme();

  let filledCount = 0;

  switch (level) {
    case 'Fraco':
      filledCount = 1;
      break;
    case 'Regular':
      filledCount = 2;
      break;
    case 'Bom':
      filledCount = 3;
      break;
    case 'Ótimo':
      filledCount = 4;
      break;
    default:
      filledCount = 1;
  }

  const renderStars = (filledCount: number) => {
    const stars = [];
    for (let i = 0; i < 4; i++) {
      const filled = i < filledCount;
      stars.push(
        <Icon
          key={i}
          size={verticalScale(16)}
          name="star-fill"
          color={filled ? theme.colors.accented : theme.colors.cardQuizBorder}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxRow}>
        <View style={styles.boxColumnLeft}>
          <Text style={styles.quizName}>{title}</Text>
          <Text style={styles.dateTime}>{dateTime}</Text>
        </View>
        <View style={styles.boxColumnCenter}>
          <Text style={styles.percentage}>{percentage}</Text>
          <Text style={styles.textPercentage}>de acertos</Text>
          <View style={styles.boxStar}>{renderStars(filledCount)}</View>
        </View>
      </View>
    </View>
  );
}
