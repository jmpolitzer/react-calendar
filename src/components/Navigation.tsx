import * as React from "react";

function Navigation(props) {
  const { previous, next, title } = props;

  return (
    <div className="nav">
      <button onClick={previous}>&laquo;</button>
      <div>{title}</div>
      <button onClick={next}>&raquo;</button>
    </div>
  );
}

export default Navigation;
