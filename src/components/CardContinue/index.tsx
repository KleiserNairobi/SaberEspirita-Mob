import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { getCardContinueStyles } from './styles';
import { useTheme } from '@/hooks/useTheme';

export function CardContinue() {
  const theme = useTheme();
  const styles = useThemedStyles(getCardContinueStyles);

  return (
    <TouchableOpacity style={styles.container}>
      <CircularProgress
        value={50}
        radius={24}
        valueSuffix={'%'}
        activeStrokeWidth={5}
        activeStrokeColor={theme.colors.cardProgressPrimary}
        inActiveStrokeWidth={5}
        inActiveStrokeColor={theme.colors.cardProgressSecondary}
        inActiveStrokeOpacity={0.5}
        progressValueColor={theme.colors.cardSubtitle}
        progressValueFontSize={theme.fontSizes.xs}
        progressValueStyle={{ fontFamily: theme.fontFamily.semibold }}
      />
      <Text style={styles.title}>Nome do quiz</Text>
      <Text style={styles.subtitle}>10 questões</Text>
    </TouchableOpacity>
  );
}
