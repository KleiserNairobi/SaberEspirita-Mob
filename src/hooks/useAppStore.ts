import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Audio } from 'expo-av';
import { load, save, remove } from '@/utils/Storage';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

type Theme = 'light' | 'dark';

interface AppState {
  theme: Theme;
  isSoundOn: boolean;
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  correctSound: Audio.Sound | null;
  wrongSound: Audio.Sound | null;
  soundsLoaded: boolean;

  toggleTheme: () => void;
  toggleSound: () => void;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  finishLoading: () => void;
  loadSounds: () => Promise<void>;
  unloadSounds: () => Promise<void>;
}

// Omitimos os sons da persistência, pois eles não são serializáveis
type PersistAppState = Omit<AppState, 'toggleTheme' | 'toggleSound' | 'setUser' | 'finishLoading'>;

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
    (set, get) => ({
      theme: 'dark',
      isSoundOn: true,
      user: null,
      isLoading: true,
      correctSound: null,
      wrongSound: null,
      soundsLoaded: false,

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      toggleSound: () =>
        set((state) => ({
          isSoundOn: !state.isSoundOn,
        })),

      setUser: (user) => set({ user }),

      finishLoading: () => set({ isLoading: false }),

      loadSounds: async () => {
        try {
          const { sound: correct } = await Audio.Sound.createAsync(
            require('@/assets/sounds/correct.mp3'),
            { shouldPlay: false }
          );
          const { sound: wrong } = await Audio.Sound.createAsync(
            require('@/assets/sounds/wrong.mp3'),
            { shouldPlay: false }
          );
          set({ correctSound: correct, wrongSound: wrong, soundsLoaded: true });
        } catch (error) {
          console.error('Erro ao carregar sons:', error);
          set({ soundsLoaded: false });
        }
      },

      unloadSounds: async () => {
        const { correctSound, wrongSound } = get();
        if (correctSound) {
          await correctSound.unloadAsync();
        }
        if (wrongSound) {
          await wrongSound.unloadAsync();
        }
        set({ correctSound: null, wrongSound: null, soundsLoaded: false });
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => storage),
      partialize: (state) =>
        ({
          theme: state.theme,
          isSoundOn: state.isSoundOn,
          user: state.user,
        }) as PersistAppState,
    }
  )
);
