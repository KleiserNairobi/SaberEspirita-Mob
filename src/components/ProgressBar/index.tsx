import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { getProgressBarStyles } from './styles';

type ProgressBarType = {
  current: number;
  total: number;
  title: string;
};

export function ProgressBar({ current, total, title }: ProgressBarType) {
  const styles = useThemedStyles(getProgressBarStyles);

  return (
    <View style={styles.container}>
      <View style={styles.questionBox}>
        <Text style={styles.questionTitle}>{title}</Text>
        <View style={styles.questionBoxTotal}>
          <Text style={styles.questionCurrent}>{current}</Text>
          <Text style={styles.questionTotal}>/</Text>
          <Text style={styles.questionTotal}>{total}</Text>
        </View>
      </View>
      <View style={styles.bar}>
        <View
          style={[styles.progress, { width: `${Math.round(((current - 1) / total) * 100)}%` }]}
        />
      </View>
    </View>
  );
}
