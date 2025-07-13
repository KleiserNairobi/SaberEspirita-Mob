import { Dimensions, StyleSheet } from 'react-native';
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
      marginRight: theme.hSpacings.xs,
      marginBottom: theme.vSpacings.xs,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.colors.cardProgressBorder,
      backgroundColor: theme.colors.cardProgressBackground,
    },
    backImage: {
      flex: 1,
      paddingVertical: theme.vSpacings.sm,
      paddingHorizontal: theme.hSpacings.sm,
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
      paddingTop: theme.vSpacings.xs,
      color: theme.colors.cardTitle,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.semibold,
    },
    subtitle: {
      color: theme.colors.cardSubtitle,
      fontSize: theme.fontSizes.xs,
      fontFamily: theme.fontFamily.regular,
    },
  });
