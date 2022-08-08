import { useCallback } from "react";
import axios from "../utils/axios";

export const useFetch = () => {
  const getPost = useCallback(async (id) => {
    try {
      console.log('start in hook')
      const response = await axios.get(`/posts/post/${id}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const getMyPosts = useCallback(async () => {
    try {
      const response = await await axios.get("/posts/user/me");
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  return { getPost, getMyPosts };
};
