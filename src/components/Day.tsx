import * as React from "react";
import { Navigation, CalendarEvent } from "./index";
import { DayComponentPropsInterface } from "../interfaces";

function Day(props: DayComponentPropsInterface) {
  const {
    day,
    changeView,
    isDayView,
    goToPreviousDay,
    goToNextDay,
    isMilitary = false,
    currentEvent,
    createEvent
  } = props;
  const { dayOfWeek, dayString, month, year, day: currentDay, date } = day;

  const formatTime = (date: Date, index: number) => {
    const militaryHour = date.getHours();
    const minutes = date.getMinutes();
    const standardHour =
      militaryHour === 0
        ? 12
        : militaryHour < 13
        ? militaryHour
        : militaryHour - 12;
    const hour = isMilitary ? militaryHour : standardHour;

    return index % 4 === 0 ? hour : minutes;
  };

  const getDayNavTitle = () => {
    return (
      <div className="day-headers">
        <div>{dayString}</div>
        <div onClick={() => changeView("month")} className="clickable">
          {month}
        </div>
        <div>{dayOfWeek},</div>
        <div onClick={() => changeView("year")} className="clickable">
          {year}
        </div>
      </div>
    );
  };

  const getEveningStatus = (quarter: Date, isHour: boolean) => {
    return isHour && !isMilitary && quarter.getHours() >= 12;
  };

  const getCurrentTime = (quarter: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isSameHour = quarter.getHours() === today.getHours();
    const todayMinutes = today.getMinutes();
    const quarterMinutes = quarter.getMinutes();
    const isSameQuarter =
      todayMinutes >= quarterMinutes && todayMinutes < quarterMinutes + 15;
    const isEvening = getEveningStatus(quarter, true);

    return isToday && isSameHour && isSameQuarter ? (
      <div className="current-time current">{`${formatTime(
        today,
        0
      )}:${todayMinutes}${isEvening ? "p" : ""}`}</div>
    ) : null;
  };

  const formatQuarter = (quarter: Date) => {
    const quarterHour = quarter.getHours();
    const quarterMinutes =
      quarter.getMinutes() === 0 ? "00" : quarter.getMinutes();

    return `${quarterHour}${quarterMinutes}`;
  };

  return (
    <div>
      {isDayView && <button onClick={() => changeView("week")}>Week</button>}
      {isDayView && (
        <Navigation
          previous={goToPreviousDay}
          next={goToNextDay}
          title={getDayNavTitle()}
        />
      )}
      <div onMouseDown={(e: any) => createEvent(e)}>
        {currentDay.map((hour: Date[], i: number) => {
          return (
            <div key={i} className="quarter">
              {hour.map((quarter: Date, j: number) => {
                const isHour = j % 4 === 0;
                const isEvening = getEveningStatus(quarter, isHour);

                return (
                  <div key={j}>
                    {currentEvent[0] === formatQuarter(quarter) && (
                      <CalendarEvent
                        currentEvent={currentEvent}
                        quarter={quarter}
                        year={year}
                        dayOfWeek={dayOfWeek}
                      />
                    )}
                    <div className="quarter-line" />
                    <div
                      className={`${isHour ? "hour" : "minutes"}`}
                      data-date={quarter}
                    >
                      <div className="time-label">
                        <div>{formatTime(quarter, j)}</div>
                        {isEvening && <div className="evening">p</div>}
                      </div>
                      {getCurrentTime(quarter)}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Day;
