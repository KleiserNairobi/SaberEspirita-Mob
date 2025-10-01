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
  correctIndex: number;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
  playSound: (isCorrect: boolean) => Promise<void>;
};

export function Question({
  question,
  success,
  correctIndex,
  alternativeSelected,
  setAlternativeSelected,
  playSound,
}: QuestionType) {
  const styles = useThemedStyles(getQuestionStyles);

  const handleSelect = async (index: number) => {
    if (alternativeSelected != null) return;
    const isCorrect = correctIndex === index;
    await playSound(isCorrect);
    setAlternativeSelected?.(index);
  };

  return (
    <View style={styles.container}>
      {question.alternatives.map((alternative, index) => (
        <ButtonQuiz
          key={index}
          title={alternative}
          checked={alternativeSelected === index}
          success={success}
          disabled={alternativeSelected != null}
          onPress={() => handleSelect(index)}
        />
      ))}
    </View>
  );
}
