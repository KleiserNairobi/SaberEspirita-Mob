import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Linking, Platform, Text } from 'react-native';
import VersionCheck from 'react-native-version-check-expo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function useCheckUpdate() {
  useEffect(() => {
    VersionCheck.needUpdate({
      provider: Platform.OS === 'android' ? 'playStore' : 'appStore',
    })
      .then((res: { isNeeded: any; latestVersion: any; currentVersion: any; storeUrl: string }) => {
        if (res.isNeeded) {
          Alert.alert(
            'Atualização disponível',
            `Nova versão ${res.latestVersion} (Você: ${res.currentVersion})`,
            [
              {
                text: 'Atualizar',
                onPress: () => Linking.openURL(res.storeUrl),
              },
              {
                text: 'Agora não',
                style: 'cancel',
              },
            ],
            { cancelable: false }
          );
        }
      })
      .catch(console.warn);
  }, []);
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [firebaseError, setFirebaseError] = useState<Error | null>(null);

  const [fontsLoaded] = useFonts({
    Courgette_400Regular,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!__DEV__) {
    useCheckUpdate();
  }

  useEffect(() => {
    async function prepare() {
      try {
        if (fontsLoaded) {
          // Adicione aqui qualquer outra inicialização assíncrona
          await new Promise((resolve) => setTimeout(resolve, 500));
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
        <Text style={{ color: 'red', textAlign: 'center', padding: 20 }}>
          Ocorreu um erro ao iniciar o aplicativo:
          {'\n'}
          {firebaseError.message || 'Erro desconhecido.'}
          {'\n'}
          Por favor, tente novamente mais tarde.
        </Text>
      </GestureHandlerRootView>
    );
  }

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
