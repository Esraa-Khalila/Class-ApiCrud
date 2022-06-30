import { useState } from "react";

function State() {
  const [posts, setPosts] = useState([]);
  const fetchPost = async () => {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await response.json();
      setPosts(data);
      fetchPost();
  }

 
   
  
  return (
    <div className="App">
      <p> {posts.value} </p>
      <button onClick={fetchPost}> get new joke </button>
    </div>
  );
}

export default State;