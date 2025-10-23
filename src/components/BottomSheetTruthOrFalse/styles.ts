import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { AppTheme } from '@/themes';

export const getBottomSheetMessageStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginVertical: theme.vSpacings.xs,
      marginHorizontal: theme.hSpacings.xs,
      flexDirection: 'column',
    },
    row: {
      flexDirection: 'row',
      paddingHorizontal: theme.hSpacings.xs,
      gap: 8,
    },
    column: { flexDirection: 'column' },
    title: {
      color: theme.colors.titleBold,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.semibold,
    },
    topic: {
      color: theme.colors.cardSubcategorySubtitle,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.medium,
    },
    question: {
      marginTop: theme.vSpacings.sm,
      paddingHorizontal: theme.hSpacings.xs,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    boxButton: {
      marginTop: theme.vSpacings.lg,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    button: {
      width: scale(120),
      padding: scale(6),
      borderRadius: 18,
      alignItems: 'center',
      marginLeft: 10,
      borderWidth: 2,
      borderColor: theme.colors.firstPlace,
    },
    titleButton: {
      color: theme.colors.firstPlace,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.semibold,
    },
    explanation: {
      marginTop: theme.vSpacings.xs,
      paddingHorizontal: theme.hSpacings.xs,
      color: theme.colors.cardSubcategorySubtitle,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    answerSummary: {
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    response: {
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.medium,
    },
    boxReference: {
      flexDirection: 'row',
      marginTop: theme.vSpacings.sm,
      alignItems: 'center',
      paddingHorizontal: theme.hSpacings.xs,
    },
    reference: {
      marginTop: theme.vSpacings.xs,
      paddingHorizontal: theme.hSpacings.xs,
      color: theme.colors.cardSubcategorySubtitle,
      fontSize: theme.fontSizes.xs,
      fontFamily: theme.fontFamily.regularItalic,
    },
    boxDifficulty: {
      marginTop: 4,
      paddingHorizontal: theme.hSpacings.xs,
    },
    separator: {
      height: 1,
      backgroundColor: theme.colors.cardSubcategorySubtitle,
      marginBottom: 4,
    },
    difficulty: {
      color: theme.colors.cardSubcategorySubtitle,
      fontSize: theme.fontSizes.xs,
      fontFamily: theme.fontFamily.regular,
    },
    btnDifficulty: {
      width: scale(120),
      padding: scale(6),
      borderRadius: 18,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.toggleBorderActive,
    },
    txtDifficulty: {
      color: theme.colors.toggleBorderActive,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.medium,
    },
  });
