import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {load, save, remove} from '@utils/Storage';
import lightTheme from '@themes/lightTheme';
import darkTheme from '@themes/darkTheme';
import {ThemeType} from '@models/Utils';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

type Theme = 'light' | 'dark';

interface AppState {
  theme: Theme;
  isSoundOn: boolean;
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  toggleTheme: () => void;
  toggleSound: () => void;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  finishLoading: () => void;
}

type PersistAppState = Omit<
  AppState,
  'toggleTheme' | 'toggleSound' | 'setUser' | 'finishLoading'
>;

// Configura o storage personalizado para o Zustand
const storage = {
  getItem: async (name: string) => {
    const value = load(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name: string, value: string) => {
    save(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    remove(name);
  },
};

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      theme: ThemeType.dark,
      isSoundOn: true,
      user: null,
      isLoading: true,
      toggleTheme: () => {
        set(state => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        }));
      },
      toggleSound: () => {
        set(state => ({
          isSoundOn: !state.isSoundOn,
        }));
      },
      setUser: user => {
        set({user});
      },
      finishLoading: () => {
        set({isLoading: false});
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => storage),
      partialize: state =>
        ({
          theme: state.theme,
          isSoundOn: state.isSoundOn,
          user: state.user,
        } as PersistAppState),
      onRehydrateStorage: () => () => {
        // Rehydrated state logic here if needed
      },
    },
  ),
);

export const useTheme = () => {
  const theme = useAppStore(state => state.theme);
  return theme === 'light' ? lightTheme : darkTheme;
};
