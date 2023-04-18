import React from 'react'
import { InputText } from 'primereact/inputtext';
import Header from './Header';
import '../assets/theme.css';
import "primeicons/primeicons.css"; 

function AddEditPerson(person) {
  return (
     <>
    <Header></Header>
    <h2>Nombre</h2>
            <div className="flex flex-column gap-2">
                <label htmlFor="username">Username</label>
                <InputText id="username" aria-describedby="username-help" />
                <small id="username-help">
                    Enter your username to reset your password.
                </small>
            </div>
        
    </>
  )
}

export default AddEditPerson