import React, { useState, useCallback, useEffect } from "react";
import { PostItem } from "../components/PostItem";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  const { getMyPosts } = useFetch();

  const fetchMyPosts = useCallback(async () => {
    try {
      const { data } = await getMyPosts();
      setPosts(data.list);
    } catch (error) {
      console.log(error);
    }
  }, [getMyPosts]);

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
