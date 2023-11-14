import { useParams } from "react-router-dom";
import NewPostText from "../../../components/forms/NewPostText";
import { useEffect, useState } from "react";
import supabase from "../../../supabase/supabase";

export default function EditPost({ posts }) {
  const { id } = useParams();
  const [postData, setPostData] = useState({ title: "", content: "", url: "" });
  const post = posts.filter((post) => post.id == id);

  useEffect(() => {
    setPostData({
      title: post[0].title,
      content: post[0].content,
      url: post[0].url,
    });
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPostData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitUpdatedPost = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("Posts")
      .update({
        title: postData.title,
        content: postData.content,
        url: postData.url,
      })
      .eq("id", id);
    if (error) {
      console.error(error);
    }

    window.location = `/posts/${id}`;
  };

  return (
    <div className="mt-[94px] flex justify-center items-center">
      <div className="bg-black border-[1px] border-white w-2/5 shadow-md rounded-md px-5 py-8 my-8 flex flex-col justify-evenly items-center">
        {post[0] && (
          <form
            onSubmit={submitUpdatedPost}
            className="flex flex-col justify-center items-center gap-2 w-full"
          >
            <NewPostText
              name={"title"}
              placeholder={"Title"}
              defaultValue={post[0].title}
              handleInputChange={handleInputChange}
            />

            <textarea
              name="content"
              placeholder="Content"
              className="bg-black text-white py-1 px-2 rounded-sm w-11/12 h-64 border-2 border-main-purple focus:outline-none"
              defaultValue={post[0].content}
              onChange={handleInputChange}
              rows="4"
            ></textarea>
            <NewPostText
              name="url"
              placeholder="URL (Optional)"
              defaultValue={post[0].url}
              handleInputChange={handleInputChange}
            />

            <button
              type="submit"
              className=" bg-main-pink py-2 px-4 rounded-sm font-semibold text-white w-56"
            >
              Edit Post
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
