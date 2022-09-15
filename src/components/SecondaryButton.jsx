import React from "react";

const SecondaryButton = (props) => {
  return (
    <button
      {...props}
      className="uppercase px-5 py-[10px] tracking-wide border-[0.5px] border-black text-black bg-white hover:text-white hover:bg-black"
    >
      {props.children}
    </button>
  );
};

export default SecondaryButton;
