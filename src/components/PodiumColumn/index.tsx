import { View, Text } from 'react-native';
import { getPodiumColumnStyles } from './styles';
import { useThemedStyles } from '@/hooks/useThemedStyles';

export const PodiumColumn = ({
  rank,
  player,
  isWinner,
}: {
  rank: number;
  player?: { userName: string; score: number };
  isWinner: boolean;
}) => {
  const styles = useThemedStyles(getPodiumColumnStyles);
  const barHeight = isWinner ? 130 : 100;
  const avatarBottomOffset = barHeight + 20;

  if (!player) {
    return (
      <View style={styles.containerColumn}>
        <Text style={styles.textName}>Sem dados</Text>
      </View>
    );
  }

  const userInitial = player.userName.charAt(0).toUpperCase();

  return (
    <View style={styles.containerColumn}>
      <View style={[styles.avatarWrapper, { bottom: avatarBottomOffset }]}>
        <Text style={styles.rankNumber}>{rank}</Text>
        <View style={styles.avatar}>
          <Text>{userInitial}</Text>
        </View>
      </View>

      <View style={[styles.chartBarContainer, { height: barHeight + 30 }]}>
        <View style={[styles.chartBar, isWinner && styles.chartBarWinner, { height: barHeight }]} />
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{player.score}</Text>
      </View>

      <View style={styles.textNameContainer}>
        <Text style={styles.textName} numberOfLines={2}>
          {player.userName}
        </Text>
      </View>
    </View>
  );
};
