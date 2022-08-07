import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  posts: [],
  popularPosts: [],
  isLoading: false,
};

export const createPost = createAsyncThunk(
  "post/createPost",
  async (params) => {
    try {
      const { data } = await axios.post("/posts", params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllPosts = createAsyncThunk("post/getPosts", async () => {
  try {
    const { data } = await axios.get("/posts");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  try {
    const { data } = await axios.delete(`posts/${id}`, id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (updateData) => {
    try {
      const { data } = await axios.put(
        `posts/${updateData.postId}`,
        updateData.updatedPost
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    // Create post
    [createPost.pending]: (state) => {
      state.isLoading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts.shift(action.payload);
    },
    [createPost.rejected]: (state) => {
      state.isLoading = false;
    },

    // Get all posts
    [getAllPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.posts;
      state.popularPosts = action.payload.popularPosts;
    },
    [getAllPosts.rejected]: (state) => {
      state.isLoading = false;
    },

    // Delete post
    [deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload._id
      );
    },
    [deletePost.rejected]: (state) => {
      state.isLoading = false;
    },

    // Update post
    [updatePost.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      state.posts[index] = action.payload;
    },
    [updatePost.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default postSlice.reducer;
