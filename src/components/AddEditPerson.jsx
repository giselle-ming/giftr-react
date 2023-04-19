import React from 'react'
import { InputText } from 'primereact/inputtext';
import Header from './Header';
import '../assets/theme.css';
import "primeicons/primeicons.css"; 
import 'primeflex/primeflex.css';
import { Calendar } from 'primereact/calendar';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { useToken } from '../context/TokenContext';
import { useNavigate } from 'react-router-dom';


function AddEditPerson() {
  const [token, setToken] = useToken();
  const [name, setName] = useState('');
  const [date, setDate] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = (ev) => {
    ev.preventDefault();

    const data = {
      name: name,
      dob: date.toISOString().split('T')[0]
    };

    const url = `https://giftr.onrender.com/api/person`;
    console.log("token in addPerson:",token);
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((resp) => {
        if (resp.ok) {
          console.log('Person added successfully');
          setName('');
          setDate(null);
          navigate('/people');
        } else {
          console.log('Failed to add person');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="card flex justify-content-center">
          <div className="flex flex-column gap-2">
            <label htmlFor="username">Username</label>
            <InputText id="username" aria-describedby="username-help" value={name} onChange={(e) => setName(e.target.value)} />
            <small id="username-help">
              Enter your username to reset your password.
            </small>
          </div>
        </div>
        <div className="card flex justify-content-center">
          <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon />
        </div>
        <Button label="Delete" icon="pi pi-delete-left" iconPos="right" severity="warning" />
        <Button label="Submit" icon="pi pi-check" iconPos="right" severity='success' type="submit" />
      </form>
    </div>
  );
}

export default AddEditPerson