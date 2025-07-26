import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface IUserScore {
  userId: string;
  userName: string;
  totalAllTime: number;
  totalThisMonth: number;
  totalThisWeek: number;
  lastUpdated: FirebaseFirestoreTypes.Timestamp;
}
