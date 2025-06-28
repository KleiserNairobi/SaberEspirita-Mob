import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

type ContainerProps = TouchableOpacityProps & {
  completed: boolean;
};

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 100%;
  padding: ${scale(10)}px;
  margin-bottom: ${verticalScale(12)}px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.optionNormalBorder};
  background-color: ${({theme}) => theme.colors.optionNormalBackground};
`;

export const Box = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const BoxTitle = styled.View`
  width: 90%;
  justify-content: center;
`;

export const BoxIcon = styled.View`
  width: 10%;
  align-items: flex-end;
  justify-content: center;
`;

export const Title = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.cardSubcategoryTitle};
    font-size: ${RFValue(theme.fontSize.md)}px;
    font-family: ${theme.fontFamily.nunito.semiBold};
  `}
`;

export const Subtitle = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.cardSubcategorySubtitle};
    font-size: ${RFValue(theme.fontSize.sm)}px;
    font-family: ${theme.fontFamily.nunito.regular};
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
