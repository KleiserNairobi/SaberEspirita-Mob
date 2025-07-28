import { View, Text, Image, ImageStyle } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getLeaderboardPodiumStyles } from './styles';
import { ILeaderboardUser } from '@/models/UsersLeaderboard';

interface PodiumProps {
  players: ILeaderboardUser[];
}

export function LeaderboardPodium({ players }: PodiumProps) {
  const styles = useThemedStyles(getLeaderboardPodiumStyles);

  if (!players || players.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pódio</Text>
        <Text style={styles.emptyText}>Nenhum jogador disponível</Text>
      </View>
    );
  }

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  // Pega os primeiros colocados (pode ter menos de 3)
  const firstPlace = sortedPlayers[0];
  const secondPlace = sortedPlayers[1];
  const thirdPlace = sortedPlayers[2];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pódio</Text>

      <View style={styles.podium}>
        {/* Segundo lugar (esquerda) */}
        <View style={styles.podiumSecond}>
          <View style={styles.avatarContainer}>
            {secondPlace ? (
              secondPlace.avatarUrl ? (
                <Image
                  source={{ uri: secondPlace.avatarUrl }}
                  style={styles.avatar as ImageStyle}
                />
              ) : (
                <Text style={styles.avatarText}>
                  {secondPlace.userName.substring(0, 2).toUpperCase()}
                </Text>
              )
            ) : null}
          </View>
          <View style={[styles.scoreBar, styles.secondPlaceBar]}>
            <Text style={styles.scoreText}>{secondPlace.score}</Text>
          </View>
          <Text style={styles.positionText}>2º</Text>
        </View>

        {/* Primeiro lugar (centro) */}
        <View style={styles.podiumFirst}>
          <View style={styles.avatarContainer}>
            {firstPlace.avatarUrl ? (
              <Image source={{ uri: firstPlace.avatarUrl }} style={styles.avatar as ImageStyle} />
            ) : (
              <Text style={styles.avatarText}>
                {firstPlace.userName.substring(0, 2).toUpperCase()}
              </Text>
            )}
          </View>
          <View style={[styles.scoreBar, styles.firstPlaceBar]}>
            <Text style={styles.scoreText}>{firstPlace.score}</Text>
          </View>
          <Text style={styles.positionText}>1º</Text>
        </View>

        {/* Terceiro lugar (direita) */}
        <View style={styles.podiumThird}>
          <View style={styles.avatarContainer}>
            {thirdPlace ? (
              thirdPlace.avatarUrl ? (
                <Image source={{ uri: thirdPlace.avatarUrl }} style={styles.avatar as ImageStyle} />
              ) : (
                <Text style={styles.avatarText}>
                  {thirdPlace.userName.substring(0, 2).toUpperCase()}
                </Text>
              )
            ) : null}
          </View>
          <View style={[styles.scoreBar, styles.thirdPlaceBar]}>
            <Text style={styles.scoreText}>{thirdPlace.score}</Text>
          </View>
          <Text style={styles.positionText}>3º</Text>
        </View>
      </View>

      {/* Nomes dos jogadores abaixo do pódio */}
      <View style={styles.namesContainer}>
        {secondPlace && <Text style={styles.nameText}>{secondPlace.userName}</Text>}
        <Text style={styles.nameText}>{firstPlace.userName}</Text>
        {thirdPlace && <Text style={styles.nameText}>{thirdPlace.userName}</Text>}
      </View>
    </View>
  );
}
