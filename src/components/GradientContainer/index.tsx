import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';

export function GradientContainer({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <LinearGradient
      colors={[theme.colors.backGradientStart, theme.colors.backGradientEnd]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      {children}
    </LinearGradient>
  );
}
