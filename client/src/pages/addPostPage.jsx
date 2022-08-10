import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/features/post/postSlice";
import { DeleteImageButton } from "../components/DeleteImageButton";

export const AddPostPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = () => {
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("text", text);
      data.append("image", image);
      dispatch(createPost(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImageButtonHandler = () => {
    setImage("");
  };

  const clearFormHandler = () => {
    setText("");
    setTitle("");
    setImage("");
  };

  return (
    <form
      className="w-1/3 mx-auto py-10 animate-[movefromBottom_0.3s_ease-in-out] drop-shadow-2xl"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer hover:bg-gray-500  ease-out duration-300">
        Use image
        <input
          type="file"
          className="hidden"
          onChange={(event) => {
            setImage(event.target.files[0]);
          }}
        />
      </label>
      <div className="flex object-cover py-2 relative">
        {image && (
          <>
            <DeleteImageButton clickHandler={deleteImageButtonHandler} />
            <img src={URL.createObjectURL(image)} alt="uploaded file" />
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
          placeholder="Header"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700  hover:bg-gray-300 ease-out duration-300 focus:bg-gray-300"
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
          Add post
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
