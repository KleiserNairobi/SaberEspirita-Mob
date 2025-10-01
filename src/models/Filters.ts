export enum TimeFilterEnum {
  ALL = 'all',
  WEEK = 'week',
  MONTH = 'month',
}

export const TimeFilterLabels = {
  [TimeFilterEnum.ALL]: 'Desde Sempre',
  [TimeFilterEnum.WEEK]: 'Esta Semana',
  [TimeFilterEnum.MONTH]: 'Este Mês',
};

export type TimeFilter = `${TimeFilterEnum}`;
