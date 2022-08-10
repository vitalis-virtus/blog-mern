import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetch } from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost } from "../redux/features/post/postSlice";
import { toast } from "react-toastify";
import { DeleteImageButton } from "../components/DeleteImageButton";

export const EditPostPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [newImage, setNewImage] = useState("");
  const [postId, setPostId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { getPost } = useFetch();

  const fetchPost = useCallback(async () => {
    const { data } = await getPost(params.id);
    setTitle(data.post.title);
    setText(data.post.text);
    setOldImage(data.post.imgUrl);
    setPostId(data.post._id);
  }, [getPost, params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const submitHandler = () => {
    try {
      const updatedPost = new FormData();
      updatedPost.append("title", title);
      updatedPost.append("text", text);
      updatedPost.append("id", postId);
      updatedPost.append("image", newImage);
      dispatch(updatePost({ updatedPost, postId }));
      navigate("/posts");
      toast("You have successfully updated your post");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImageButtonHandler = () => {
    setNewImage("");
    setOldImage("");
  };

  const clearFormHandler = () => {
    setTitle("");
    setText("");
  };

  return (
    <form
      className="w-1/3 mx-auto py-10 animate-[movefromBottom_0.4s_ease-in-out]"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer hover:bg-gray-500  ease-out duration-300">
        Use image
        <input
          type="file"
          className="hidden"
          onChange={(event) => {
            setNewImage(event.target.files[0]);
            setOldImage("");
          }}
        />
      </label>
      <div className="flex object-cover py-2 relative">
        {oldImage && (
          <>
            <DeleteImageButton clickHandler={deleteImageButtonHandler} />
            <img
              src={`http://localhost:3002/${oldImage}`}
              alt="uploaded file"
            />
          </>
        )}

        {newImage && (
          <>
            <DeleteImageButton clickHandler={deleteImageButtonHandler} />
            <img src={URL.createObjectURL(newImage)} alt="uploaded file" />
          </>
        )}
      </div>

      <label className="text-xs text-white opacity-70">
        Post header:
        <input
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          placeholder="header"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-grey-700  hover:bg-gray-300 ease-out duration-300 focus:bg-gray-300"
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Post text:
        <textarea
          placeholder="Type some text"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border resize-none h-40 py-1 px-2 text-xs outline-none placeholder:text-gray-700 whitespace-pre-line hover:bg-gray-300 ease-out duration-300 focus:bg-gray-300"
        />
      </label>

      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          type="button"
          onClick={submitHandler}
          className="flex items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4
          hover:bg-gray-700 ease-out duration-300"
        >
          Save
        </button>
        <button
          onClick={clearFormHandler}
          className="flex items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4 hover:bg-red-600 easy-out duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
