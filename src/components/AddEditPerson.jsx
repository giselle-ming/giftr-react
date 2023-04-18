import React from 'react'
import { InputText } from 'primereact/inputtext';
import Header from './Header';
import '../assets/theme.css';
import "primeicons/primeicons.css"; 
import 'primeflex/primeflex.css';
import { Calendar } from 'primereact/calendar';
import { useState } from 'react';
import { Button } from 'primereact/button';
        
        

function AddEditPerson(person) {
  const [date, setDate] = useState(null);
  return (
     <>
    <Header></Header>
    <h2>Nombre</h2>
    <form>
    <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="username">Username</label>
                <InputText id="username" aria-describedby="username-help" />
                <small id="username-help">
                    Enter your username to reset your password.
                </small>
            </div>
            </div>
            <div className="card flex justify-content-center">
            <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon />
        </div>
        <Button label="Delete" icon="pi pi-delete-left" iconPos="right" severity="warning" />
        <Button label="Submit" icon="pi pi-check" iconPos="right" severity='success' />
        </form>
    </>
  )
}

export default AddEditPerson