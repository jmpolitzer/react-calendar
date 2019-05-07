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
  dayOfWeek: string;
  month: string;
  year: string;
  date: Date;
  day: any[]; // array of arrays of dates
}

interface WeekInterface {
  week: DayInterface[];
  headers: MonthHeaderInterface;
}

interface YearInterface {
  year: number;
  quarters: any[]; // should be Month interface
}

interface DayComponentPropsInterface {
  day: DayInterface;
  changeView: (view: string) => void;
  isDayView?: boolean;
  goToNextDay?: () => void;
  goToPreviousDay?: () => void;
  isMilitary?: boolean;
}

interface WeekComponentPropsInterface {
  week: WeekInterface;
  changeView: (view: string) => void;
  goToNextWeek: () => void;
  goToPreviousWeek: () => void;
}

interface MonthComponentPropsInterface {
  month: MonthInterface;
  changeView?: (view: string, date?: Date) => void;
  isMonthView?: boolean;
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
  DayComponentPropsInterface,
  WeekComponentPropsInterface,
  MonthComponentPropsInterface,
  YearComponentPropsInterface
};
