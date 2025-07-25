import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getLeaderboardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6',
    },
    positionContainer: {
      width: 40,
      alignItems: 'center',
    },
    positionText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#6B7280',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginLeft: 16,
    },
    playerInfo: {
      flex: 1,
      marginLeft: 16,
    },
    playerName: {
      fontSize: 18,
      fontWeight: '600',
      color: '#1F2937',
    },
    playerLevel: {
      fontSize: 14,
      color: '#6B7280',
      marginTop: 2,
    },
    scoreContainer: {
      alignItems: 'flex-end',
    },
    score: {
      fontSize: 18,
      fontWeight: '700',
      color: '#7C3AED',
    },
  });
