import { useState } from 'react';
import Card from './Card';
import '../styles/createPost.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { URL } from '../constants/utils';

const PostForm = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { postId } = useParams();

  const [title, setTitle] = useState(state ? state.post.title : '');
  const [content, setContent] = useState(state ? state.post.content : '');
  const [err, setErr] = useState(false);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value);
  const updateErr = (err) => setErr(err);

  const submitForm = (e) => {
    e.preventDefault();
    const url = !postId ? URL + '/posts' : URL + `/posts/${postId}`;

    const data = {
      title: title,
      content: content,
      published: state ? state.post.published : false,
      publish_date: state ? state.post.publish_date : null,
    };

    if (state) {
      data._id = state.post._id;
    }

    fetch(url, {
      method: props.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + localStorage.token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.post) {
          let updatedPosts;

          //If updating.
          if (props.method === 'PUT') {
            updatedPosts = [...props.posts];
            updatedPosts[state.postIndex] = data;
          }
          //If creating.
          else {
            data._id = resData.post;
            updatedPosts = [...props.posts, data];
          }

          props.updatePosts(updatedPosts);
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
            value={content}
            onChange={updateContent}
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

export default PostForm;
