import { useState } from "react";
import {
  addMonths,
  addYears,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subMonths,
  subYears
} from "date-fns";

function useCalendar(startWeekOn?: any) {
  const [activeDate, setActiveDate] = useState(new Date());

  const setDate = (date?: Date) => {
    setActiveDate(date);
  };

  const fillInWeeks = (month: any[]) => {
    const firstDay = month[0];
    const lastDay = month[month.length - 1];
    const weekStart = startOfWeek(firstDay, { weekStartsOn: startWeekOn || 0 });
    const weekEnd = endOfWeek(lastDay);
    const frontFillIn = eachDayOfInterval({ start: weekStart, end: firstDay });
    const backFillIn = eachDayOfInterval({ start: lastDay, end: weekEnd });
    const lastMonthDays = frontFillIn.slice(0, frontFillIn.length - 1);
    const nextMonthDays = backFillIn.slice(1, backFillIn.length);

    return [...lastMonthDays, ...month, ...nextMonthDays];
  };

  const getDayHeaders = (month: any[]) => {
    return month.reduce((acc, m) => {
      acc.push({
        single: format(m.date, "EEEEE"),
        short: format(m.date, "EEEEEE"),
        medium: format(m.date, "E"),
        long: format(m.date, "EEEE")
      });

      return acc;
    }, []);
  };

  const getMonth = (providedDate?: Date) => {
    const dateToUse = providedDate || activeDate;
    const year = format(dateToUse, "yyyy");
    const month = {
      index: dateToUse.getMonth(),
      stringName: format(dateToUse, "MMMM")
    };
    const start = startOfMonth(dateToUse);
    const end = endOfMonth(dateToUse);
    const days = fillInWeeks(eachDayOfInterval({ start, end }));
    const formattedMonth = days.reduce((acc: any[], day: Date, i: number) => {
      const chunk = Math.floor(i / 7);

      if (!acc[chunk]) {
        acc[chunk] = [];
      }

      acc[chunk].push({ dayOfWeek: format(day, "d"), date: day });

      return acc;
    }, []);

    const headers = getDayHeaders(formattedMonth[0]);

    return { headers, year, month, weeks: formattedMonth };
  };

  const goToNextMonth = () => {
    setActiveDate(addMonths(startOfMonth(activeDate), 1));
  };

  const goToPreviousMonth = () => {
    setActiveDate(subMonths(startOfMonth(activeDate), 1));
  };

  const goToNextYear = () => {
    setActiveDate(addYears(startOfMonth(activeDate), 1));
  };

  const goToPreviousYear = () => {
    setActiveDate(subYears(startOfMonth(activeDate), 1));
  };

  const getYear = () => {
    const year = parseInt(format(activeDate, "yyyy"));
    const months = [...Array(12)].map((_, i) => getMonth(new Date(year, i, 1)));
    const quarters = months.reduce((acc: any[], month: any, i: number) => {
      const chunk = Math.floor(i / 3);

      if (!acc[chunk]) {
        acc[chunk] = [];
      }

      acc[chunk].push(month);

      return acc;
    }, []);

    return { year, quarters };
  };

  return {
    activeDate,
    setDate,
    getMonth,
    goToNextMonth,
    goToPreviousMonth,
    getYear,
    goToNextYear,
    goToPreviousYear
  };
}

export default useCalendar;
