import React from "react";
import "./style.css";
const Checkbox = (props) => {
  return (
    <label className="toggler-wrapper checkbox-style">
      <input type="checkbox" {...props} />
      <div className="toggler-slider">
        <div className="toggler-knob"></div>
      </div>
    </label>
  );
};

export default Checkbox;
