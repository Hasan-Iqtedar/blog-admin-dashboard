import { useState } from 'react';
import Card from './Card';
import '../styles/createPost.css';
import { useNavigate } from 'react-router-dom';

const CreatePost = (props) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [postData, setPostData] = useState('');
  const [err, setErr] = useState(false);

  const updateTitle = (e) => setTitle(e.target.value);
  const updatePostData = (e) => setPostData(e.target.value);
  const updateErr = (err) => setErr(err);

  const submitForm = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + localStorage.token,
      },
      body: JSON.stringify({ title, postData }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.post) {
          navigate('/');
        } else {
          updateErr(true);
        }
      });
  };

  return (
    <>
      {err && <p style={{ 'color:': 'red' }}>Could not create post</p>}
      <Card style={style}>
        <form className="container" onSubmit={submitForm}>
          <input
            type="text"
            required
            placeholder="Title"
            name="title"
            value={title}
            onChange={updateTitle}
          />
          <textarea
            placeholder="Text...."
            required
            name="postData"
            value={postData}
            onChange={updatePostData}
          />
          <button type="submit">Submit</button>
        </form>
      </Card>
    </>
  );
};

const style = {
  margin: 'auto',
  width: '80%',
  height: '80%',
};

export default CreatePost;
