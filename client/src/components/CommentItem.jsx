import React from "react";
import { FaUserAlt } from "react-icons/fa";

export const CommentItem = ({ comment }) => {
  return (
    <>
      {comment._id && (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm">
            <FaUserAlt color="#4B5563" />
          </div>
          <div className="flex text-gray-300 text-[10px]">
            {comment.comment}
          </div>
        </div>
      )}
    </>
  );
};
