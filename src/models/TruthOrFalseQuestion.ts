export interface ITruthOrFalseQuestion {
  id: string;
  topic: string;
  question: string;
  correct: boolean;
  explanation: string;
  reference: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
}
