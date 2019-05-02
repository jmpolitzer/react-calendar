import * as React from "react";
import { DayComponentPropsInterface } from "../interfaces";

function Day(props: DayComponentPropsInterface) {
  const { day, changeView } = props;

  return <div>{day.toDateString()}</div>;
}

export default Day;
