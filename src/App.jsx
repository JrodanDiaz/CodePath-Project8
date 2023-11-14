import "./index.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import supabase from "./supabase/supabase";
import Home from "./pages/Home/Home";
import NewPost from "./pages/Post/NewPost/NewPost";
import Navbar from "./components/ui/Navbar";
import ViewPost from "./pages/Post/ViewPost/ViewPost";
import EditPost from "./pages/Post/EditPost/EditPost";

function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchPosts();
    setUsername(generateRandomGamertag);
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("Posts")
      .select()
      .order("created_at", { ascending: false });

    setPosts(data);
  };

  function generateRandomGamertag() {
    const adjectives = [
      "Crazy",
      "Savage",
      "Blazing",
      "Mystic",
      "Fierce",
      "Swift",
      "Mighty",
      "Epic",
      "Glorious",
      "Dynamic",
      "Tusked",
      "Dark",
      "Holy",
      "Enraged",
      "King",
      "Fast",
      "Deadly",
    ];
    const nouns = [
      "Dragon",
      "Shadow",
      "Storm",
      "Phoenix",
      "Thunder",
      "Pirate",
      "Spartan",
      "Ninja",
      "Warden",
      "Vortex",
      "Fountain",
      "Bear",
      "Goblin",
      "Dorito",
      "Hawk",
      "Machine",
    ];

    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    const randomNumber = Math.floor(Math.random() * 1000);

    const gamertag = `${randomAdjective}${randomNoun}${randomNumber}`;
    return gamertag;
  }

  return (
    <>
      <BrowserRouter>
        <Navbar posts={posts} />
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
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
