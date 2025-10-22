import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface IUserTruthOrFalseResponse {
  id: string; // formato: `${userId}_${dateString}`
  userId: string;
  date: string; // YYYY-MM-DD
  questionId: string; // ID da pergunta no seu JSON local
  userAnswer: boolean; // O que o usuário respondeu (true = Verdade, false = Mentira)
  isCorrect: boolean; // Se acertou ou errou
  timeSpent: number; // Tempo em segundos para responder
  respondedAt: FirebaseFirestoreTypes.Timestamp; // Timestamp exato da resposta
  savedToLibrary: boolean; // Se o usuário salvou para revisão posterior
}
