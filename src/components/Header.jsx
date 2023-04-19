import React from 'react';
import { Button } from 'primereact/button';
import '../assets/theme.css';
import "primeicons/primeicons.css";                                          
import '../Styles/Header.css'
import Logout from './Logout';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const addPerson = () => {
    navigate(`people/addPeople`);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <header>
        {location.pathname === '/' ? null : (
          location.pathname === '/people' ? <Logout/> : <Button icon="pi pi-arrow-left" rounded raised onClick={goBack}/>
        )}
        <h1>GIFT APP</h1>
        {location.pathname !== '/' && location.pathname !== '/people/addPeople' ? <Button icon="pi pi-plus" rounded raised onClick={addPerson}/> : null}
      </header>
    </div>
  )
}
