import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface IUserHistory {
  userId: string;
  categoryId: string;
  subcategoryId: string;
  quizId: string;
  title: string;
  subtitle: string;
  completed: boolean;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  level: string;
  completedAt: FirebaseFirestoreTypes.Timestamp;
}
