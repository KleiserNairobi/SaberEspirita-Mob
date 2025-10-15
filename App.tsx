import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from 'react';
import { Text, Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { initializeFirebaseApp } from './src/libs/firebase';
import * as SplashScreen from 'expo-splash-screen';
import { Routes } from './src/routes';
import { useFonts } from 'expo-font';
import { Courgette_400Regular } from '@expo-google-fonts/courgette';
import { useVersionControl } from './src/hooks/useVersionControl';
import { useUpdateModal } from './src/hooks/useUpdateModal';
import { Update } from './src/pages/Update';
import { OneSignal } from 'react-native-onesignal';

import {
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';

SplashScreen.preventAutoHideAsync();

const oneSignalAppId =
  Platform.OS === 'ios'
    ? '53fdc0bb-07b5-49c2-822e-963720610ebd'
    : '10a5e77f-2de1-43ed-8bdb-817d357df2d9';

OneSignal.initialize(oneSignalAppId);
OneSignal.Notifications.requestPermission(true);

const queryClient = new QueryClient();

function useCheckUpdate(appIsReady: boolean) {
  const { versionData, loading, error, checkVersion } = useVersionControl();
  const { modalVisible, modalConfig, showModal, hideModal } = useUpdateModal();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Só executa a verificação quando o app estiver pronto e ainda não tiver verificado
    if (appIsReady && !hasChecked && !loading && versionData) {
      const versionCheck = checkVersion();

      if (versionCheck.needUpdate) {
        showModal({
          critical: versionCheck.critical,
          maintenance: versionCheck.maintenance,
          message: versionCheck.message,
          updateUrl: versionCheck.updateUrl,
        });
      }

      setHasChecked(true);
    }
  }, [appIsReady, hasChecked, loading, versionData, checkVersion, showModal]);

  return {
    modalVisible,
    modalConfig,
    hideModal,
  };
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [firebaseError, setFirebaseError] = useState<Error | null>(null);

  const [fontsLoaded] = useFonts({
    Courgette_400Regular,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const { modalVisible, modalConfig, hideModal } = useCheckUpdate(appIsReady);

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
        <Update
          visible={modalVisible}
          critical={modalConfig.critical}
          maintenance={modalConfig.maintenance}
          message={modalConfig.message}
          updateUrl={modalConfig.updateUrl}
          onClose={hideModal}
        />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
