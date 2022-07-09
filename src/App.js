import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import NavigationBar from './components/NavigationBar';
import { URL } from './constants/utils';

const App = (props) => {
  const [posts, setPosts] = useState([]);

  const updatePosts = (posts) => setPosts(posts);

  useEffect(() => {
    console.log('App mounting\n_________________');

    fetch(URL + '/posts', {
      method: 'GET',
      headers: { 'Content-Type': 'Application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        updatePosts(data);
      });

    return () => {
      console.log('App unmounting\n______________');
    };
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
            <CreatePost posts={posts} updatePosts={updatePosts} method="POST" />
          }
        />
        <Route
          path="/update-post/:postId"
          element={
            <CreatePost posts={posts} updatePosts={updatePosts} method="PUT" />
          }
        />
      </Routes>
    </>
  );
};

export default App;
