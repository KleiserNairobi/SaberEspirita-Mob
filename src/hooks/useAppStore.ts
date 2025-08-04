import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { load, save, remove } from '@/utils/Storage';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  // AudioModule,
  createAudioPlayer,
  setAudioModeAsync,
  AudioPlayer,
  AudioSource,
} from 'expo-audio';

type Theme = 'light' | 'dark';

interface AppState {
  theme: Theme;
  isSoundOn: boolean;
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  soundsLoaded: boolean;
  correctPlayer: AudioPlayer | null;
  wrongPlayer: AudioPlayer | null;

  toggleTheme(): void;
  toggleSound(): void;
  setUser(user: FirebaseAuthTypes.User | null): void;
  finishLoading(): void;

  loadSounds(): Promise<void>;
  unloadSounds(): void;
  playCorrect(): void;
  playWrong(): void;
}

// Não serializamos os players no persist
type PersistAppState = Omit<
  AppState,
  | 'toggleTheme'
  | 'toggleSound'
  | 'setUser'
  | 'finishLoading'
  | 'playCorrect'
  | 'playWrong'
  | 'loadSounds'
  | 'unloadSounds'
>;

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

const correctSrc: AudioSource = require('@/assets/sounds/correct.mp3');
const wrongSrc: AudioSource = require('@/assets/sounds/wrong.mp3');

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      isSoundOn: true,
      user: null,
      isLoading: true,
      soundsLoaded: false,
      correctPlayer: null,
      wrongPlayer: null,

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      toggleSound: () => set((state) => ({ isSoundOn: !state.isSoundOn })),

      setUser: (user) => set({ user }),

      finishLoading: () => set({ isLoading: false }),

      // pre‑carrega os players
      loadSounds: async () => {
        try {
          // opcional: configura comportamento global de áudio
          await setAudioModeAsync({
            playsInSilentMode: true,
            interruptionModeAndroid: 'duckOthers',
          });

          const correct = createAudioPlayer(correctSrc);
          const wrong = createAudioPlayer(wrongSrc);

          set({
            correctPlayer: correct,
            wrongPlayer: wrong,
            soundsLoaded: true,
          });
        } catch (error) {
          console.error('Erro ao carregar sons com expo-audio:', error);
          set({ soundsLoaded: false });
        }
      },

      // libera os recursos
      unloadSounds: () => {
        const { correctPlayer, wrongPlayer } = get();
        try {
          correctPlayer?.remove();
        } catch {}
        try {
          wrongPlayer?.remove();
        } catch {}
        set({
          correctPlayer: null,
          wrongPlayer: null,
          soundsLoaded: false,
        });
      },

      // Funções para tocar efeitos
      playCorrect: () => {
        const { correctPlayer, isSoundOn } = get();
        if (isSoundOn && correctPlayer) {
          // expo-audio *não* reinicia posição automaticamente no fim
          correctPlayer.seekTo(0);
          correctPlayer.play();
        }
      },

      playWrong: () => {
        const { wrongPlayer, isSoundOn } = get();
        if (isSoundOn && wrongPlayer) {
          wrongPlayer.seekTo(0);
          wrongPlayer.play();
        }
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
