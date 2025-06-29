import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { useTheme } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function GradientContainer({ children, style }: GradientContainerProps) {
  const theme = useTheme();

  return (
    <LinearGradient
      colors={[theme.colors.backGradientStart, theme.colors.backGradientEnd]}
      style={[{ flex: 1 }, style]}
      start={[0, 0]}
      end={[1, 1]}>
      {children}
    </LinearGradient>
  );
}
