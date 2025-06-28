import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface IUserCreatedQuiz {
  userId: string;
  categoryId: string;
  question: string;
  correctAnswer: string;
  wrongAnswer1: string;
  wrongAnswer2: string;
  wrongAnswer3: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  isApproved?: boolean;
}
