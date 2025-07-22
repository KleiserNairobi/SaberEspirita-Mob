import { useCallback } from 'react';
import { View } from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import { ButtonQuiz } from '@/components/ButtonQuiz';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useAppStore } from '@/hooks/useAppStore';
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
};

export function Question({
  question,
  success,
  correctIndex,
  alternativeSelected,
  setAlternativeSelected,
}: QuestionType) {
  const styles = useThemedStyles(getQuestionStyles);
  const { isSoundOn } = useAppStore();

  const correctPlayer = useAudioPlayer(require('@/assets/sounds/correct.mp3'));
  const wrongPlayer = useAudioPlayer(require('@/assets/sounds/wrong.mp3'));

  const playSound = useCallback(
    async (isCorrect: boolean) => {
      if (!isSoundOn) return;
      const player = isCorrect ? correctPlayer : wrongPlayer;
      await player.seekTo(0);
      player.play();
    },
    [isSoundOn, correctPlayer, wrongPlayer]
  );

  const handleSelect = async (index: number) => {
    if (alternativeSelected != null) return;
    const isCorrect = correctIndex === index;
    await playSound(isCorrect); // <-- som baseado no clique real
    setAlternativeSelected?.(index); // <-- atualiza para que success funcione
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
          // onPress={() => setAlternativeSelected && setAlternativeSelected(index)}
        />
      ))}
    </View>
  );
}
