import * as React from "react";
import { Month } from "./index";
import { YearComponentPropsInterface } from "../interfaces";

function Year(props: YearComponentPropsInterface) {
  const {
    year: currentYear,
    changeView,
    goToNextYear,
    goToPreviousYear
  } = props;
  const { year: yearStringName, quarters } = currentYear;

  return (
    <div>
      <div className="year-nav">
        <button onClick={goToPreviousYear}>&laquo;</button>
        <div>
          <h1>{yearStringName}</h1>
        </div>
        <button onClick={goToNextYear}>&raquo;</button>
      </div>
      <div>
        {quarters.map((quarter, i) => (
          <div className="year-row" key={i}>
            {quarter.map((month: any, j: number) => (
              <Month key={j} month={month} changeView={changeView} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Year;
