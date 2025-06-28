import {IUserAnswer} from '@models/UserAnswer';

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      welcome: undefined;
      categories: undefined;
      subcategories: {
        idCategory: string;
        titleCategory: string;
        description: string;
      };
      quizes: {
        idCategory: string;
        idSubcategory: string;
        titleCategory: string;
        titleSubcategory: string;
      };
      finish: {
        titleCategory: string;
        titleSubcategory: string;
        points: number;
        totalQuestions: number;
        percentage: number;
        level: string;
        userAnswers: IUserAnswer[];
      };
      progress: undefined;
      menu: undefined;
      help: undefined;
      terms: undefined;
      privacy: undefined;
      register: undefined;
      login: undefined;
      create: undefined;
      answers: {
        titleCategory: string;
        titleSubcategory: string;
        points: number;
        totalQuestions: number;
        percentage: number;
        level: string;
        userAnswers: IUserAnswer[];
      };
    }
  }
}
