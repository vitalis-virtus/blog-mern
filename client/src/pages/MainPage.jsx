import React, { useState } from "react";
import { PopularPosts } from "../components/PopularPosts";
import { PostItem } from "../components/PostItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/features/post/postSlice";
import InfiniteScroll from "react-infinite-scroll-component";

export const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(2);

  const dispatch = useDispatch();

  const { posts, popularPosts, postsPages } = useSelector(
    (state) => state.post
  );

  // useLayoutEffect(() => {
  //   dispatch(getAllPosts());
  // }, []);

  if (!posts.length) {
    return (
      <div className="text-xl text-center text-white py-10">No posts!</div>
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
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            refreshFunction={() => {}}
            pullDownToRefresh
            pullDownToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                &#8595; Pull down to refresh
              </h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                &#8593; Release to refresh
              </h3>
            }
          >
            {posts?.map((post, index) => (
              <PostItem key={index} post={post} />
            ))}
          </InfiniteScroll>
        </div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-white">popular:</div>

          {popularPosts?.map((post, index) => (
            <PopularPosts key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
