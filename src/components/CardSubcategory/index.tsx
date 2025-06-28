import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import {useTheme} from 'styled-components/native';
import Icon from 'react-native-remix-icon';
import {
  Box,
  BoxIcon,
  BoxTitle,
  Container,
  QuizCount,
  Subtitle,
  Title,
} from './styles';
import {verticalScale} from 'react-native-size-matters';

type CardType = TouchableOpacityProps & {
  title: string;
  subtitle: string;
  quizCount: number;
  completed: boolean;
};

export function CardSubcategory({
  title,
  subtitle,
  quizCount,
  completed,
  ...rest
}: CardType) {
  const theme = useTheme();
  return (
    <Container completed={completed} {...rest}>
      <Box>
        <BoxTitle>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
          {quizCount && <QuizCount>{quizCount.toString()} questões</QuizCount>}
        </BoxTitle>
        <BoxIcon>
          {completed ? (
            <Icon
              name='checkbox-circle-line'
              color={theme.colors.primary}
              size={verticalScale(28)}
            />
          ) : (
            <Icon
              name='checkbox-blank-circle-line'
              color={theme.colors.optionNormalBorder}
              size={verticalScale(28)}
            />
          )}
        </BoxIcon>
      </Box>
    </Container>
  );
}
