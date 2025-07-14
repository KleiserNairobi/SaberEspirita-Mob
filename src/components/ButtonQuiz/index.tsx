import { useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Icon from 'react-native-remix-icon';
import { useTheme } from '../../hooks/useTheme';
import { scale } from 'react-native-size-matters';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { getButtonQuizStyles } from './styles';
import { useAppStore } from '@/hooks/useAppStore';
import { useAudioPlayer } from 'expo-audio';

type CardType = TouchableOpacityProps & {
  title: string;
  checked: boolean;
  success: boolean;
  disabled: boolean;
};

export function ButtonQuiz({ title, checked, success, disabled, ...rest }: CardType) {
  const theme = useTheme();
  const styles = useThemedStyles(getButtonQuizStyles);
  const { isSoundOn } = useAppStore();

  const containerStyle = [
    styles.container,
    checked && success && styles.containerCheckedSuccess,
    checked && !success && styles.containerCheckedError,
  ];

  const correctPlayer = useAudioPlayer(require('@/assets/sounds/correct.mp3'));
  const wrongPlayer = useAudioPlayer(require('@/assets/sounds/wrong.mp3'));

  const playSound = useCallback(
    (sound: 'correct' | 'wrong') => {
      try {
        console.log('Tocar som', isSoundOn);
        if (!isSoundOn) return;

        // Rebubina o som para o início
        correctPlayer.seekTo(0);
        wrongPlayer.seekTo(0);

        if (sound === 'correct') {
          correctPlayer.play();
        } else {
          wrongPlayer.play();
        }
      } catch (error) {
        console.log('Erro ao tocar som:', error);
      }
    },
    [isSoundOn, correctPlayer, wrongPlayer]
  );

  useEffect(() => {
    if (checked) {
      const sound = success ? 'correct' : 'wrong';
      playSound(sound);
    }
  }, [checked, success, playSound]);

  return (
    <TouchableOpacity style={containerStyle} disabled={disabled} {...rest}>
      <View style={styles.box}>
        <View style={styles.boxTitle}>
          <Text style={[styles.title, checked && styles.titleChecked]}>{title}</Text>
        </View>
        <View style={styles.boxIcon}>
          {checked &&
            (success ? (
              <Icon
                name="checkbox-circle-line"
                color={theme.colors.optionSuccessBorder}
                size={scale(16)}
              />
            ) : (
              <Icon
                name="close-circle-line"
                color={theme.colors.optionErrorBorder}
                size={scale(16)}
              />
            ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}
