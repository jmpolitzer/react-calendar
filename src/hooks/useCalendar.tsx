import { useState } from "react";
import {
  addMonths,
  addYears,
  addDays,
  addWeeks,
  addHours,
  addMinutes,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  startOfDay,
  subMonths,
  subYears,
  subDays,
  subWeeks
} from "date-fns";

function useCalendar(startWeekOn?: any) {
  const [activeDate, setActiveDate] = useState(new Date());

  const setDate = (date: Date) => {
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

  const getDay = (date?: Date) => {
    const dateToUse = date || activeDate;
    const dayOfWeek = format(dateToUse, "d");
    const month = format(dateToUse, "MMMM");
    const year = format(dateToUse, "yyyy");
    const dayStart = startOfDay(dateToUse);
    const day = [...Array(24)].map((_, i) => {
      const hour = addHours(dayStart, i);

      return [...Array(4)].map((_, j) => addMinutes(hour, j * 15));
    });

    return { dayOfWeek, month, year, date: dateToUse, day };
  };

  const getWeek = () => {
    const weekStart = startOfWeek(activeDate, {
      weekStartsOn: startWeekOn || 0
    });
    const week = [...Array(7)].map((_, i) => getDay(addDays(weekStart, i)));
    const headers = getDayHeaders(week);

    return { headers, week };
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

  const goToNextDay = () => {
    setActiveDate(addDays(activeDate, 1));
  };

  const goToPreviousDay = () => {
    setActiveDate(subDays(activeDate, 1));
  };

  const goToNextWeek = () => {
    setActiveDate(addWeeks(activeDate, 1));
  };

  const goToPreviousWeek = () => {
    setActiveDate(subWeeks(activeDate, 1));
  };

  return {
    activeDate,
    setDate,
    getMonth,
    goToNextMonth,
    goToPreviousMonth,
    getYear,
    goToNextYear,
    goToPreviousYear,
    getDay,
    goToNextDay,
    goToPreviousDay,
    getWeek,
    goToNextWeek,
    goToPreviousWeek
  };
}

export default useCalendar;
