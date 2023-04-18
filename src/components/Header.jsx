import React from 'react';
import { Button } from 'primereact/button';
import '../assets/theme.css';
import "primeicons/primeicons.css";                                          
import '../Styles/Header.css'

export default function Header(state) {
  return (
    <div>
        <header>
            <Button icon="pi pi-sign-out" rounded raised/>
                <h1>GIFT APP</h1>
            <Button icon="pi pi-plus" rounded raised/>
        </header>
    </div>
  )
}
