import React from "react";

export const LoaderSpinner = () => {
  return (
    <div className="flex align-center justify-center ">
      <span className="border-sm w-[120px] h-[120px] border-2 border-transparent opacity-50 border-t-8 border-t-white rounded-full animate-spin"></span>
    </div>
  );
};
