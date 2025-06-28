import React from 'react';
import {
  Bar,
  Container,
  Progress,
  QuestionCurrent,
  QuestionTitle,
  QuestionTotal,
  QuestionBox,
  QuestionBoxTotal,
} from './styles';

type ProgressBarType = {
  current: number;
  total: number;
  title: string;
};

export function ProgressBar({current, total, title}: ProgressBarType) {
  return (
    <Container>
      <QuestionBox>
        <QuestionTitle>{title}</QuestionTitle>
        <QuestionBoxTotal>
          <QuestionCurrent>{current}</QuestionCurrent>
          <QuestionTotal>/</QuestionTotal>
          <QuestionTotal>{total}</QuestionTotal>
        </QuestionBoxTotal>
      </QuestionBox>
      <Bar>
        <Progress current={current - 1} total={total} />
      </Bar>
    </Container>
  );
}
