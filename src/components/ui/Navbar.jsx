import { useState } from "react";
import { Link } from "react-router-dom";
import homeIcon from "/home.svg";
import createIcon from "/plus.svg";

export default function Navbar({ posts }) {
  const [postFound, setPostFound] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    const foundPost = posts.filter(
      (post) => post.title.toLowerCase() === searchInput.toLowerCase()
    );
    if (foundPost.length > 0) {
      window.location = `/posts/${foundPost[0].id}`;
    } else {
      setPostFound(false);
    }
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div className="flex justify-around fixed top-0 w-screen  bg-black p-6  border-b-0 border-b-white">
      <h1 className="text-2xl font-bold text-white">4StringsForum</h1>
      <form
        onSubmit={handleSearch}
        className={`bg-black border-[1px] border-white flex justify-between rounded-md w-5/12 ${
          !postFound ? `outline-4 outline-red-700` : ``
        }`}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={handleSearchChange}
          className={`rounded-full py-1 px-3 text-white bg-transparent focus:outline-none w-full ${
            !postFound ? `outline-4 outline-red-700` : ``
          }`}
        />
        <button
          type="submit"
          className=" bg-main-pink py-1 px-4 rounded-md border-[1px] border-l-2 border-white"
        >
          Submit
        </button>
      </form>
      {/* </div> */}
      <div className="flex justify-evenly gap-5">
        <Link to={"/"}>
          <p className="nav-btn font-medium bg-main-purple flex justify-between items-center gap-2">
            <img src={homeIcon} alt="home icon" />
            Home
          </p>
        </Link>
        <Link to={"/posts/create"}>
          <p className="nav-btn font-semibold bg-main-purple flex justify-between items-center gap-2">
            <img src={createIcon} />
            New Post
          </p>
        </Link>
      </div>
    </div>
  );
}
