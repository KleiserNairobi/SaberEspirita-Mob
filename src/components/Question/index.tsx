import React from 'react';
import { View } from 'react-native';
import { ButtonQuiz } from '@/components/ButtonQuiz';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getQuestionStyles } from './styles';

type QuestionProps = {
  title: string;
  alternatives: string[];
};

type QuestionType = {
  question: QuestionProps;
  success: boolean;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
};

export function Question({
  question,
  success,
  alternativeSelected,
  setAlternativeSelected,
}: QuestionType) {
  const styles = useThemedStyles(getQuestionStyles);

  return (
    <View style={styles.container}>
      {question.alternatives.map((alternative, index) => (
        <ButtonQuiz
          key={index}
          title={alternative}
          checked={alternativeSelected === index}
          success={success}
          disabled={alternativeSelected != null}
          onPress={() => setAlternativeSelected && setAlternativeSelected(index)}
        />
      ))}
    </View>
  );
}
