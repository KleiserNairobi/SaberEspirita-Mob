import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from '@/services/firestore';
import { ILeaderboardUser } from '@/models/UsersLeaderboard';

export function useLeaderboardScores(timeFilter: 'week' | 'month' | 'all') {
  return useQuery<ILeaderboardUser[]>({
    queryKey: ['leaderboardScores', timeFilter],
    queryFn: () => getLeaderboard(timeFilter),
  });
}
