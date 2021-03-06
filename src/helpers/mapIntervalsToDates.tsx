export default function mapIntervalsToDates(
  intervals: string[],
  year: string,
  month: string,
  dayOfWeek: string
) {
  const getHour = (interval: string) =>
    interval.length === 3 ? interval.slice(0, 1) : interval.slice(0, 2);
  const getMinutes = (interval: string) =>
    interval.length === 3
      ? interval.slice(1, interval.length)
      : interval.slice(2, interval.length);

  return intervals.map(
    (interval: string) =>
      new Date(
        parseInt(year, 10),
        parseInt(month, 10),
        parseInt(dayOfWeek, 10),
        parseInt(getHour(interval), 10),
        parseInt(getMinutes(interval), 10)
      )
  );
}
