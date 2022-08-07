import axios from "../utils/axios";
import React, { useState, useCallback, useEffect } from "react";
import { PostItem } from "../components/PostItem";
import { Link } from "react-router-dom";

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  const fetchMyPosts = useCallback(async () => {
    try {
      const { data } = await axios.get("/posts/user/me");

      setPosts(data.list);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  return (
    <div>
      <Link className="inline-flex" to="/">
        <button className="flex justify-center items-center bg-gray-500 text-xs text-white rounded-sm py-2 px-4">
          Back
        </button>
      </Link>
      <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
        {posts?.map((post, index) => (
          <PostItem key={index} post={post}></PostItem>
        ))}
      </div>
    </div>
  );
};
