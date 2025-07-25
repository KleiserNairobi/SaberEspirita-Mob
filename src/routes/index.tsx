import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useAppStore } from '@/hooks/useAppStore';
import { Loading } from '@/components/Loading';
import { ThemeType } from '@/models/Utils';
import { PrivateStack } from './PrivateStack';
import { PublicStack } from './PublicStack';

export function Routes() {
  const { theme, user, setUser, isLoading, finishLoading } = useAppStore();
  const isDarkTheme = theme === ThemeType.dark;

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((loggedUser: FirebaseAuthTypes.User | null) => {
      if (!user || (user && loggedUser && user.uid !== loggedUser.uid) || (!user && loggedUser)) {
        setUser(loggedUser);
      } else if (user && !loggedUser) {
        setUser(null);
      }
      finishLoading();
    });
    return unsubscribe;
  }, [setUser, finishLoading]);

  useEffect(() => {
    if (user) {
      finishLoading();
    }
    const unsubscribe = auth().onAuthStateChanged((loggedUser: FirebaseAuthTypes.User | null) => {
      if (
        (user && !loggedUser) ||
        (!user && loggedUser) ||
        (user && loggedUser && user.uid !== loggedUser.uid)
      ) {
        setUser(loggedUser);
      }
      finishLoading();
    });
    return unsubscribe;
  }, [user, setUser, finishLoading]);

  if (isLoading) {
    return <Loading background={false} />;
  }

  return (
    <NavigationContainer>
      <StatusBar
        translucent
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
      {user ? <PrivateStack /> : <PublicStack />}
    </NavigationContainer>
  );
}
