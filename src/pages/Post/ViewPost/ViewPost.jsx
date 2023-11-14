import { useParams } from "react-router-dom";
import calculateHoursDifferenceInUTC from "../../../methods/CalcTimeDifference";
import likeIcon from "/like.svg";
import commentsIcon from "/comments.svg";
import supabase from "../../../supabase/supabase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

export default function ViewPost({ posts, fetchPosts, loading, username }) {
  const { id } = useParams();
  const post = posts.filter((post) => post.id == id);
  const [comment, setComment] = useState("");
  const [selectedComment, setSelectedComment] = useState("");
  const [key, setKey] = useState("");
  const [showInput, setShowInput] = useState(null);
  const [isKeyValid, setIsKeyValid] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [post]);

  const handleCommentChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
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
    if (error) console.error(error);
    setComment("");
  };

  const handleUpvote = async (e) => {
    e.preventDefault();
    const newUpvotes = post[0].upvotes + 1;
    const { error } = await supabase
      .from("Posts")
      .update({ upvotes: newUpvotes })
      .eq("id", id);
    if (error) console.error(error);
  };

  const onDeleteClick = (index) => {
    setSelectedComment(post[0].comments[index]);
    setShowInput(index);
  };

  const isValidKey = () => {
    const result = post[0].key === key;
    setIsKeyValid(result);
    return result;
  };

  const handleCommentDelete = async (e) => {
    e.preventDefault();
    if (!isValidKey()) {
      setKey("");
      return;
    }
    const updatedComments = post[0].comments.filter(
      (comment) => comment != selectedComment
    );
    const { error } = await supabase
      .from("Posts")
      .update({ comments: updatedComments })
      .eq("id", id);
    if (error) console.error(error);
    setShowInput(null);
  };

  let timeDifferenceMessage;
  if (post[0]) {
    timeDifferenceMessage = calculateHoursDifferenceInUTC(post[0].created_at);
  }

  return (
    <div className="mt-[94px] flex justify-center items-center">
      {loading && !post[0] && <PacmanLoader color="#e60fbc" size={75} />}
      {post[0] && (
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
            </div>
          </div>
          <div
            className={`bg-black p-4 flex flex-col gap-4 ${
              post[0].comments ? `border-2 border-main-orange` : ``
            } rounded-lg`}
          >
            {!isKeyValid && <p className="text-red-600">Error: Invalid Key</p>}
            {post[0].comments &&
              post[0].comments.map((comment, i) => (
                <div className="flex flex-col gap-2" key={`comment-${i}`}>
                  <div className="flex justify-between items-center w-full pb-1 border-b-[1px] border-b-gray-500">
                    <p className="text-white ">{comment}</p>
                    <div className="flex justify-center items-center gap-2">
                      <img
                        src="/edit.svg"
                        className="w-6 h-6 cursor-pointer"
                        alt="edit"
                      />
                      <img
                        src="/delete.svg"
                        className=" w-6 h-6  cursor-pointer"
                        alt="delete"
                        onClick={() => onDeleteClick(i)}
                      />
                    </div>
                  </div>

                  {showInput == i && (
                    <form
                      className="bg-main-darknavy border-2 border-main-orange flex items-center rounded-full"
                      onSubmit={handleCommentDelete}
                    >
                      <input
                        type="text"
                        className=" bg-transparent text-white p-2 px-4 w-full outline-none border-none rounded-full"
                        placeholder="Enter Key"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="bg-main-orange px-5 py-2 rounded-full"
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </div>
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
