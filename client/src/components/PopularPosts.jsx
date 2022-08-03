import React from "react";

export const PopularPosts = ({ post }) => {
  return (
    <div className="bg-gray-600 my-1">
      <div className="flex text-xs text-gray-300 hover:bg-gray-800 p-2 hover:text-white">
        {post.title}
      </div>
    </div>
  );
};
