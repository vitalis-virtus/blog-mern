import React from "react";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import { Link } from "react-router-dom";
import Moment from "react-moment";

export const PostItem = ({ post }) => {
  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Loading...</div>
    );
  }
  return (
    <Link to={`/post/${post._id}`}>
      <div className="flex flex-col basis-1/4 py-6 border-b border-white border-opacity-20 flex-grow">
        <div
          className={post.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"}
        >
          {post.imgUrl && (
            <img
              src={`http://localhost:3002/${post.imgUrl}`}
              alt="post_picture"
              className="object-cover w-full"
            />
          )}
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="text-sx text-white opacity-50">{post.username}</div>
          <div className="text-sx text-white opacity-50">
            {<Moment date={post.createdAt} format="DD MMM YYYY HH:MM" />}
          </div>
        </div>

        <div className="text-white text-xl">{post.title}</div>
        <p className="text-white opacity-60 text-xs pt-4 line-clamp-4 whitespace-pre-line" >{post.text}</p>

        <div className="flex gap-3 mt-2 items-center">
          <button className="flex items-center juctify-center gap-2 text-xs text-white opacity-50">
            <AiFillEye />
            <span>{post.views}</span>
          </button>
          <button className="flex items-center juctify-center gap-2 text-xs text-white opacity-50">
            <AiOutlineMessage />
            <span>{post.comments?.length || 0}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};
