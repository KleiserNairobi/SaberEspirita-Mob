import { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageStyle,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientContainer } from '@/components/GradientContainer';
import { Header } from '@/components/Header';
import { LeaderboardFilter } from '@/components/LeaderboardFilter';
import { BottomNavigation } from '@/components/BottomNavigation';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getScoreStyles } from './styles';

// import { Ionicons } from '@expo/vector-icons';

type TimeFilter = 'allTime' | 'thisWeek' | 'thisMonth';

export function Score() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(getScoreStyles);
  const [selectedFilter, setSelectedFilter] = useState<TimeFilter>('allTime');

  // const [selectedFilter, setSelectedFilter] = useState('Desde sempre');
  // const filters = ['Desde sempre', 'Semanal', '24 Horas'];

  return (
    <GradientContainer>
      <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
        <View style={styles.wrapper}>
          <Header title="Placar" onPress={() => navigation.goBack()} />
          <LeaderboardFilter selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
        </View>
        <BottomNavigation />
      </SafeAreaView>
    </GradientContainer>
  );
}
