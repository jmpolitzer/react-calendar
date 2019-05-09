import * as React from "react";
import { Navigation, Month } from "./index";
import { YearComponentPropsInterface } from "../interfaces";

function Year(props: YearComponentPropsInterface) {
  const {
    year: currentYear,
    changeView,
    goToNextYear,
    goToPreviousYear
  } = props;
  const { year: yearStringName, quarters } = currentYear;

  const getYearNavTitle = () => {
    return (
      <div>
        <h1>{yearStringName}</h1>
      </div>
    );
  };

  return (
    <div>
      <Navigation
        previous={goToPreviousYear}
        next={goToNextYear}
        title={getYearNavTitle()}
      />
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
