import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {ThemeProvider} from 'styled-components/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Routes} from '@routes/index';
import {useTheme} from '@stores/useAppStore';

export function App() {
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   const initializeApp = async () => {
  //     // Simula carregamento de dados/recursos
  //     await Promise.all([
  //       // Coloque aqui suas operações assíncronas iniciais
  //       // Ex: carregar dados do AsyncStorage, configurações, etc.
  //       new Promise(resolve => setTimeout(resolve, 1500)), // Delay mínimo
  //     ]);
  //     SplashScreen.hide();
  //   };
  //   initializeApp();
  // }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
