import {TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {verticalScale} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  padding: ${verticalScale(10)}px;
  border-radius: 30px;
  align-items: center;
  border-width: 2px;
  ${({theme, disabled}) => css`
    border-color: ${disabled
      ? theme.colors.optionNormalBorder
      : theme.colors.buttonActionOutileneBorder};
    background-color: ${theme.colors.backGradientEnd};
  `}
`;

export const Title = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.buttonActionOutileneTitle};
    font-size: ${RFValue(theme.fontSize.xl)}px;
    font-family: ${theme.fontFamily.nunito.bold};
  `}
`;
