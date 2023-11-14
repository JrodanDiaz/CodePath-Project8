import { useParams } from "react-router-dom";
import calculateHoursDifferenceInUTC from "../../../methods/CalcTimeDifference";
import likeIcon from "/like.svg";
import commentsIcon from "/comments.svg";
import supabase from "../../../supabase/supabase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ViewPost({ posts, fetchPosts, username }) {
  const { id } = useParams();
  const post = posts.filter((post) => post.id == id);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchPosts();
  }, [post]);

  const handleCommentChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
    console.log(comment);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentWithUsername = `${comment}  ~${username}`;
    let newComments = [commentWithUsername];
    if (post[0].comments) {
      newComments = [...post[0].comments, commentWithUsername];
    }
    const { error } = await supabase
      .from("Posts")
      .update({ comments: newComments })
      .eq("id", post[0].id);
    if (error) {
      console.error(error);
    }
    setComment("");
  };

  const handleUpvote = async (e) => {
    e.preventDefault();
    const newUpvotes = post[0].upvotes + 1;
    const { error } = await supabase
      .from("Posts")
      .update({ upvotes: newUpvotes })
      .eq("id", id);
    if (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("Posts").delete().eq("id", id);
    if (error) {
      console.error(error);
    }
    window.location = "/";
  };

  let timeDifferenceMessage;
  if (post[0]) {
    timeDifferenceMessage = calculateHoursDifferenceInUTC(post[0].created_at);
  }

  return (
    <div className="mt-[94px] flex justify-center items-center">
      {post[0] && timeDifferenceMessage && (
        <div className=" bg-black border-[1px]  border-white w-6/12 px-10 py-8 my-10 flex flex-col gap-6 rounded-sm shadow-lg">
          <p className="text-white">
            Posted {timeDifferenceMessage} by {post[0].username}
          </p>
          <p className="text-3xl text-white font-bold">{post[0].title}</p>
          <img src={post[0].url} className="w-1/2 h-auto" />
          <p className="text-white">{post[0].content}</p>
          <div className="w-full m-4 ml-0 p-3 flex justify-between">
            <div className="flex items-center gap-2">
              <img
                src={likeIcon}
                className="w-7 h-7 cursor-pointer"
                onClick={handleUpvote}
              />
              <p className="text-white">{post[0].upvotes}</p>
              <p className="flex items-center gap-2 ml-2 my-2 text-white">
                <img src={commentsIcon} className="w-5 h-5"></img>
                {post[0].comments ? post[0].comments.length : "0"}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link to={`/posts/edit/${id}`}>
                <button className="bg-main-pink py-2 px-4 text-white rounded-sm">
                  Edit
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className="bg-main-pink py-2 px-4 text-white rounded-sm"
              >
                Delete
              </button>
            </div>
          </div>
          <div
            className={`bg-black p-4 flex flex-col gap-4 ${
              post[0].comments ? `border-2 border-main-orange` : ``
            } rounded-lg`}
          >
            {post[0].comments &&
              post[0].comments.map((comment, i) => (
                <p
                  key={`comment-${i}`}
                  className="text-white pb-2 border-b-[1px] border-b-gray-500"
                >
                  {comment}
                </p>
              ))}

            <div>
              <form
                onSubmit={handleCommentSubmit}
                className="bg-main-darknavy border-2 border-main-pink flex items-center rounded-full"
              >
                <input
                  type="text"
                  className=" bg-transparent text-white p-2 px-4 w-full outline-none border-none rounded-full"
                  placeholder="Leave a comment"
                  value={comment}
                  onChange={handleCommentChange}
                />
                <button
                  type="submit"
                  className="bg-main-pink px-5 py-2 rounded-full"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
