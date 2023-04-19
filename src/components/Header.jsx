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

  if (location.pathname === '/') {
    return (
      <div>
        <header>
          <h1>GIFT APP</h1>
        </header>
      </div>
    )
  } else if (location.pathname === '/people') {
    return (
      <div>
        <header>
          <Logout />
          <h1>GIFT APP</h1>
          <Button icon="pi pi-plus" rounded raised onClick={addPerson}/>
        </header>
      </div>
    )
  } 
  else  {
    return (
      <div>
        <header>
          <Button icon="pi pi-arrow-left" rounded raised onClick={(ev) => navigate(`/people`)}/>
          <h1>GIFT APP</h1>
        </header>
      </div>
    )
  }
}
