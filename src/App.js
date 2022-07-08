import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';

const App = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('App mounting\n_________________');
    if (!localStorage.token) {
      navigate('/login', { replace: true });
    }
    return () => {
      console.log('App unmounting\n______________');
      // localStorage.removeItem('token');
    };
  }, []);

  return (
    <>
      <Dashboard />
    </>
  );
};

export default App;
