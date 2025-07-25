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
import { LeaderboardPodium } from '@/components/LeaderboardPodium';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getScoreStyles } from './styles';
import { mockLeaderboardData } from '@/assets/mocks/mockData';
import { LeaderboardList } from '@/components/LeaderboardList';

// import { Ionicons } from '@expo/vector-icons';

type TimeFilter = 'allTime' | 'thisWeek' | 'thisMonth';

export function Score() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(getScoreStyles);
  const [selectedFilter, setSelectedFilter] = useState<TimeFilter>('allTime');

  const getFilteredData = () => {
    return mockLeaderboardData[selectedFilter];
  };

  const filteredData = getFilteredData();
  const topThree = filteredData.slice(0, 3);
  const restOfPlayers = filteredData.slice(3);

  return (
    <GradientContainer>
      <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
        <View style={styles.wrapper}>
          <Header title="Placar" onPress={() => navigation.goBack()} />
          <LeaderboardFilter selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            <LeaderboardPodium players={topThree} />
            <View style={styles.playersList}>
              {restOfPlayers.map((player, index) => (
                <LeaderboardList key={player.id} player={player} position={index + 4} />
              ))}
            </View>
          </ScrollView>
        </View>
        <BottomNavigation />
      </SafeAreaView>
    </GradientContainer>
  );
}
