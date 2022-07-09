import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { URL } from '../constants/utils';
import '../styles/home.css';

const Home = ({ posts, updatePosts }) => {
  const navigate = useNavigate();

  const togglePublish = (e) => {
    const postIndex = posts.findIndex((ele) => ele._id === e.target.value);
    const post = posts[postIndex];
    const data = post;

    data.published = post.published ? false : true;
    data.publish_date = post.publish_date;

    fetch(URL + `/posts/${post._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: 'bearer ' + localStorage.token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.post) {
          const updatedPosts = [...posts];
          updatedPosts[postIndex] = data;

          updatePosts(updatedPosts);
        }
      });
  };

  const updatePost = (e) => {
    const postIndex = posts.findIndex(
      (element) => element._id === e.target.value
    );
    const post = posts[postIndex];

    navigate('/update-post/' + post._id, { state: { post, postIndex } });
  };

  const deletePost = (e) => {
    const id = e.target.value;
    fetch(URL + `/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: 'bearer ' + localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.message) {
          const updatedPosts = posts.filter((ele) => ele._id !== id);
          updatePosts(updatedPosts);
        }
      });
  };

  return (
    <>
      {posts.map((post) => {
        return (
          <Card key={post._id} style={style}>
            <h2>{post.title}</h2>
            <div className="button-container">
              <button
                className="btn-green"
                value={post._id}
                onClick={togglePublish}
              >
                {post.published ? 'Unpublish' : 'Publish'}
              </button>
              <button
                className="btn-blue"
                value={post._id}
                onClick={updatePost}
              >
                Update
              </button>
              <button className="btn-red" value={post._id} onClick={deletePost}>
                Delete
              </button>
            </div>
          </Card>
        );
      })}
    </>
  );
};

const style = {
  margin: 'auto',
  padding: '5px',
  textAlign: 'center',
  marginBottom: '30px',
};

export default Home;
