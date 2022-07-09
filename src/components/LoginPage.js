import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import Card from './Card';
import Header from './Header';
import { URL } from '../constants/utils';

import '../styles/loginPage.css';

const LoginPage = (props) => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);

  const updateUserName = (e) => setUserName(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const login = (e) => {
    e.preventDefault();
    fetch(URL + '/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem('token', data.user);
          localStorage.setItem('user', true);
          auth.login(true);
          navigate('/', { replace: true });
          setErr(false);
          return;
        } else {
          setErr(true);
          auth.logout();
        }
      });
  };

  return (
    <div className="login-page">
      <Header>
        <h1>Blog - Login to Dashboard</h1>
      </Header>
      <Card>
        <form className="login-form" onSubmit={login}>
          <input
            type="text"
            name="username"
            value={username}
            required
            placeholder="username"
            onChange={updateUserName}
          />
          <input
            type="password"
            name="password"
            value={password}
            required
            placeholder="password"
            onChange={updatePassword}
          />
          <button type="submit">Login</button>
        </form>
      </Card>
      {err && <p style={{ color: 'red' }}>Incorrect username or password</p>}
    </div>
  );
};

export default LoginPage;
