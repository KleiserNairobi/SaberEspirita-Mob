import {RFValue} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-left: 24px;
  margin-right: 24px;
  align-items: center;
  justify-content: center;
`;

export const StarsAndBooks = styled.Image.attrs({
  resizeMode: 'stretch',
})`
  width: 100%;
  height: 24%;
`;

export const Subcategory = styled.Text`
  margin-top: ${verticalScale(32)}px;
  text-align: center;
  ${({theme}) => css`
    color: ${theme.colors.titleBold};
    font-size: ${RFValue(theme.fontSize.lg)}px;
    font-family: ${theme.fontFamily.nunito.semiBold};
  `}
`;

export const Category = styled.Text`
  text-align: center;
  ${({theme}) => css`
    color: ${theme.colors.titleNormal};
    font-size: ${RFValue(theme.fontSize.md)}px;
    font-family: ${theme.fontFamily.nunito.medium};
  `}
`;

export const BoxRow = styled.View`
  width: 100%;
  margin-top: ${verticalScale(16)}px;
  flex-direction: row;
  justify-content: space-around;
`;

export const BoxColumn = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const Points = styled.Text`
  text-align: center;
  ${({theme}) => css`
    color: ${theme.colors.cardProgressPrimary};
    font-size: ${RFValue(theme.fontSize.xl3)}px;
    font-family: ${theme.fontFamily.nunito.bold};
  `}
`;

export const TitlePoints = styled.Text`
  text-align: center;
  ${({theme}) => css`
    color: ${theme.colors.titleBold};
    font-size: ${RFValue(theme.fontSize.sm)}px;
    font-family: ${theme.fontFamily.nunito.medium};
  `}
`;

export const Title = styled.Text`
  margin-top: ${verticalScale(32)}px;
  margin-bottom: ${verticalScale(8)}px;
  text-align: center;
  ${({theme}) => css`
    color: ${theme.colors.titleBold};
    font-size: ${RFValue(theme.fontSize.lg)}px;
    font-family: ${theme.fontFamily.nunito.semiBold};
  `}
`;

export const Message = styled.Text`
  margin-bottom: ${verticalScale(50)}px;
  text-align: center;
  ${({theme}) => css`
    color: ${theme.colors.titleBold};
    font-size: ${RFValue(theme.fontSize.sm)}px;
    font-family: ${theme.fontFamily.nunito.regular};
  `}
`;

export const BoxButton = styled.View`
  margin-top: ${verticalScale(20)}px;
  justify-content: center;
  flex-direction: row;
`;

export const ButtonSecondary = styled.TouchableOpacity`
  width: ${scale(100)}px;
  padding: ${verticalScale(8)}px;
  border-width: 2px;
  border-radius: 18px;
  align-items: center;
  ${({theme}) => css`
    border-color: ${theme.colors.buttonActionOutileneBorder};
  `}
`;

export const ButtonPrimary = styled.TouchableOpacity`
  width: ${scale(100)}px;
  padding: ${verticalScale(8)}px;
  border-radius: 18px;
  align-items: center;
  margin-left: 10px;
  ${({theme}) => css`
    background-color: ${theme.colors.primary};
  `}
`;

export const TitleButtonPrimary = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.titleBlack};
    font-size: ${RFValue(theme.fontSize.md)}px;
    font-family: ${theme.fontFamily.nunito.semiBold};
  `}
`;

export const TitleButtonSecondary = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.titleBold};
    font-size: ${RFValue(theme.fontSize.md)}px;
    font-family: ${theme.fontFamily.nunito.semiBold};
  `}
`;
