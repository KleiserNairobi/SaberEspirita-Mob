export interface ILeaderboardUser {
  userId: string; // Identificador único do usuário
  userName: string; // Nome para exibição
  avatarUrl?: string; // URL da imagem de perfil (pode mudar para ImageSourcePropType se for imagem local)
  score: number; // Pontuação total
  position: number; // Posição no ranking
  level?: number; // Nível do usuário (opcional)
  country?: string; // País do usuário (opcional)
  isCurrentUser?: boolean; // (opcional) True se for o usuário logado — útil para destaque na UI
}

// export type TimeFilter = 'allTime' | 'thisWeek' | 'thisMonth';
