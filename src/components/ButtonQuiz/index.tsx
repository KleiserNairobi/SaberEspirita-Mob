import React, {useCallback, useEffect} from 'react';
import {TouchableOpacityProps} from 'react-native';
import Icon from 'react-native-remix-icon';
import SoundPlayer from 'react-native-sound-player';
import {useTheme} from 'styled-components/native';
import {verticalScale} from 'react-native-size-matters';
import {Box, BoxIcon, BoxTitle, Container, Title} from './styles';
import {useAppStore} from '@stores/useAppStore';

type CardType = TouchableOpacityProps & {
  title: string;
  checked: boolean;
  success: boolean;
  disabled: boolean;
};

export function ButtonQuiz({
  title,
  checked,
  success,
  disabled,
  ...rest
}: CardType) {
  const theme = useTheme();
  const {isSoundOn} = useAppStore();

  const playSound = useCallback(
    (sound: string) => {
      try {
        if (isSoundOn) {
          SoundPlayer.setVolume(7);
          SoundPlayer.playSoundFile(sound, 'mp3');
        }
      } catch {
        // ignorar
      }
    },
    [isSoundOn],
  );

  useEffect(() => {
    let onFinishedPlayingSubscription: any;
    onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      () => {},
    );
    return () => {
      onFinishedPlayingSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (checked) {
      const sound = success ? 'correct' : 'wrong';
      playSound(sound);
    }
  }, [checked, success, playSound]);

  return (
    <Container
      checked={checked}
      success={success}
      disabled={disabled}
      {...rest}>
      <Box>
        <BoxTitle>
          <Title checked={checked} success={success}>
            {title}
          </Title>
        </BoxTitle>
        <BoxIcon>
          {checked &&
            (success ? (
              <Icon
                name='checkbox-circle-line'
                color={theme.colors.optionSuccessBorder}
                size={verticalScale(16)}
              />
            ) : (
              <Icon
                name='close-circle-line'
                color={theme.colors.optionErrorBorder}
                size={verticalScale(16)}
              />
            ))}
        </BoxIcon>
      </Box>
    </Container>
  );
}
