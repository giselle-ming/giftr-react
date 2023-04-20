import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useToken } from '../context/TokenContext';
import '../Styles/Login.css';
import { Button } from 'primereact/button';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useToken();
  const [option, setOption] = useState('home');

  useEffect(() => {
    // check for token in querystring
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
      navigate('/people');
    }
    console.log(urlToken)
    // check if token already exists in context
    if (token) {
      navigate('/people');
    }
  }, []);

function doLogin() {
  const redirect = `http://localhost:5173/`;
  const baseURL = `https://giftr.onrender.com/auth/google?redirect_url=${redirect}`; //callback

  location.href = baseURL;

  addEventListener('message', async (event) => {
    if (event.origin === 'https://giftr.onrender.com') {
      const { token } = event.data;
      sessionStorage.setItem(token);
      navigate(redirect);
    }
  });
}

  return (
    <div className='logIn'>
      <p>Login</p>
      <Button label="Log In" icon="pi pi-sign-in" onClick={doLogin} />
      {/* <button onClick={doLogin}>Login</button> */}
      {/* <Button label="Log In" icon="pi pi-sign-in" /> */}
    </div>
  );
}

export default Login;