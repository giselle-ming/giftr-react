import React from 'react';
import { Button } from 'primereact/button';
import '../assets/theme.css';
import "primeicons/primeicons.css";                                          
import '../Styles/Header.css'
import Logout from './Logout';

export default function Header(state) {
  return (
    <div>
        <header>
            <Logout/>
                <h1>GIFT APP</h1>
            <Button icon="pi pi-plus" rounded raised/>
        </header>
    </div>
  )
}
