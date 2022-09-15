import React from "react";

const PrimaryButton = (props) => {
  return (
    <button
      {...props}
      className={`uppercase px-5 py-[10px] tracking-wide text-white bg-black shadow-sm shadow-black ${props.className} disabled:cursor-progress  disabled:text-gray-500`}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButton;
