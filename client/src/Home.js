import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the MernBlog</h1>
      <Link to="/create-post">
        <button>Create a New Post</button>
      </Link>
      <Link to="/posts">
        <button>View Posts</button>
      </Link>
    </div>
  );
}

export default Home;
