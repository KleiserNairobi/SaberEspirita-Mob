export interface ITruthOrFalseStats {
  totalResponses: number;
  correctAnswers: number;
  currentStreak: number;
  longestStreak: number;
  totalTimeSpent: number;
  byDifficulty: {
    fácil: { total: number; correct: number };
    médio: { total: number; correct: number };
    difícil: { total: number; correct: number };
  };
}
