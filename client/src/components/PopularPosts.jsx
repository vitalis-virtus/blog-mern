import React from "react";
import { Link } from "react-router-dom";

export const PopularPosts = ({ post }) => {
  return (
    <div className="bg-gray-600 my-1 rounded-sm animate-[movefromBottom_0.3s_ease-in-out]">
      <Link
        to={`/post/${post._id}`}
        className="flex text-xs text-gray-300 hover:bg-gray-800 p-2 hover:text-white ease-out duration-300"
      >
        {post.title}
      </Link>
    </div>
  );
};
