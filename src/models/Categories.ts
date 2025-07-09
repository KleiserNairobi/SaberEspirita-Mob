import {ImageSourcePropType} from 'react-native';

export interface ICategory {
  id: string;
  title: string;
  description: string;
  subcategoryCount: number;
  quizCount: number;
  percentage: number;
  imageBackground?: ImageSourcePropType;
}
