import { useMemo } from 'react';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { AppTheme } from '@/themes';
import { lightTheme, darkTheme } from '@/themes';
import { useAppStore } from './useAppStore';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

// Versão sem props
export function useThemedStyles<T>(styles: (theme: AppTheme) => NamedStyles<T>): NamedStyles<T> {
  const theme = useAppStore((state) => (state.theme === 'light' ? lightTheme : darkTheme));
  return StyleSheet.create(styles(theme));
}

// Versão com props
export function useThemedStylesProps<T, P = undefined>(
  getStyles: (theme: AppTheme, props: P) => NamedStyles<T>,
  props: P
): NamedStyles<T> {
  const theme = useAppStore((state) => (state.theme === 'light' ? lightTheme : darkTheme));

  return useMemo(() => StyleSheet.create(getStyles(theme, props)), [theme, props]);
}
