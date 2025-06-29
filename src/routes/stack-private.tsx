import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Categories } from '@/pages/Categories';
import { Subcategories } from '@/pages/Subcategories';
import { Quizes } from '@/pages/Quizes';
import { Finish } from '@/pages/Finish';
import { Progress } from '@/pages/Progress';
import { Menu } from '@/pages/Menu';
import { Help } from '@/pages/Help';
import { Terms } from '@/pages/Terms';
import { Privacy } from '@/pages/Privacy';
import { CreateQuiz } from '@/pages/Create';
import { Answers } from '@/pages/Answers';

const { Navigator, Screen } = createStackNavigator();

export function StackPrivate() {
  return (
    <Navigator initialRouteName={'categories'} screenOptions={{ headerShown: false }}>
      <Screen name="categories" component={Categories} />
      <Screen name="subcategories" component={Subcategories} />
      <Screen name="quizes" component={Quizes} options={{ gestureEnabled: false }} />
      <Screen name="finish" component={Finish} options={{ gestureEnabled: false }} />
      <Screen name="progress" component={Progress} />
      <Screen name="menu" component={Menu} />
      <Screen name="help" component={Help} />
      <Screen name="terms" component={Terms} />
      <Screen name="privacy" component={Privacy} />
      <Screen name="create" component={CreateQuiz} />
      <Screen name="answers" component={Answers} />
    </Navigator>
  );
}
