import { Player } from '@/models/Player';

const generateMockPlayer = (
  id: string,
  name: string,
  score: number,
  position: number,
  avatar: string,
  level: number = Math.floor(Math.random() * 100) + 1
): Player => ({
  id,
  name,
  score,
  position,
  avatar,
  level,
});

// All Time Leaderboard
const allTimeData: Player[] = [
  generateMockPlayer(
    '1',
    'Antonia',
    598,
    1,
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    89
  ),
  generateMockPlayer(
    '2',
    'Mario',
    496,
    2,
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    76
  ),
  generateMockPlayer(
    '3',
    'Michael',
    480,
    3,
    'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    74
  ),
  generateMockPlayer(
    '4',
    'Antonia Mcdaniel',
    479,
    4,
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    73
  ),
  generateMockPlayer(
    '5',
    'Ginger Williamson',
    475,
    5,
    'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    72
  ),
  generateMockPlayer(
    '6',
    'James Rodriguez',
    445,
    6,
    'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    68
  ),
  generateMockPlayer(
    '7',
    'Sarah Mitchell',
    432,
    7,
    'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    65
  ),
  generateMockPlayer(
    '8',
    'David Chen',
    428,
    8,
    'https://images.pexels.com/photos/1239298/pexels-photo-1239298.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    64
  ),
  generateMockPlayer(
    '9',
    'Emily Johnson',
    415,
    9,
    'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    62
  ),
  generateMockPlayer(
    '10',
    'Alex Turner',
    398,
    10,
    'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    59
  ),
];

// This Week Leaderboard
const thisWeekData: Player[] = [
  generateMockPlayer(
    '1',
    'Michael',
    245,
    1,
    'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    74
  ),
  generateMockPlayer(
    '2',
    'Sarah Mitchell',
    238,
    2,
    'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    65
  ),
  generateMockPlayer(
    '3',
    'David Chen',
    225,
    3,
    'https://images.pexels.com/photos/1239298/pexels-photo-1239298.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    64
  ),
  generateMockPlayer(
    '4',
    'Antonia',
    220,
    4,
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    89
  ),
  generateMockPlayer(
    '5',
    'Emily Johnson',
    215,
    5,
    'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    62
  ),
  generateMockPlayer(
    '6',
    'Mario',
    198,
    6,
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    76
  ),
  generateMockPlayer(
    '7',
    'Alex Turner',
    185,
    7,
    'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    59
  ),
  generateMockPlayer(
    '8',
    'Ginger Williamson',
    175,
    8,
    'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    72
  ),
];

// This Month Leaderboard
const thisMonthData: Player[] = [
  generateMockPlayer(
    '1',
    'David Chen',
    378,
    1,
    'https://images.pexels.com/photos/1239298/pexels-photo-1239298.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    64
  ),
  generateMockPlayer(
    '2',
    'Antonia',
    365,
    2,
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    89
  ),
  generateMockPlayer(
    '3',
    'Emily Johnson',
    342,
    3,
    'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    62
  ),
  generateMockPlayer(
    '4',
    'Michael',
    335,
    4,
    'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    74
  ),
  generateMockPlayer(
    '5',
    'Sarah Mitchell',
    325,
    5,
    'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    65
  ),
  generateMockPlayer(
    '6',
    'Mario',
    315,
    6,
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    76
  ),
  generateMockPlayer(
    '7',
    'Alex Turner',
    298,
    7,
    'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    59
  ),
  generateMockPlayer(
    '8',
    'Ginger Williamson',
    285,
    8,
    'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    72
  ),
];

export const mockLeaderboardData = {
  allTime: allTimeData,
  thisWeek: thisWeekData,
  thisMonth: thisMonthData,
};
