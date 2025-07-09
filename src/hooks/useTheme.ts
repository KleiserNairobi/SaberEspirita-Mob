import { darkTheme, lightTheme } from '@/themes';
import { useAppStore } from './useAppStore';

export function useTheme() {
  const current = useAppStore((s) => s.theme);
  return current === 'light' ? lightTheme : darkTheme;
}
