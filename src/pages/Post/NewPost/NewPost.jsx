import { useEffect, useState } from "react";
import NewPostText from "../../../components/forms/NewPostText";
import supabase from "../../../supabase/supabase";
import DropdownMenu from "../../../components/ui/DropdownMenu";

export default function NewPost({ username }) {
  const [postData, setPostData] = useState({
    title: "",
    flag: "",
    url: "",
    username: username,
    content: "",
  });
  const [flag, setFlag] = useState("");

  useEffect(() => {
    setPostData((prev) => ({ ...prev, flag: flag }));
    console.log(`useeffect ran flag`);
  }, [flag]);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPostData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitPost = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("Posts").insert(postData);
    if (error) {
      console.error(error);
    }

    window.location = "/";
  };

  return (
    <>
      <div className="mt-[94px] flex justify-center items-center">
        <div className="bg-black w-2/5 border-[1px] border-white shadow-md rounded-md px-5 py-8 my-8 flex flex-col justify-evenly items-center">
          <form
            onSubmit={submitPost}
            className="flex flex-col justify-center items-center gap-2 w-full"
          >
            <h1 className="text-white w-11/12">Posting as: {username}</h1>
            <DropdownMenu setFlag={setFlag} />
            <NewPostText
              name={"title"}
              placeholder={"Title"}
              handleInputChange={handleInputChange}
              value={postData.title}
            />

            <textarea
              name="content"
              placeholder="Content"
              onChange={handleInputChange}
              value={postData.content}
              className="py-1 px-2 rounded-sm w-11/12 h-64 border-2 bg-black text-white border-main-purple focus:outline-none"
              rows="4"
              //   cols="50"
            ></textarea>
            <NewPostText
              name="url"
              placeholder="URL (Optional)"
              handleInputChange={handleInputChange}
              value={postData.url}
            />

            <button
              type="submit"
              onSubmit={submitPost}
              className=" bg-main-pink py-2 px-4 rounded-sm font-semibold text-white w-56"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
