import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { TimeFilterEnum, TimeFilterLabels, TimeFilter } from '@/models/Filters';
import { getLeaderboardFilterStyles } from './styles';

interface FilterProps {
  selectedFilter: TimeFilter;
  onFilterChange: (filter: TimeFilter) => void;
}

const segments = [TimeFilterEnum.ALL, TimeFilterEnum.WEEK, TimeFilterEnum.MONTH] as const;

export function LeaderboardFilter({ selectedFilter, onFilterChange }: FilterProps) {
  const styles = useThemedStyles(getLeaderboardFilterStyles);

  const animatedStyles = useAnimatedStyle(() => {
    const index = segments.findIndex((s) => s === selectedFilter);
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
            key={segment}
            style={styles.segment}
            onPress={() => onFilterChange(segment)}>
            <Text
              style={[
                styles.segmentText,
                selectedFilter === segment && styles.selectedSegmentText,
              ]}>
              {TimeFilterLabels[segment]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Animated.View style={[styles.activeIndicator, animatedStyles]} />
    </View>
  );
}
