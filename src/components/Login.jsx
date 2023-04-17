import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useToken } from '../context/TokenContext';

function Login() {
  // const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [token, setToken] = useToken();

  // useEffect(() => {
  //   //check for token in querystring
  //   const urlToken = searchParams.get('token');
  //   console.log(urlToken);
  //   if (urlToken) {
  //     setToken(urlToken);
  //     navigate('/people');
  //   }
  //   //check if token already exists in context
  //   if (token) {
  //     navigate('/people');
  //   }
  // }, []);

  // function doLogin() {
  //   //user clicked the login button
  //   const redirect = `http://localhost:5174/`;
  //   const baseURL = `https://render.xyz/api/auth/google?redirect_url=${redirect}`;
  //   //location.href = baseURL;
  //   alert('We are pretending to go to ' + baseURL);
  //   alert('Google will send us back to ' + redirect);
  //   location.href = redirect + '?token=' + crypto.randomUUID();
  // }

  return (
    <div>
      <p>Login</p>
      {/* <button onClick={doLogin}>Login</button> */}
    </div>
  );
}

export default Login;
