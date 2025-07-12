import { Dimensions, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { scale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

const cardsPerRow = 2;
const cardPadding = 24 * 2;
const cardMargin = 8 * 2;
const cardWidth = (Dimensions.get('window').width - cardPadding - cardMargin) / cardsPerRow;

export const getCardCategoryStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      height: scale(136),
      width: cardWidth,
      overflow: 'hidden',
      marginRight: scale(12),
      marginBottom: scale(12),
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.colors.cardProgressBorder,
      backgroundColor: theme.colors.cardProgressBackground,
    },
    backImage: {
      flex: 1,
      padding: scale(16),
    },
    imageDataColumn: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    columnTitle: {
      flexDirection: 'column',
    },
    title: {
      paddingTop: scale(8),
      color: theme.colors.cardTitle,
      fontSize: RFValue(theme.fontSizes.md),
      fontFamily: theme.fontFamily.semibold,
    },
    subtitle: {
      color: theme.colors.cardSubtitle,
      fontSize: RFValue(theme.fontSizes.xs),
      fontFamily: theme.fontFamily.regular,
    },
  });
