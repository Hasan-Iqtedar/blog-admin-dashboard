import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import '../styles/navigationBar.css';

const NavigationBar = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
    navigate('/', { replace: true });
  };

  return (
    <>
      <div className="navigation-bar">
        <NavLink className="navigation-link" to="/">
          Home
        </NavLink>
        <NavLink className="navigation-link" to="/create-post">
          Create Post
        </NavLink>
        <button className='logout-btn' onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default NavigationBar;
