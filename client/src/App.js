import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Posts from './Posts';
import CreatePost from './CreatePost';
import Home from './Home';
import UpdatePost from './UpdatePost'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/posts" element={<Posts/>}/>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/update-post/:id" element={<UpdatePost/>}/>
        </Routes>
      </div>
    </Router>
  );
}


export default App;
