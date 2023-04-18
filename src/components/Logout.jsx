import { useNavigate } from 'react-router-dom';
import { useToken } from '../context/TokenContext';

export default function Logout() {
  const navigate = useNavigate();
  const [token, setToken] = useToken();

  function doLogout() {
    // Remove the token from session storage
    sessionStorage.removeItem('Login');

    // Set token to null
    setToken(null);

    // Navigate to the login
    navigate('/');
  }

  return (
    <p>
      <button onClick={doLogout}>Logout</button>
    </p>
  );
}