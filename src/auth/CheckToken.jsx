import { useToken } from "../context/TokenContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckToken() {
  //TODO: see if the person is logged in and allowed to be viewing a component
  //or redirect to the login page
  const [token, setToken] = useToken();
  const navigate = useNavigate();

useEffect(()=> {
  if(!token) navigate('/');
}, [])

  return null;
}
