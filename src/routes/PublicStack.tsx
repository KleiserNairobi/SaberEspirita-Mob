import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';

export type PublicStackParamList = {
  login: undefined;
  register: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<PublicStackParamList>();

export function PublicStack() {
  return (
    <Navigator initialRouteName={'login'} screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="register" component={Register} />
    </Navigator>
  );
}
