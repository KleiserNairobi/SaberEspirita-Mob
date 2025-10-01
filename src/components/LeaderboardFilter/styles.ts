import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

export const getLeaderboardFilterStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      width: '100%',
      padding: 4,
      marginVertical: theme.vSpacings.sm,
      borderRadius: 16,
      backgroundColor: theme.colors.bottonNavigationBack,
    },
    segmentsContainer: {
      flexDirection: 'row',
      zIndex: 1,
    },
    segment: {
      flex: 1,
      paddingVertical: theme.vSpacings.xs,
      alignItems: 'center',
      borderRadius: 12,
    },
    segmentText: {
      fontSize: theme.fontSizes.xs,
      fontFamily: theme.fontFamily.regular,
      color: theme.colors.bottonNavigationTitle,
    },
    selectedSegmentText: {
      color: theme.colors.titleBlack,
      fontFamily: theme.fontFamily.bold,
    },
    activeIndicator: {
      position: 'absolute',
      top: 4,
      left: 4,
      height: '100%',
      width: '33.33%',
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      zIndex: 0,
    },
  });
