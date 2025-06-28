import {RFValue} from 'react-native-responsive-fontsize';
import {verticalScale} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

export const StyleLabel = styled.Text`
  margin-bottom: ${verticalScale(4)}px;
  ${({theme}) => css`
    color: ${theme.colors.titleNormal};
    font-size: ${RFValue(theme.fontSize.sm)}px;
    font-family: ${theme.fontFamily.nunito.semiBold};
  `};
`;

export const StyleError = styled.Text`
  margin-top: ${verticalScale(4)}px;
  ${({theme}) => css`
    color: ${theme.colors.optionErrorBorder};
    font-size: ${RFValue(theme.fontSize.xs)}px;
    font-family: ${theme.fontFamily.nunito.regular};
  `}
`;
