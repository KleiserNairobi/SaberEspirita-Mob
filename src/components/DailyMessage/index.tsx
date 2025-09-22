import { View, Text } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getDailyMessageStyles } from './styles';

type Props = {
  title: string;
  content: string;
};

export function DailyMessage({ title, content }: Props) {
  const styles = useThemedStyles(getDailyMessageStyles);

  return (
    <View style={styles.container}>
      <View style={styles.boxTitle}>
        <View style={styles.boxTitleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}
