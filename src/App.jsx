import "./index.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import supabase from "./supabase/supabase";
import Home from "./pages/Home/Home";
import NewPost from "./pages/Post/NewPost/NewPost";
import Navbar from "./components/ui/Navbar";
import ViewPost from "./pages/Post/ViewPost/ViewPost";
import EditPost from "./pages/Post/EditPost/EditPost";
import GenerateRandomGamertag from "./methods/GenerateRandomGamertag";

function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    setUsername(GenerateRandomGamertag);
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Posts")
      .select()
      .order("created_at", { ascending: false });

    setPosts(data);
    if (error) console.error(error);

    setLoading(false);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar posts={posts} />
        <Routes>
          <Route path="/" element={<Home posts={posts} loading={loading} />} />
          <Route
            path="/posts/create"
            element={<NewPost username={username} />}
          />
          <Route
            path="posts/:id"
            element={
              <ViewPost
                posts={posts}
                fetchPosts={fetchPosts}
                loading={loading}
                username={username}
              />
            }
          />
          <Route path="/posts/edit/:id" element={<EditPost posts={posts} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
