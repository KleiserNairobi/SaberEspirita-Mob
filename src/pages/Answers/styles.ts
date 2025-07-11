import { StyleSheet } from 'react-native';
import { AppTheme } from '@/themes';

type AnswersParams = {
  isCorrect: boolean;
};

export const getAnswersStyles = (theme: AppTheme, { isCorrect }: AnswersParams) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 24,
      marginRight: 24,
    },
    title: {
      color: theme.colors.cardSubcategoryTitle,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.semibold,
    },
    subtitle: {
      color: theme.colors.cardSubcategorySubtitle,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.semibold,
    },
    quizCount: {
      paddingTop: 4,
      color: theme.colors.cardSubcategoryQuizCount,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    questionBox: {
      marginBottom: 24,
      padding: 12,
      borderRadius: 8,
      backgroundColor: theme.colors.optionNormalBackground,
      borderLeftWidth: 5,
      borderLeftColor: isCorrect
        ? theme.colors.optionSuccessBorder
        : theme.colors.optionErrorBorder,
      borderWidth: 1,
      borderTopColor: theme.colors.optionNormalBorder,
      borderRightColor: theme.colors.optionNormalBorder,
      borderBottomColor: theme.colors.optionNormalBorder,
    },
    questionIndex: {
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.bold,
    },
    questionText: {
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
      marginBottom: 8,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderColor: theme.colors.optionNormalBorder,
    },
    label: {
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.semibold,
    },
    answerBlock: {
      marginBottom: 2,
    },
    userAnswerText: {
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
      marginBottom: 4,
    },
    correctAnswerText: {
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
      marginBottom: 4,
    },
    explanation: {
      marginTop: 8,
      borderTopWidth: 1,
      borderColor: theme.colors.optionNormalBorder,
    },
    explanationTitle: {
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.medium,
      marginTop: 6,
    },
    explanationText: {
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.xs,
      fontFamily: theme.fontFamily.regular,
    },
    boxRow: {
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    boxRowHeader: {
      marginTop: 10,
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    boxColumnLeft: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    boxColumnCenter: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    percentage: {
      color: theme.colors.accented,
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fontFamily.bold,
    },
    textPercentage: {
      marginTop: 2,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.sm,
      fontFamily: theme.fontFamily.regular,
    },
    boxStar: {
      marginTop: 2,
      flexDirection: 'row',
    },
    boxTitleResult: {
      width: 80,
    },
    boxTitleCorrect: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
      borderRadius: 8,
      backgroundColor: theme.colors.optionSuccessBorder,
    },
    boxTitleIncorrect: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
      borderRadius: 8,
      backgroundColor: theme.colors.optionErrorBorder,
    },
    titleCorrect: {
      paddingLeft: 6,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.xs,
      fontFamily: theme.fontFamily.semibold,
    },
    titleIncorrect: {
      paddingLeft: 6,
      color: theme.colors.titleNormal,
      fontSize: theme.fontSizes.xs,
      fontFamily: theme.fontFamily.semibold,
    },
  });
