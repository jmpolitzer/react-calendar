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
  dayString: string;
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

interface EventInterface {
  start: Date;
  end: Date;
  description?: string;
}

interface CalendarComponentPropsInterface {
  events: EventInterface[];
}

interface NavigationComponentPropsInterface {
  previous: () => void;
  next: () => void;
  title: any;
}

interface DayComponentPropsInterface {
  day: DayInterface;
  changeView: (view: string) => void;
  isDayView?: boolean;
  goToNextDay?: () => void;
  goToPreviousDay?: () => void;
  isMilitary?: boolean;
  currentEvent?: string[];
  createEvent?: (e: MouseEvent) => void;
  events: EventInterface[];
}

interface WeekComponentPropsInterface {
  week: WeekInterface;
  changeView: (view: string, date?: Date) => void;
  goToNextWeek: () => void;
  goToPreviousWeek: () => void;
  events: EventInterface[];
}

interface MonthComponentPropsInterface {
  month: MonthInterface;
  changeView?: (view: string, date?: Date) => void;
  isMonthView?: boolean;
  goToPreviousMonth?: () => void;
  goToNextMonth?: () => void;
  events: EventInterface[];
}

interface YearComponentPropsInterface {
  year: YearInterface;
  changeView: (view: string) => void;
  goToNextYear: () => void;
  goToPreviousYear: () => void;
  events: EventInterface[];
}

interface CalendarEventComponentPropsInterface {
  currentEvent: string[];
  quarter: Date;
  year: string;
  dayOfWeek: string;
}

export {
  MonthInterface,
  MonthHeaderInterface,
  DayInterface,
  YearInterface,
  CalendarComponentPropsInterface,
  DayComponentPropsInterface,
  WeekComponentPropsInterface,
  MonthComponentPropsInterface,
  YearComponentPropsInterface,
  NavigationComponentPropsInterface,
  CalendarEventComponentPropsInterface
};
