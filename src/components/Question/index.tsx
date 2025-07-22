import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';
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
  const [correctSound, setCorrectSound] = useState<Audio.Sound | null>(null);
  const [wrongSound, setWrongSound] = useState<Audio.Sound | null>(null);

  // Carrega os sons quando o componente monta
  useEffect(() => {
    const loadSounds = async () => {
      const { sound: correct } = await Audio.Sound.createAsync(
        require('@/assets/sounds/correct.mp3')
      );
      const { sound: wrong } = await Audio.Sound.createAsync(require('@/assets/sounds/wrong.mp3'));
      setCorrectSound(correct);
      setWrongSound(wrong);
    };

    loadSounds();

    return () => {
      if (correctSound) {
        correctSound.unloadAsync();
      }
      if (wrongSound) {
        wrongSound.unloadAsync();
      }
    };
  }, []);

  const playSound = useCallback(
    async (isCorrect: boolean) => {
      if (!isSoundOn) return;
      const sound = isCorrect ? correctSound : wrongSound;
      if (!sound) return;
      try {
        await sound.stopAsync();
        await sound.setPositionAsync(0);
        await sound.playAsync();
      } catch (error) {
        console.error('Erro ao reproduzir som:', error);
      }
    },
    [isSoundOn, correctSound, wrongSound]
  );

  const handleSelect = async (index: number) => {
    if (alternativeSelected != null) return;
    const isCorrect = correctIndex === index;
    await playSound(isCorrect);
    setAlternativeSelected?.(index);
  };

  // const correctPlayer = useAudioPlayer(require('@/assets/sounds/correct.mp3'));
  // const wrongPlayer = useAudioPlayer(require('@/assets/sounds/wrong.mp3'));

  // const playSound = useCallback(
  //   async (isCorrect: boolean) => {
  //     if (!isSoundOn) return;
  //     const player = isCorrect ? correctPlayer : wrongPlayer;
  //     await player.seekTo(0);
  //     player.play();
  //   },
  //   [isSoundOn, correctPlayer, wrongPlayer]
  // );

  // const handleSelect = async (index: number) => {
  //   if (alternativeSelected != null) return;
  //   const isCorrect = correctIndex === index;
  //   await playSound(isCorrect);
  //   setAlternativeSelected?.(index);
  // };

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
