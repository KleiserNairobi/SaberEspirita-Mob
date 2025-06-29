import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Welcome } from '@/pages/Welcome';

const { Navigator, Screen } = createStackNavigator();

export function StackPublic() {
  return (
    <Navigator initialRouteName={'login'} screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="register" component={Register} />
      <Screen name="welcome" component={Welcome} />
    </Navigator>
  );
}
