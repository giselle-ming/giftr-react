import { useNavigate } from 'react-router-dom';
import { useToken } from '../context/TokenContext';

export default function Logout() {
  const navigate = useNavigate();
  const [token, setToken] = useToken();

  function doLogout() {
    //TODO: nuke the token from context and sessionStorage
    //navigate to the login route
    setToken(null)
    navigate('/');
  }

  return (
    <p>
      <button onClick={doLogout}>Logout</button>
    </p>
  );
}
