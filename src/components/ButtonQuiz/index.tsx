import React, { useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Icon from 'react-native-remix-icon';
// import SoundPlayer from 'react-native-sound-player';
import { useTheme } from '../../hooks/useTheme';
import { scale } from 'react-native-size-matters';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { getButtonQuizStyles } from './styles';
import { useAppStore } from '@/hooks/useAppStore';

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

  // const playSound = useCallback(
  //   (sound: string) => {
  //     try {
  //       if (isSoundOn) {
  //         SoundPlayer.setVolume(7);
  //         SoundPlayer.playSoundFile(sound, 'mp3');
  //       }
  //     } catch {
  //       // ignorar
  //     }
  //   },
  //   [isSoundOn]
  // );

  useEffect(() => {
    // let onFinishedPlayingSubscription: any;
    // onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', () => {});
    // return () => {
    //   onFinishedPlayingSubscription.remove();
    // };
  }, []);

  // useEffect(() => {
  //   if (checked) {
  //     const sound = success ? 'correct' : 'wrong';
  //     playSound(sound);
  //   }
  // }, [checked, success, playSound]);

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
