import React, { useState } from "react";
import { PopularPosts } from "../components/PopularPosts";
import { PostItem } from "../components/PostItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/features/post/postSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "react-scroll-to-top";
import { LoaderSpinner } from "../components/LoaderSpinner";

export const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(2);

  const dispatch = useDispatch();

  const { posts, popularPosts, postsPages } = useSelector(
    (state) => state.post
  );

  if (!posts.length) {
    return (
      <div className="grid mt-48 place-items-center">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          <InfiniteScroll
            dataLength={posts.length}
            next={() => {
              dispatch(getAllPosts(currentPage));
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
            refreshFunction={() => {
              dispatch(getAllPosts(1));
              setCurrentPage(2);
            }}
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
              <PostItem key={index} post={post} />
            ))}
          </InfiniteScroll>
        </div>
        <div className="basis-1/5 drop-shadow-lg">
          <p className="text-xs uppercase text-white">popular:</p>

          {popularPosts?.map((post, index) => (
            <PopularPosts key={index} post={post} />
          ))}
        </div>
      </div>

      <ScrollToTop className="flex items-center justify-center" smooth />
    </div>
  );
};
