import { View, Text, TouchableOpacity, Image, ImageStyle } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';

import { Player } from '@/models/Player';
import { getLeaderboardStyles } from './styles';

interface ListProps {
  player: Player;
  position: number;
}

export function LeaderboardList({ player, position }: ListProps) {
  const styles = useThemedStyles(getLeaderboardStyles);
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.positionContainer}>
        <Text style={styles.positionText}>{position}</Text>
      </View>
      <Image source={{ uri: player.avatar }} style={styles.avatar as ImageStyle} />
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={styles.playerLevel}>Level {player.level}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{player.score.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
}
