import styled, {css} from 'styled-components/native';
import {verticalScale} from 'react-native-size-matters';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-left: 24px;
  margin-right: 24px;
`;

export const Title = styled.Text`
  margin-top: ${verticalScale(20)}px;
  ${({theme}) => css`
    color: ${theme.colors.titleBold};
    font-size: ${RFValue(theme.fontSize.xl3)}px;
    font-family: ${theme.fontFamily.nunito.bold};
  `}
`;

export const Subtitle = styled.Text`
  margin-top: ${verticalScale(8)}px;
  margin-bottom: ${verticalScale(20)}px;
  ${({theme}) => css`
    color: ${theme.colors.titleNormal};
    font-size: ${RFValue(theme.fontSize.sm)}px;
    font-family: ${theme.fontFamily.nunito.regular};
  `}
`;

export const ViewDropdown = styled.View`
  margin-bottom: ${verticalScale(15)}px;
  z-index: 1;
`;

export const ContainerModal = styled.View`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
`;
