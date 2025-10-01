import { useState } from 'react';
import { Loading } from '@/components/Loading';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientContainer } from '@/components/GradientContainer';
import { Header } from '@/components/Header';
import { LeaderboardFilter } from '@/components/LeaderboardFilter';
import { BottomNavigation } from '@/components/BottomNavigation';
import { LeaderboardPodium } from '@/components/LeaderboardPodium';
import { LeaderboardList } from '@/components/LeaderboardList';
import { TimeFilterEnum, TimeFilter } from '@/models/Filters';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useLeaderboardScores } from '@/hooks/useLeaderboardScores';
import { getScoreStyles } from './styles';

export function Score() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(getScoreStyles);
  const [selectedFilter, setSelectedFilter] = useState<TimeFilter>(TimeFilterEnum.ALL);
  const [isChangingFilter, setIsChangingFilter] = useState(false);

  const { data = [], isLoading } = useLeaderboardScores(selectedFilter);
  const showLoading = isLoading || isChangingFilter;
  const topThree = data.slice(0, 3);
  const restOfPlayers = data.slice(3);

  return (
    <GradientContainer>
      <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
        {showLoading ? (
          <Loading />
        ) : (
          <View style={styles.wrapper}>
            <Header title="Placar" onPress={() => navigation.goBack()} />
            <LeaderboardFilter
              selectedFilter={selectedFilter}
              onFilterChange={(filter) => {
                setIsChangingFilter(true);
                setSelectedFilter(filter);
                setTimeout(() => setIsChangingFilter(false), 0);
              }}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}>
              <LeaderboardPodium players={topThree} />
              <View style={styles.playersList}>
                <ScrollView showsVerticalScrollIndicator={true}>
                  {restOfPlayers.map((player, index) => (
                    <LeaderboardList key={player.userId} player={player} />
                  ))}
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        )}
        <BottomNavigation />
      </SafeAreaView>
    </GradientContainer>
  );
}
