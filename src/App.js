import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PostForm from './components/PostForm';
import NavigationBar from './components/NavigationBar';
import { URL } from './constants/utils';

const App = (props) => {
  const [posts, setPosts] = useState([]);

  const updatePosts = (posts) => setPosts(posts);

  useEffect(() => {
    fetch(URL + '/posts', {
      method: 'GET',
      headers: { 'Content-Type': 'Application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        updatePosts(data);
      });
  }, []);

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={<Home posts={posts} updatePosts={updatePosts} />}
        />
        <Route
          path="/create-post"
          element={
            <PostForm posts={posts} updatePosts={updatePosts} method="POST" />
          }
        />
        <Route
          path="/update-post/:postId"
          element={
            <PostForm posts={posts} updatePosts={updatePosts} method="PUT" />
          }
        />
      </Routes>
    </>
  );
};

export default App;
