import { View, Text, Image, ImageStyle } from 'react-native';
import Icon from 'react-native-remix-icon';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getLeaderboardPodiumStyles } from './styles';
import { ILeaderboardUser } from '@/models/UsersLeaderboard';

interface PodiumProps {
  players: ILeaderboardUser[];
}

export function LeaderboardPodium({ players }: PodiumProps) {
  const styles = useThemedStyles(getLeaderboardPodiumStyles);

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 1:
        return { color: '#EF4444', backgroundColor: '#FEF2F2' };
      case 2:
        return { color: '#3B82F6', backgroundColor: '#EFF6FF' };
      case 3:
        return { color: '#10B981', backgroundColor: '#F0FDF4' };
      default:
        return { color: '#6B7280', backgroundColor: '#F9FAFB' };
    }
  };

  const getRibbonColor = (position: number) => {
    switch (position) {
      case 1:
        return ['#F472B6', '#EC4899'];
      case 2:
        return ['#60A5FA', '#3B82F6'];
      case 3:
        return ['#34D399', '#10B981'];
      default:
        return ['#9CA3AF', '#6B7280'];
    }
  };

  // Reorganize players: 2nd, 1st, 3rd
  const arrangedPlayers = [
    players.find((p) => p.position === 2),
    players.find((p) => p.position === 1),
    players.find((p) => p.position === 3),
  ].filter(Boolean) as ILeaderboardUser[];

  // Different heights for podium effect
  const heights = [120, 140, 100];

  return (
    <View style={styles.container}>
      {arrangedPlayers.map((player, index) => {
        const actualPosition = player.position;
        const positionStyle = getPositionStyle(actualPosition);
        const ribbonColors = getRibbonColor(actualPosition);
        const height = heights[index];

        return (
          <View key={player.userId} style={styles.playerContainer}>
            <View style={styles.positionBadge}>
              <Text style={[styles.positionText, { color: positionStyle.color }]}>
                {actualPosition}
              </Text>
              {actualPosition === 1 && (
                <View style={styles.crownContainer}>
                  {/* <Icon name="vip-crown-line" size={20} color="#F59E0B" /> */}
                </View>
              )}
            </View>

            <View style={[styles.avatarContainer, { borderColor: ribbonColors[0] }]}>
              <Image source={{ uri: player.avatarUrl }} style={styles.avatar as ImageStyle} />
              {actualPosition === 1 && (
                <View style={styles.crownOverlay}>
                  <Icon name="vip-crown-line" size={24} color="#F59E0B" />
                </View>
              )}
            </View>

            <View style={[styles.ribbon, { height, backgroundColor: ribbonColors[0] }]}>
              <Text style={styles.score}>{player.score.toLocaleString()}</Text>
            </View>

            <Text style={styles.playerName}>{player.userName}</Text>
          </View>
        );
      })}
    </View>
  );
}
