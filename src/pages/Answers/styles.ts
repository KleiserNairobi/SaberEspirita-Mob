import styled, {css} from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {verticalScale} from 'react-native-size-matters';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-left: 24px;
  margin-right: 24px;
`;

export const Title = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.cardSubcategoryTitle};
    font-size: ${RFValue(theme.fontSize.sm)}px;
    font-family: ${theme.fontFamily.nunito.semiBold};
  `}
`;

export const Subtitle = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.cardSubcategorySubtitle};
    font-size: ${RFValue(theme.fontSize.sm)}px;
    font-family: ${theme.fontFamily.nunito.semiBold};
  `}
`;

export const QuizCount = styled.Text`
  padding-top: ${verticalScale(4)}px;
  ${({theme}) => css`
    color: ${theme.colors.cardSubcategoryQuizCount};
    font-size: ${RFValue(theme.fontSize.sm)}px;
    font-family: ${theme.fontFamily.nunito.regular};
  `}
`;

export const QuestionBox = styled.View<{isCorrect: boolean}>`
  ${({theme, isCorrect}) => css`
    margin-bottom: ${verticalScale(24)}px;
    padding: ${verticalScale(12)}px;
    border-radius: 8px;
    background-color: ${({theme}) => theme.colors.optionNormalBackground};
    border-left-width: 5px;
    border-left-color: ${isCorrect
      ? theme.colors.optionSuccessBorder
      : theme.colors.optionErrorBorder};
    border-width: 1px;
    border-top-color: ${({theme}) => theme.colors.optionNormalBorder};
    border-right-color: ${({theme}) => theme.colors.optionNormalBorder};
    border-bottom-color: ${({theme}) => theme.colors.optionNormalBorder};
  `}
`;

export const QuestionIndex = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.titleNormal};
    font-size: ${RFValue(theme.fontSize.sm)}px;
    font-family: ${theme.fontFamily.nunito.bold};
  `}
`;

export const QuestionText = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.titleNormal};
    font-size: ${RFValue(theme.fontSize.sm)}px;
    font-family: ${theme.fontFamily.nunito.regular};
    margin-bottom: ${verticalScale(8)}px;
    padding-bottom: ${verticalScale(8)}px;
    border-bottom-width: 1px;
    border-color: ${({theme}) => theme.colors.optionNormalBorder};
  `}
`;

export const Label = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.titleNormal};
    font-size: ${RFValue(theme.fontSize.sm)}px;
    font-family: ${theme.fontFamily.nunito.semiBold};
  `}
`;

export const AnswerBlock = styled.View`
  margin-bottom: ${verticalScale(2)}px;
`;

export const UserAnswerText = styled.Text<{isCorrect: boolean}>`
  ${({theme, isCorrect}) => css`
    /* color: ${isCorrect
      ? theme.colors.optionSuccessBorder
      : theme.colors.optionErrorBorder}; */
    color: ${theme.colors.titleNormal};
    font-size: ${RFValue(theme.fontSize.sm)}px;
    font-family: ${theme.fontFamily.nunito.regular};
    margin-bottom: ${verticalScale(4)}px;
  `}
`;

export const CorrectAnswerText = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.titleNormal};
    font-size: ${RFValue(theme.fontSize.sm)}px;
    font-family: ${theme.fontFamily.nunito.regular};
    margin-bottom: ${verticalScale(4)}px;
  `}
`;

export const Explanation = styled.View`
  margin-top: ${verticalScale(8)}px;
  border-top-width: 1px;
  border-color: ${({theme}) => theme.colors.optionNormalBorder};
`;

export const ExplanationTitle = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.titleNormal};
    font-size: ${RFValue(theme.fontSize.sm)}px;
    font-family: ${theme.fontFamily.nunito.medium};
    margin-top: ${verticalScale(6)}px;
  `}
`;

export const ExplanationText = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.titleNormal};
    font-size: ${RFValue(theme.fontSize.xs)}px;
    font-family: ${theme.fontFamily.nunito.regular};
  `}
`;

export const BoxRow = styled.View`
  margin-bottom: ${verticalScale(10)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BoxRowHeader = styled.View`
  margin-top: ${verticalScale(10)}px;
  margin-bottom: ${verticalScale(20)}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const BoxColumnLeft = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

export const BoxColumnCenter = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const QuizName = styled.Text`
  flex-flow: wrap;
  ${({theme}) => css`
    color: ${theme.colors.titleBold};
    font-size: ${RFValue(theme.fontSize.md)}px;
    font-family: ${theme.fontFamily.nunito.semiBold};
  `}
`;

export const Percentage = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.accented};
    font-size: ${RFValue(theme.fontSize.md)}px;
    font-family: ${theme.fontFamily.nunito.bold};
  `}
`;

export const TextPercentage = styled.Text`
  margin-top: ${verticalScale(2)}px;
  ${({theme}) => css`
    color: ${theme.colors.titleNormal};
    font-size: ${RFValue(theme.fontSize.sm)}px;
    font-family: ${theme.fontFamily.nunito.regular};
  `}
`;

export const BoxStar = styled.View`
  margin-top: ${verticalScale(2)}px;
  flex-direction: row;
`;

export const BoxTitleResult = styled.View`
  width: 80px;
`;

export const BoxTitleCorrect = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border-radius: 8px;
    background-color: ${theme.colors.optionSuccessBorder};
  `}
`;

export const BoxTitleIncorrect = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border-radius: 8px;
    background-color: ${theme.colors.optionErrorBorder};
  `}
`;

export const TitleCorrect = styled.Text`
  padding-left: 6px;
  ${({theme}) => css`
    color: ${theme.colors.titleNormal};
    font-size: ${RFValue(theme.fontSize.xs)}px;
    font-family: ${theme.fontFamily.nunito.semiBold};
  `}
`;

export const TitleIncorrect = styled.Text`
  padding-left: 6px;
  ${({theme}) => css`
    color: ${theme.colors.titleNormal};
    font-size: ${RFValue(theme.fontSize.xs)}px;
    font-family: ${theme.fontFamily.nunito.semiBold};
  `}
`;
