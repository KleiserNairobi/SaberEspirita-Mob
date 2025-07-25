import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getLeaderboardFilterStyles } from './styles';

type TimeFilter = 'allTime' | 'thisWeek' | 'thisMonth';

interface FilterProps {
  selectedFilter: TimeFilter;
  onFilterChange: (filter: TimeFilter) => void;
}

export function LeaderboardFilter({ selectedFilter, onFilterChange }: FilterProps) {
  const styles = useThemedStyles(getLeaderboardFilterStyles);
  const segments = [
    { key: 'allTime', label: 'Desde Sempre' },
    { key: 'thisWeek', label: 'Esta Semana' },
    { key: 'thisMonth', label: 'Este Mês' },
  ] as const;

  const animatedStyles = useAnimatedStyle(() => {
    const index = segments.findIndex((s) => s.key === selectedFilter);
    const segmentWidth = 100 / segments.length;
    return {
      width: `${segmentWidth}%`,
      transform: [
        {
          translateX: withTiming(`${index * 100}%`, {
            duration: 300,
            easing: Easing.out(Easing.exp),
          }),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.segmentsContainer}>
        {segments.map((segment) => (
          <TouchableOpacity
            key={segment.key}
            style={styles.segment}
            onPress={() => onFilterChange(segment.key)}>
            <Text
              style={[
                styles.segmentText,
                selectedFilter === segment.key && styles.selectedSegmentText,
              ]}>
              {segment.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Animated.View style={[styles.activeIndicator, animatedStyles]} />
    </View>
  );
}
