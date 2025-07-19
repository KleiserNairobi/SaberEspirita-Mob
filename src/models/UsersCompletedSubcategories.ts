export interface IUserCompletedSubcategory {
  userId: string;
  completedSubcategories: {
    [categoryId: string]: string[];
  };
  totalCompleted?: number;
}
