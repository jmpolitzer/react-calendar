interface MonthInterface {
  headers: any[];
  weeks: any[];
  month: any;
  year: string;
}

interface MonthHeaderInterface {
  single: string;
  short: string;
  medium: string;
  long: string;
}

interface DayInterface {
  dayOfWeek: number;
  date: Date;
}

interface YearInterface {
  year: number;
  quarters: any[]; // should be Month interface
}

interface MonthComponentPropsInterface {
  month: MonthInterface;
  changeView?: (view: string, date?: Date) => void;
  isFocused?: boolean;
  goToPreviousMonth?: () => void;
  goToNextMonth?: () => void;
}

interface YearComponentPropsInterface {
  year: YearInterface;
  changeView: (view: string) => void;
  goToNextYear: () => void;
  goToPreviousYear: () => void;
}

export {
  MonthInterface,
  MonthHeaderInterface,
  DayInterface,
  YearInterface,
  MonthComponentPropsInterface,
  YearComponentPropsInterface
};
