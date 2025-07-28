import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getLeaderboardPodiumStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 30,
      color: '#333',
    },
    podium: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      height: 300,
      marginBottom: 20,
    },
    podiumFirst: {
      flex: 1,
      alignItems: 'center',
      height: '100%',
      justifyContent: 'flex-end',
    },
    podiumSecond: {
      flex: 1,
      alignItems: 'center',
      height: '80%',
      justifyContent: 'flex-end',
    },
    podiumThird: {
      flex: 1,
      alignItems: 'center',
      height: '60%',
      justifyContent: 'flex-end',
    },
    avatarContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#e0e0e0',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      borderWidth: 3,
      borderColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    avatar: {
      width: 74,
      height: 74,
      borderRadius: 37,
    },
    avatarText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#555',
    },
    scoreBar: {
      width: '80%',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    firstPlaceBar: {
      height: 120,
      backgroundColor: '#FFD700', // Ouro
    },
    secondPlaceBar: {
      height: 90,
      backgroundColor: '#C0C0C0', // Prata
    },
    thirdPlaceBar: {
      height: 60,
      backgroundColor: '#CD7F32', // Bronze
    },
    scoreText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    positionText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
    namesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingHorizontal: 10,
    },
    nameText: {
      flex: 1,
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
      color: '#444',
      marginHorizontal: 5,
    },
    emptyText: {
      fontSize: 18,
      color: '#666',
      textAlign: 'center',
      marginTop: 20,
    },
  });
