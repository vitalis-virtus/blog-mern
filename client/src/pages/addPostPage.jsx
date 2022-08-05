import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { createPost } from "../redux/features/post/postSlice";

export const AddPostPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const [crossBtnColor, setCrossBtnColor] = useState("#757E8D");

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

  const clearFormHandler = () => {
    setText("");
    setTitle("");
    setImage("");
  };

  return (
    <form
      className="w-1/3 mx-auto py-10"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
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
            <button
              type="button"
              onClick={(event) => {
                setImage("");
              }}
              className="absolute m-2 p-1 right-0 border-2 border-gray-500 rounded-full ease-in-out duration-300 hover:border-gray-200"
              onMouseEnter={() => {
                setCrossBtnColor("#E5E7EB");
              }}
              onMouseLeave={() => {
                setCrossBtnColor("757E8D");
              }}
            >
              <ImCross color="#757E8D" style={{ color: crossBtnColor }} />
            </button>

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
          placeholder="header"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-grey-700"
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
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border resize-none h-40 py-1 px-2 text-xs outline-none placeholder:text-grey-700"
        />
      </label>

      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          onClick={submitHandler}
          className="flex items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Add post
        </button>
        <button
          onClick={clearFormHandler}
          className="flex items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
