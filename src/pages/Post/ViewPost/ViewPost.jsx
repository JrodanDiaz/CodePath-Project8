import { useParams } from "react-router-dom";
import calculateHoursDifferenceInUTC from "../../../methods/CalcTimeDifference";
import likeIcon from "/like.svg";
import supabase from "../../../supabase/supabase";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ViewPost({ posts, fetchPosts }) {
  const { id } = useParams();
  const post = posts.filter((post) => post.id == id);

  useEffect(() => {
    fetchPosts();
  }, [post]);

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
        <div className=" bg-white w-6/12 p-5 my-10 flex flex-col gap-6 rounded-md shadow-md">
          <p>Posted {timeDifferenceMessage}</p>
          <p className="text-3xl font-bold">{post[0].title}</p>
          <p>{post[0].content}</p>
          <div className="  w-full m-4 ml-0 p-3 flex justify-between">
            <div className="flex items-center gap-1">
              <img
                src={likeIcon}
                className="w-7 h-7 cursor-pointer"
                onClick={handleUpvote}
              />
              <p>{post[0].upvotes} upvotes</p>
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
        </div>
      )}
    </div>
  );
}
