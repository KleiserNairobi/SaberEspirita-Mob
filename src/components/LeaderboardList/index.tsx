import { View, Text, TouchableOpacity, Image, ImageStyle } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { ILeaderboardUser } from '@/models/UsersLeaderboard';
import { getLeaderboardStyles } from './styles';

interface ListProps {
  player: ILeaderboardUser;
}

export function LeaderboardList({ player }: ListProps) {
  const styles = useThemedStyles(getLeaderboardStyles);
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.positionContainer}>
        <Text style={styles.positionText}>{player.position}</Text>
      </View>
      <Image source={{ uri: player.avatarUrl }} style={styles.avatar as ImageStyle} />
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{player.userName}</Text>
        <Text style={styles.playerLevel}>Level {player.level}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{player.score.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
}
