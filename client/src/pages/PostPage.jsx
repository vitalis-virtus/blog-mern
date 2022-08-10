import React, { useCallback, useState, useEffect } from "react";
import { CommentItem } from "../components/CommentItem";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import Moment from "react-moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFetch } from "../hooks/useFetch";
import { deletePost, getAllPosts } from "../redux/features/post/postSlice";
import { toast } from "react-toastify";
import {
  createComment,
  getPostComments,
} from "../redux/features/comment/commentSlice";
import { checkIsAuth } from "../redux/features/auth/authSlice";
import { LoaderSpinner } from "../components/LoaderSpinner";

export const PostPage = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getPost } = useFetch();

  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.comment);
  const { comments } = useSelector((state) => state.comment);
  const isAuth = useSelector(checkIsAuth);

  const fetchPost = useCallback(async () => {
    const { data } = await getPost(params.id);
    setPost(data.post);
  }, []);

  const fetchPostComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchPostComments();
  }, [fetchPostComments]);

  const removePostHandler = () => {
    try {
      dispatch(deletePost(params.id));
      toast("Post was successfully deleted");
      dispatch(getAllPosts());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    try {
      const postId = params.id;
      dispatch(createComment({ postId, comment }));
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link className="inline-flex" to="/">
        <button className="flex justify-center items-center bg-gray-500 text-xs text-white rounded-sm py-2 px-4 hover:bg-gray-700 ease-out duration-300">
          Back
        </button>
      </Link>

      {!post ? (
        <div className="grid mt-48 place-items-center">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="flex gap-10 py-8 ">
          <div className="w-2/3">
            <div className="flex flex-col basis-1/4 flex-grow">
              {/* post photo */}
              <div
                className={
                  post?.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"
                }
              >
                {post?.imgUrl && (
                  <img
                    src={`http://localhost:3002/${post?.imgUrl}`}
                    alt="post_picture"
                    className="object-cover rounded-lg w-full animate-[moveFromLeft_0.3s_ease-in-out] drop-shadow-lg"
                  />
                )}
              </div>

              {/* post info */}

              <div className="animate-[movefromBottom_0.3s_ease-in-out] ">
                <div className="flex justify-between items-center pt-2">
                  <div className="text-sx text-white opacity-50">
                    {post?.username}
                  </div>
                  <div className="text-sx text-white opacity-50">
                    {
                      <Moment
                        date={post?.createdAt}
                        format="DD MMM YYYY HH:MM"
                      />
                    }
                  </div>
                </div>

                <div className="text-white text-xl">
                  {post?.title}
                  <p className="text-white opacity-60 text-xs pt-4 whitespace-pre-line">
                    {post?.text}
                  </p>
                </div>

                <div className="flex gap-3 mt-2 items-center justify-between">
                  <div className="flex gap-3 mt-4">
                    <div className="flex items-center juctify-center gap-2 text-xs text-white opacity-50">
                      <AiFillEye />
                      <span>{post?.views}</span>
                    </div>
                    <div className="flex items-center juctify-center gap-2 text-xs text-white opacity-50">
                      <AiOutlineMessage />
                      <span>{post?.comments?.length || 0}</span>
                    </div>
                  </div>

                  {user?._id === post.author && (
                    <div className="flex gap-3 mt-4">
                      <button className="flex items-center juctify-center gap-2  text-white opacity-50 ease-out duration-300 hover:opacity-100 ">
                        <Link to={`/post/${params.id}/edit`}>
                          <AiTwotoneEdit />
                        </Link>
                      </button>
                      <button
                        onClick={removePostHandler}
                        className="flex items-center juctify-center gap-2  text-white  opacity-50 ease-out duration-300 hover:opacity-100  "
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* comments */}
          {
            <div className="p-8 bg-gray-700 flex flex-col gap-2 rounded-lg drop-shadow-2xl  w-1/3 animate-[movefromRight_0.3s_ease-in-out]">
              {isAuth && (
                <form
                  className="flex gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                  <input
                    type="text"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="comment"
                    className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700 hover:bg-gray-300 ease-out duration-300 focus:bg-gray-300"
                  />
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 hover:bg-gray-500 ease-out duration-300"
                  >
                    Send
                  </button>
                </form>
              )}
              {comments.length === 0 && (
                <p className="text-center">No comments!</p>
              )}
              {!isLoading ? (
                comments?.map((comment, index) => (
                  <CommentItem key={index} comment={comment} />
                ))
              ) : (
                <p className="flex items-center justify-center text-gray-700 text-[20px]">
                  Loading
                </p>
              )}
            </div>
          }
        </div>
      )}
    </div>
  );
};
