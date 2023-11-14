import { useState } from "react";
import { PacmanLoader } from "react-spinners";
import PostCard from "../../components/ui/PostCard";
import calculateHoursDifferenceInUTC from "../../methods/CalcTimeDifference";

export default function Home({ posts, loading }) {
  const [sortBy, setSortBy] = useState("newest");
  const [filter, setFilter] = useState("any");

  const handleSort = (type) => {
    setSortBy(type);
  };

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  const filterPosts = () => {
    if (filter == "any") {
      return posts;
    } else {
      const filteredPosts = posts.filter((post) => post.flag == filter);
      return filteredPosts;
    }
  };

  const sortedPosts = filterPosts().sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === "mostPopular") {
      return b.upvotes - a.upvotes;
    }
  });

  return (
    <div className="mt-[94px] p-20 flex flex-col justify-center items-center gap-7">
      {loading ? (
        <PacmanLoader color="#e60fbc" size={75} />
      ) : (
        <>
          <div className="w-4/5 flex items-center justify-start gap-4">
            <p className="text-white">Order by:</p>
            <button
              className={`px-2 py-1 bg-main-pink text-white rounded-md ${
                sortBy === "newest" ? "bg-opacity-100" : "bg-opacity-50"
              }`}
              onClick={() => handleSort("newest")}
            >
              Newest
            </button>
            <button
              className={`px-2 py-1 bg-main-pink text-white rounded-md ${
                sortBy === "mostPopular" ? "bg-opacity-100" : "bg-opacity-50"
              }`}
              onClick={() => handleSort("mostPopular")}
            >
              Most Popular
            </button>
          </div>
          {/* FILTER */}
          <div className="w-4/5 flex items-center justify-start gap-4">
            <p className="text-white">Filter by:</p>
            <button
              className={`px-2 py-1 bg-main-pink text-white rounded-md ${
                filter === "any" ? "bg-opacity-100" : "bg-opacity-50"
              }`}
              onClick={() => handleFilter("any")}
            >
              Any
            </button>
            <button
              className={`px-2 py-1 bg-main-pink text-white rounded-md ${
                filter === "Question" ? "bg-opacity-100" : "bg-opacity-50"
              }`}
              onClick={() => handleFilter("Question")}
            >
              Questions
            </button>
            <button
              className={`px-2 py-1 bg-main-pink text-white rounded-md ${
                filter === "Flex" ? "bg-opacity-100" : "bg-opacity-50"
              }`}
              onClick={() => handleFilter("Flex")}
            >
              Flex
            </button>
            <button
              className={`px-2 py-1 bg-main-pink text-white rounded-md ${
                filter === "Controversial" ? "bg-opacity-100" : "bg-opacity-50"
              }`}
              onClick={() => handleFilter("Controversial")}
            >
              Controversial
            </button>
          </div>
          {sortedPosts.map((post) => {
            const timeDifferenceMessage = calculateHoursDifferenceInUTC(
              post.created_at
            );
            return (
              <PostCard
                username={post.username}
                title={post.title}
                time={timeDifferenceMessage}
                upvotes={post.upvotes}
                comments={post.comments}
                flag={post.flag}
                id={post.id}
                key={post.created_at}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
