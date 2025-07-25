import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getScoreStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      marginLeft: 24,
      marginRight: 24,
    },

    activeNavItem: {
      borderBottomWidth: 3,
      borderBottomColor: 'white',
    },
    filtersContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    filterButton: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      marginRight: 10,
    },
    activeFilter: {
      borderBottomWidth: 2,
      borderBottomColor: 'white',
    },
    filterText: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 16,
    },
    activeFilterText: {
      color: 'white',
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
    },
    locationContainer: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    locationButtons: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    worldButton: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 10,
      marginRight: 10,
    },
    locationButton: {
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderRadius: 20,
      padding: 10,
    },
    locationText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    podiumContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    podiumItem: {
      alignItems: 'center',
      flex: 1,
    },
    firstPlaceContainer: {
      marginTop: -20,
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: 10,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 4,
    },
    firstPlace: {
      borderColor: '#FFD700',
    },
    secondPlace: {
      borderColor: '#C0C0C0',
    },
    thirdPlace: {
      borderColor: '#CD7F32',
    },
    positionBadge: {
      position: 'absolute',
      bottom: -5,
      right: -5,
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    firstBadge: {
      backgroundColor: '#FFD700',
    },
    secondBadge: {
      backgroundColor: '#C0C0C0',
    },
    thirdBadge: {
      backgroundColor: '#CD7F32',
    },
    positionText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
    },
    playerName: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    playerScore: {
      color: 'white',
      fontSize: 14,
      marginBottom: 2,
    },
    playerLevel: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: 12,
    },
    playersContainer: {
      backgroundColor: 'rgba(255,255,255,0.1)',
      marginHorizontal: 20,
      borderRadius: 10,
      padding: 10,
    },
    playerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    playerRank: {
      width: 30,
      alignItems: 'center',
    },
    rankNumber: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    playerAvatarContainer: {
      position: 'relative',
      marginHorizontal: 15,
    },
    playerAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    countryFlag: {
      position: 'absolute',
      bottom: -5,
      right: -5,
      fontSize: 16,
    },
    playerInfo: {
      flex: 1,
    },
    playerItemName: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    playerItemScore: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: 14,
    },
    playerLevelContainer: {
      alignItems: 'flex-end',
    },
    levelLabel: {
      color: 'rgba(255,255,255,0.6)',
      fontSize: 12,
    },
    levelNumber: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
