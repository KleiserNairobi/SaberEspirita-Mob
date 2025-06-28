export interface IUserAnswer {
  question: string;
  alternatives: string[];
  correctAnswerIndex: number;
  selectedAnswerIndex: number | null;
  explanation?: string;
}
