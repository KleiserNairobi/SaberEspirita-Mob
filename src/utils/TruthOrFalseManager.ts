import { load, save, remove } from '@/utils/Storage';
import { ITruthOrFalseStats } from '@/models/TruthOrFalseStats';
import { IUserTruthOrFalseResponse } from '@/models/UsersTruthOrFalseResponse';

const USER_RESPONSES = 'truthOrFalseResponses';
const CURRENT_STREAK = 'truthOrFalseCurrentStreak';
const LONGEST_STREAK = 'truthOrFalseLongestStreak';
const STATS = 'truthOrFalseStats';

/**
 * Obtém a data atual no formato string (YYYY-MM-DD)
 * @returns {string} Data atual no formato YYYY-MM-DD
 */
function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Obtém todas as respostas do usuário armazenadas
 * @returns {Object} Objeto com todas as respostas, indexadas por data
 */
function getAllResponses(): { [date: string]: IUserTruthOrFalseResponse } {
  return load<{ [date: string]: IUserTruthOrFalseResponse }>(USER_RESPONSES) || {};
}

/**
 * Retorna estatísticas padrão para inicialização
 * @returns {ITruthOrFalseStats} Estatísticas padrão com valores zerados
 */
function getDefaultStats(): ITruthOrFalseStats {
  return {
    totalResponses: 0,
    correctAnswers: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalTimeSpent: 0,
    byDifficulty: {
      fácil: { total: 0, correct: 0 },
      médio: { total: 0, correct: 0 },
      difícil: { total: 0, correct: 0 },
    },
  };
}

/**
 * Atualiza a sequência de respostas corretas (streak) do usuário
 * @param {ITruthOrFalseStats} stats - Estatísticas a serem atualizadas
 */
function updateStreak(stats: ITruthOrFalseStats): void {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  const responses = getAllResponses();

  if (responses[yesterdayStr]) {
    stats.currentStreak++;
  } else {
    stats.currentStreak = stats.currentStreak > 0 ? 1 : 1;
  }

  if (stats.currentStreak > stats.longestStreak) {
    stats.longestStreak = stats.currentStreak;
  }
}

/**
 * Atualiza as estatísticas gerais com base na resposta do usuário
 * @param {IUserTruthOrFalseResponse} response - Resposta do usuário para atualizar estatísticas
 */
function updateStats(response: IUserTruthOrFalseResponse): void {
  const stats = TruthOrFalseManager.getStats();
  stats.totalResponses++;
  if (response.isCorrect) stats.correctAnswers++;
  stats.totalTimeSpent += response.timeSpent;
  updateStreak(stats);
  save(STATS, stats);
}

export const TruthOrFalseManager = {
  /**
   * Verifica se o usuário já respondeu ao desafio de hoje
   * @returns {boolean} True se o usuário já respondeu hoje, false caso contrário
   */
  hasRespondedToday: function (): boolean {
    const today = getTodayString();
    const responses = getAllResponses();
    return !!responses[today];
  },

  /**
   * Obtém a resposta do usuário para o desafio de hoje
   * @returns {IUserTruthOrFalseResponse | null} Resposta de hoje ou null se não houver
   */
  getTodayResponse: function (): IUserTruthOrFalseResponse | null {
    const today = getTodayString();
    const responses = getAllResponses();
    return responses[today] || null;
  },

  /**
   * Salva a resposta do usuário para o desafio de hoje
   * @param {Omit<IUserTruthOrFalseResponse, 'date'>} response - Resposta do usuário (sem a data)
   * @returns {boolean} True se a resposta foi salva com sucesso, false caso contrário
   */
  saveResponse: function (response: Omit<IUserTruthOrFalseResponse, 'date'>): boolean {
    const today = getTodayString();
    const fullResponse: IUserTruthOrFalseResponse = {
      ...response,
      date: today,
    };
    const responses = getAllResponses();
    responses[today] = fullResponse;
    const saved = save(USER_RESPONSES, responses);
    if (saved) {
      updateStats(fullResponse);
    }
    return saved;
  },

  /**
   * Obtém todas as respostas do usuário
   * @returns {Object} Todas as respostas do usuário indexadas por data
   */
  getAllResponses: function (): { [date: string]: IUserTruthOrFalseResponse } {
    return getAllResponses();
  },

  /**
   * Obtém as estatísticas do usuário
   * @returns {ITruthOrFalseStats} Estatísticas do usuário ou estatísticas padrão se não houver
   */
  getStats: function (): ITruthOrFalseStats {
    const stats = load<ITruthOrFalseStats>(STATS);
    return stats || getDefaultStats();
  },

  /**
   * Obtém a sequência atual de respostas corretas (streak)
   * @returns {number} Número atual da sequência de respostas corretas
   */
  getCurrentStreak: function (): number {
    return this.getStats().currentStreak;
  },

  /**
   * Marca uma pergunta como salva na biblioteca do usuário
   * @param {string} questionId - ID da pergunta a ser marcada como salva
   * @returns {boolean} True se a pergunta foi marcada com sucesso, false caso contrário
   */
  markAsSaved: function (questionId: string): boolean {
    const responses = getAllResponses();
    for (const date in responses) {
      if (responses[date].questionId === questionId) {
        responses[date].savedToLibrary = true;
        return save(USER_RESPONSES, responses);
      }
    }
    return false;
  },

  /**
   * Remove todos os dados do usuário relacionados ao Verdadeiro ou Falso
   */
  clearAllData: function (): void {
    remove(USER_RESPONSES);
    remove(STATS);
  },
};
