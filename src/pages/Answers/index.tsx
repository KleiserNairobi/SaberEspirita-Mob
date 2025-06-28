import React from 'react';
import {ScrollView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import {useTheme} from 'styled-components/native';
import {GradientContainer} from '@components/GradientContainer';
import {IUserAnswer} from '@models/UserAnswer';
import {Header} from '@components/Header';

import {
  Container,
  Title,
  Subtitle,
  QuestionBox,
  Explanation,
  ExplanationText,
  ExplanationTitle,
  AnswerBlock,
  CorrectAnswerText,
  Label,
  UserAnswerText,
  QuestionIndex,
  QuestionText,
  BoxRow,
  BoxColumnLeft,
  BoxColumnCenter,
  Percentage,
  TextPercentage,
  BoxStar,
  QuizCount,
  BoxRowHeader,
  TitleCorrect,
  TitleIncorrect,
  BoxTitleResult,
  BoxTitleCorrect,
  BoxTitleIncorrect,
} from './styles';
import {verticalScale} from 'react-native-size-matters';
import {ButtonAction} from '@components/ButtonAction';

type RouteParams = {
  titleCategory: string;
  titleSubcategory: string;
  points: number;
  totalQuestions: number;
  percentage: number;
  level: string;
  userAnswers: IUserAnswer[];
};

export function Answers() {
  const route = useRoute();
  const navigation = useNavigation();
  const theme = useTheme();

  const {
    titleCategory,
    titleSubcategory,
    //points,
    totalQuestions,
    percentage,
    level,
    userAnswers,
  } = route.params as RouteParams;

  let filledCount = 0;

  switch (level) {
    case 'Fraco':
      filledCount = 1;
      break;
    case 'Regular':
      filledCount = 2;
      break;
    case 'Bom':
      filledCount = 3;
      break;
    case 'Ótimo':
      filledCount = 4;
      break;
    default:
      filledCount = 1;
  }

  const renderStars = (filledCount: number) => {
    const stars = [];
    for (let i = 0; i < 4; i++) {
      const filled = i < filledCount;
      stars.push(
        <Icon
          key={i}
          size={verticalScale(16)}
          name='star-fill'
          color={filled ? theme.colors.accented : theme.colors.cardQuizBorder}
        />,
      );
    }
    return stars;
  };

  return (
    <GradientContainer>
      <Container>
        <Header
          title='Revisão das respostas'
          onPress={() => navigation.goBack()}
        />

        <BoxRowHeader>
          <BoxColumnLeft>
            <Title>{titleSubcategory}</Title>
            <Subtitle>{titleCategory}</Subtitle>
            <QuizCount>{`${totalQuestions} questões`}</QuizCount>
          </BoxColumnLeft>
          <BoxColumnCenter>
            <Percentage>{percentage}%</Percentage>
            <TextPercentage>de acertos</TextPercentage>
            <BoxStar>{renderStars(filledCount)}</BoxStar>
          </BoxColumnCenter>
        </BoxRowHeader>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 20, paddingBottom: 30}}>
          {userAnswers.map((answer, index) => {
            const isCorrect =
              answer.selectedAnswerIndex === answer.correctAnswerIndex;
            return (
              <QuestionBox key={index} isCorrect={isCorrect}>
                <BoxRow>
                  <QuestionIndex>Questão {index + 1}</QuestionIndex>
                  <BoxTitleResult>
                    {isCorrect ? (
                      <BoxTitleCorrect>
                        <Icon
                          name='checkbox-circle-line'
                          color={theme.colors.titleNormal}
                          size={verticalScale(16)}
                        />
                        <TitleCorrect>certo</TitleCorrect>
                      </BoxTitleCorrect>
                    ) : (
                      <BoxTitleIncorrect>
                        <Icon
                          name='close-circle-line'
                          color={theme.colors.titleNormal}
                          size={verticalScale(16)}
                        />
                        <TitleIncorrect>errado</TitleIncorrect>
                      </BoxTitleIncorrect>
                    )}
                  </BoxTitleResult>
                </BoxRow>

                <QuestionText>{answer.question}</QuestionText>

                <AnswerBlock>
                  <Label>Sua resposta:</Label>
                  <UserAnswerText isCorrect={isCorrect}>
                    {answer.selectedAnswerIndex != null
                      ? answer.alternatives[answer.selectedAnswerIndex]
                      : 'Pulou a questão'}
                  </UserAnswerText>

                  <Label>Resposta correta:</Label>
                  <CorrectAnswerText>
                    {answer.alternatives[answer.correctAnswerIndex]}
                  </CorrectAnswerText>
                </AnswerBlock>

                {answer.explanation && (
                  <Explanation>
                    <ExplanationTitle>Explicação doutrinária:</ExplanationTitle>
                    <ExplanationText>{answer.explanation}</ExplanationText>
                  </Explanation>
                )}
              </QuestionBox>
            );
          })}
          <ButtonAction
            title='Continuar'
            onPress={() => navigation.navigate('categories')}
            disabled={false}
          />
        </ScrollView>
      </Container>
    </GradientContainer>
  );
}
