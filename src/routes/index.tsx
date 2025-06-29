import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { StackPrivate } from './stack-private';
import { StackPublic } from './stack-public';
import { ThemeType } from '@/models/Utils';
import { Loading } from '@/components/Loading';
import { useAppStore } from '@/stores/useAppStore';

export function Routes() {
  const { theme, user, setUser, isLoading, finishLoading } = useAppStore();
  const isDarkTheme = theme === ThemeType.dark;

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
      {user ? <StackPrivate /> : <StackPublic />}
    </NavigationContainer>
  );
}
