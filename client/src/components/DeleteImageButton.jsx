import React, { useState } from "react";
import { ImCross } from "react-icons/im";

export const DeleteImageButton = ({ clickHandler }) => {
  const [crossBtnColor, setCrossBtnColor] = useState("#757E8D");
  return (
    <button
      onClick={clickHandler}
      onMouseEnter={() => {
        setCrossBtnColor("#E5E7EB");
      }}
      onMouseLeave={() => {
        setCrossBtnColor("#757E8D");
      }}
      className="absolute m-2 p-1 right-0 border-2 border-gray-500 rounded-full ease-in-out duration-300 hover:border-gray-200"
      type="button"
    >
      <ImCross style={{ color: crossBtnColor }} />
    </button>
  );
};
