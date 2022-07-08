import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import NavigationBar from './components/NavigationBar';

const App = (props) => {
  useEffect(() => {
    console.log('App mounting\n_________________');

    return () => {
      console.log('App unmounting\n______________');
    };
  }, []);

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </>
  );
};

export default App;
