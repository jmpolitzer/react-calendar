import * as React from "react";
import { NavigationComponentPropsInterface } from "../interfaces";

function Navigation(props: NavigationComponentPropsInterface) {
  const { previous, next, title } = props;

  return (
    <div className="nav">
      <button onClick={previous}>&laquo;</button>
      {title}
      <button onClick={next}>&raquo;</button>
    </div>
  );
}

export default Navigation;
