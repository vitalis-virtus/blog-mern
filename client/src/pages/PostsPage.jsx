import React, { useState, useCallback, useEffect } from "react";
import { PostItem } from "../components/PostItem";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "react-scroll-to-top";
import { LoaderSpinner } from "../components/LoaderSpinner";

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [postsPages, setPostsPages] = useState("");

  const { getMyPosts } = useFetch();

  const fetchMyPosts = useCallback(
    async (page) => {
      try {
        const { data } = await getMyPosts(page);
        setPosts((prevPosts) => [...prevPosts, ...data.list]);
        setPostsPages(data.totalPages);
      } catch (error) {
        console.log(error);
      }
    },
    [getMyPosts]
  );

  useEffect(() => {
    fetchMyPosts(1);
  }, [fetchMyPosts]);

  return (
    <div>
      <Link className="inline-flex" to="/">
        <button className="flex justify-center items-center bg-gray-500 text-xs text-white rounded-sm py-2 px-4 hover:bg-gray-700 ease-out duration-300">
          Back
        </button>
      </Link>

      {!posts.length ? (
        <div className="grid mt-48 place-items-center">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="w-1/2 mx-auto pb-10 flex flex-col gap-10">
          <InfiniteScroll
            dataLength={posts.length}
            next={() => {
              fetchMyPosts(currentPage);
              setCurrentPage((prev) => prev + 1);
            }}
            hasMore={posts.length < postsPages}
            loader={
              <h4 className="text-center text-white opacity-50">Loading...</h4>
            }
            endMessage={
              <p className="text-center text-white mt-4 opacity-50">
                No more posts...
              </p>
            }
            refreshFunction={() => {}}
            pullDownToRefresh
            pullDownToRefreshContent={
              <h3 className="text-center text-white opacity-50">
                &#8595; Pull down to refresh
              </h3>
            }
            releaseToRefreshContent={
              <h3 className="text-center text-white opacity-50">
                &#8593; Release to refresh
              </h3>
            }
          >
            {posts?.map((post, index) => (
              <PostItem key={index} post={post}></PostItem>
            ))}
          </InfiniteScroll>
        </div>
      )}

      <ScrollToTop className="flex items-center justify-center" smooth />
    </div>
  );
};
