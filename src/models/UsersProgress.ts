import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface IUserProgress {
  userId: string; // Identificador único do usuário
  categoryId: string; // Identificador da categoria
  subcategoryId: string; // Identificador da subcategoria
  quizId: string; // Identificador do quiz
  title: string; // Título da subcategoria
  subtitle: string; // Subtítulo da subcategoria
  completed: boolean; // Indica se a subcategoria foi respondida
  score: number; // Pontuação obtida na subcategoria
  totalQuestions: number; // Total de questões na subcategoria
  correctAnswers: number; // Número de respostas corretas
  percentage: number; // Percentual de acertos
  level: string; // Nível do usuário (ex: Iniciante, Intermediário, Avançado)
  completedAt: FirebaseFirestoreTypes.Timestamp; // Data e hora em que o quiz foi respondido
}
