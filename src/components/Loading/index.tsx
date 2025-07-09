import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getLoadingStyles } from './styles';

type Props = {
  background?: boolean;
};

export function Loading({ background = true }: Props) {
  const styles = useThemedStyles(getLoadingStyles);
  const theme = useTheme();
  return (
    <View style={[styles.container, background && styles.containerWithBackground]}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </View>
  );
}
