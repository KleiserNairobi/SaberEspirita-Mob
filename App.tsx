import 'react-native-gesture-handler';
// import './src/libs/unistyles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
// import { initializeFirebaseApp } from './src/libs/firebase';
import * as SplashScreen from 'expo-splash-screen';
import { Routes } from './src/routes';
import { useFonts } from 'expo-font';
import { Courgette_400Regular } from '@expo-google-fonts/courgette';

import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';

// import { ThemeProvider } from 'styled-components/native';
// import { useTheme } from '@/hooks/useAppStore';

SplashScreen.preventAutoHideAsync();

export default function App() {
  // const theme = useTheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [firebaseError, setFirebaseError] = useState<Error | null>(null);

  const [fontsLoaded] = useFonts({
    Courgette_400Regular,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // await initializeFirebaseApp();

        if (fontsLoaded) {
          // Adicione aqui qualquer outra inicialização assíncrona
          await new Promise((resolve) => setTimeout(resolve, 500)); // Opcional
          setAppIsReady(true);
        }
      } catch (e: any) {
        console.error(e);
        setFirebaseError(e);
      }
    }
    prepare();
  }, [fontsLoaded]); // Executa quando fontsLoaded muda

  // Callback para esconder a splash screen quando o app estiver pronto
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // Se houver um erro no Firebase, exiba uma mensagem de erro
  if (firebaseError) {
    return (
      <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <ThemeProvider theme={theme}> */}
        <Text style={{ color: 'red', textAlign: 'center', padding: 20 }}>
          Ocorreu um erro ao iniciar o aplicativo:
          {'\n'}
          {firebaseError.message || 'Erro desconhecido.'}
          {'\n'}
          Por favor, tente novamente mais tarde.
        </Text>
        {/* </ThemeProvider> */}
      </GestureHandlerRootView>
    );
  }

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {/* <ThemeProvider theme={theme}> */}
      <Routes />
      {/* </ThemeProvider> */}
    </GestureHandlerRootView>
  );
}
