import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Categories } from '@/pages/Categories';
import { Subcategories } from '@/pages/Subcategories';
import { Quizes } from '@/pages/Quizes';
import { Finish } from '@/pages/Finish';
import { History } from '@/pages/History';
import { Menu } from '@/pages/Menu';
import { Help } from '@/pages/Help';
import { Terms } from '@/pages/Terms';
import { Privacy } from '@/pages/Privacy';
import { CreateQuiz } from '@/pages/Create';
import { Answers } from '@/pages/Answers';
import { Score } from '@/pages/Score';
import { IUserAnswer } from '@/models/UserAnswer';
// import { EmotionalChatScreen } from '@/pages/EmotionalChat';

export type PrivateStackParamList = {
  categories: undefined;
  subcategories: {
    idCategory: string;
    titleCategory: string;
    description: string;
  };
  quizes: {
    idCategory: string;
    idSubcategory: string;
    titleCategory: string;
    titleSubcategory: string;
  };
  finish: {
    titleCategory: string;
    titleSubcategory: string;
    points: number;
    totalQuestions: number;
    percentage: number;
    level: string;
    userAnswers: IUserAnswer[];
  };
  history: undefined;
  menu: undefined;
  help: undefined;
  terms: undefined;
  privacy: undefined;
  create: undefined;
  answers: {
    titleCategory: string;
    titleSubcategory: string;
    points: number;
    totalQuestions: number;
    percentage: number;
    level: string;
    userAnswers: IUserAnswer[];
  };
  score: undefined;
  // emotionalChat: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<PrivateStackParamList>();

export function PrivateStack() {
  return (
    <Navigator initialRouteName={'categories'} screenOptions={{ headerShown: false }}>
      <Screen name="categories" component={Categories} />
      <Screen name="subcategories" component={Subcategories} />
      <Screen name="quizes" component={Quizes} options={{ gestureEnabled: false }} />
      <Screen name="finish" component={Finish} options={{ gestureEnabled: false }} />
      <Screen name="history" component={History} />
      <Screen name="menu" component={Menu} />
      <Screen name="help" component={Help} />
      <Screen name="terms" component={Terms} />
      <Screen name="privacy" component={Privacy} />
      <Screen name="create" component={CreateQuiz} />
      <Screen name="answers" component={Answers} />
      <Screen name="score" component={Score} />
      {/* <Screen name="emotionalChat" component={EmotionalChatScreen} /> */}
    </Navigator>
  );
}
