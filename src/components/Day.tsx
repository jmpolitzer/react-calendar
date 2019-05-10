import * as React from "react";
import { Navigation } from "./index";
import { DayComponentPropsInterface } from "../interfaces";

const { Fragment } = React;

function Day(props: DayComponentPropsInterface) {
  const {
    day,
    changeView,
    isDayView,
    goToPreviousDay,
    goToNextDay,
    isMilitary = false
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
      <div>
        {currentDay.map((hour, i) => {
          return (
            <div key={i} className="quarter">
              {hour.map((quarter: Date, j: number) => {
                const isHour = j % 4 === 0;
                const showEvening = getEveningStatus(quarter, isHour);

                return (
                  <Fragment key={j}>
                    <div className="quarter-line" />
                    <div className={`${isHour ? "hour" : "minutes"}`}>
                      <div className="time-label">
                        <div>{formatTime(quarter, j)}</div>
                        {showEvening && <div className="evening">p</div>}
                      </div>
                      {getCurrentTime(quarter)}
                    </div>
                  </Fragment>
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
