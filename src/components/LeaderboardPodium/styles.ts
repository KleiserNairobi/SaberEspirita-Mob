import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getLeaderboardPodiumStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      paddingHorizontal: 24,
      marginTop: 20,
    },
    playerContainer: {
      alignItems: 'center',
      flex: 1,
    },
    positionBadge: {
      position: 'relative',
      marginBottom: 10,
    },
    positionText: {
      fontSize: 24,
      fontWeight: '700',
    },
    crownContainer: {
      position: 'absolute',
      top: -15,
      left: '50%',
      marginLeft: -10,
    },
    avatarContainer: {
      position: 'relative',
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 4,
      padding: 4,
      backgroundColor: 'white',
    },
    avatar: {
      width: '100%',
      height: '100%',
      borderRadius: 36,
    },
    crownOverlay: {
      position: 'absolute',
      top: -8,
      left: '50%',
      marginLeft: -12,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 2,
    },
    ribbon: {
      width: 80,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,
      position: 'relative',
    },
    score: {
      color: 'white',
      fontSize: 18,
      fontWeight: '700',
    },
    playerName: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
      marginTop: 12,
      textAlign: 'center',
    },
  });
