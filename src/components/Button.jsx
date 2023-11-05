import React from "react";

const Button = (props) => {
  return (
    <>
      <button type="button" className={`${props.className}`}>
        {props.children}
      </button>
    </>
  );
};

export default Button;
