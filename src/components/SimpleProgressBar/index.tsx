import React from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getSimpleProgressBarStyles } from './styles';

type SimpleProgressBarType = {
  progress: number;
  color: string;
  backgroundColor: string;
};

export function SimpleProgressBar({ progress, color, backgroundColor }: SimpleProgressBarType) {
  const styles = useThemedStyles(getSimpleProgressBarStyles);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.progress, { width: `${progress}%`, backgroundColor: color }]} />
    </View>
  );
}
