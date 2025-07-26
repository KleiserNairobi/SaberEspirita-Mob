import { useCallback, useEffect, useRef, useState } from 'react';
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
  const correctSoundRef = useRef<Audio.Sound | null>(null);
  const wrongSoundRef = useRef<Audio.Sound | null>(null);
  const [soundsLoaded, setSoundsLoaded] = useState(false);

  // Efeito para carregar os sons uma única vez
  useEffect(() => {
    const loadSounds = async () => {
      try {
        // Não tocar ao carregar
        const { sound: correct } = await Audio.Sound.createAsync(
          require('@/assets/sounds/correct.mp3'),
          { shouldPlay: false }
        );
        // Não tocar ao carregar
        const { sound: wrong } = await Audio.Sound.createAsync(
          require('@/assets/sounds/wrong.mp3'),
          { shouldPlay: false }
        );
        correctSoundRef.current = correct;
        wrongSoundRef.current = wrong;
        setSoundsLoaded(true);
      } catch (error) {
        console.error('Erro ao carregar sons:', error);
      }
    };

    loadSounds();

    // Função de limpeza para descarregar os sons
    return () => {
      if (correctSoundRef.current) {
        correctSoundRef.current.unloadAsync();
      }
      if (wrongSoundRef.current) {
        wrongSoundRef.current.unloadAsync();
      }
    };
  }, []); // Array de dependências vazio para rodar apenas uma vez

  const playSound = useCallback(
    async (isCorrect: boolean) => {
      if (!isSoundOn || !soundsLoaded) {
        return;
      }

      const sound = isCorrect ? correctSoundRef.current : wrongSoundRef.current;

      if (!sound) {
        console.warn(`Som para ${isCorrect ? 'correto' : 'errado'} não está carregado.`);
        return;
      }

      try {
        await sound.stopAsync();
        await sound.setPositionAsync(0);
        await sound.playAsync();
      } catch (error) {
        console.error('Erro ao reproduzir som:', error);
        // Opcional: tentar carregar novamente se o erro for devido a estado inválido
        // ou considerar um feedback visual para o usuário.
      }
    },
    [isSoundOn, soundsLoaded]
  );

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
          disabled={alternativeSelected != null || !soundsLoaded}
          onPress={() => handleSelect(index)}
        />
      ))}
    </View>
  );
}
