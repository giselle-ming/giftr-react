import React from 'react'
import { InputText } from 'primereact/inputtext';
// import '../assets/theme.css';
import '../Styles/AddEditPerson.css'
import "primeicons/primeicons.css"; 
import 'primeflex/primeflex.css';
import { Calendar } from 'primereact/calendar';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useToken } from '../context/TokenContext';
import { useNavigate, useParams } from 'react-router-dom';


function AddEditPerson() {
  const [token, setToken] = useToken();
  const [name, setName] = useState('');
  const [date, setDate] = useState(null);
  const navigate = useNavigate();
  let params = useParams();
  let url = `https://giftr.onrender.com/api/person/${params.id}`;
  let method = 'PUT';
  let subtitle = `Edit ${name}`;
  console.log(params)

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const data = {
      name: name,
      dob: date.toISOString().split('T')[0]
    };

    console.log("token in addPerson:",token);
    fetch(url, {
      method: method,
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

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this person?')) {
      fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          if (resp.ok) {
            console.log('Person deleted successfully');
            navigate('/people');
          } else {
            console.log('Failed to delete person');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
      console.log("token:",token);
      const url = `https://giftr.onrender.com/api/person/${params.id}/`;
      console.log(url)
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json'
        }
      })
        .then((resp) => {
          if (resp.status === 401) throw new Error('Unauthorized access to API.');
          if (!resp.ok) throw new Error('Invalid response.');
          return resp.json();
        })
        .then((data) => {
          setName(data.data.name);
          let d = new Date(data.data.dob)
          setDate(d)
        })
        .catch((error) => {
          console.warn(error.message);
        });
    }, [token, navigate, setToken, params.id, params.idGift]);

  if (!params.id) {
    subtitle = `Add Person`
    method = 'POST';
    url = `https://giftr.onrender.com/api/person/`;
  }

  return (
    <div>
      <h2>{subtitle}</h2>
      <form onSubmit={handleSubmit} className='formPeople flex flex-column gap-4'>
        <div className="card flex justify-content-center gap-3">
            <span className="p-float-label">
                <InputText id="username" value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="username">Name</label>
            </span>
        </div>
        {/* <div className="card flex justify-content-center">
          <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon dateFormat="yy/mm/dd"/>
        </div> */}
        <div className="card flex justify-content-center gap-3">
          <span className="p-float-label">
            <Calendar value={date} onChange={(e) => setDate(e.value)} showButtonBar />
            <label htmlFor="birth_date">Birth Date</label>
          </span>
        </div>
        <div className='flex justify-content-center gap-4'>
        <Button label="Delete" icon="pi pi-delete-left" iconPos="right" severity="warning" onClick={handleDelete}/>
        <Button label="Submit" icon="pi pi-check" iconPos="right" severity='success' type="submit" />
        </div>
      </form>
      
    </div>
  );
}

export default AddEditPerson