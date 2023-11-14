import likeIcon from "/like.svg";
import commentsIcon from "/comments.svg";
import { Link } from "react-router-dom";

export default function PostCard({
  username,
  title,
  upvotes,
  time,
  id,
  comments,
  flag,
}) {
  const flagStyles = {
    Flex: "border-main-pink text-main-pink px-4",
    Question: "border-main-blue text-main-blue",
    Appreciation: "border-green-600 text-green-600",
    Controversial: "text-red-800 border-red-800",
  };

  return (
    <div className="bg-black border-[1px] border-main-purple px-6 py-6 w-4/5 flex flex-col content-evenly rounded-md shadow-sm">
      <Link to={`/posts/${id}`}>
        <div className="flex items-center gap-4">
          <p className="text-white">
            {time} by {username}
          </p>
          {flag && (
            <p
              className={`border-[1px] rounded-full py-1 px-3 w-min ${flagStyles[flag]}`}
            >
              {flag}
            </p>
          )}
        </div>
        {/* {flag && (
          <p
            className={`border-[1px] rounded-full py-1 px-2 my-2 w-min ${flagStyles[flag]}`}
          >
            {flag}
          </p>
        )} */}

        <p className="text-3xl text-white font-bold ">{title}</p>
        <div className="flex items-center gap-4">
          <p className="flex items-center gap-1 my-2 text-white">
            <img src={likeIcon} className="w-5 h-5" />
            {upvotes}
          </p>
          <p className="flex items-center gap-1 my-2 text-white">
            <img src={commentsIcon} className="w-5 h-5" />
            {comments ? comments.length : "0"}
          </p>
        </div>
      </Link>
    </div>
  );
}
