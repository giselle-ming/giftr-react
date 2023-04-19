import React from 'react';
import { useParams } from 'react-router-dom';
import { useToken } from '../context/TokenContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

function AddEditGift() {
  const [token, setToken] = useToken();
  const [gift, setGift] = useState('');
  const [urli, setUrli] = useState('');
  const [store, setStore] = useState('');
  const navigate = useNavigate();
  let params = useParams();

 const handleSubmit = (ev) => {
    ev.preventDefault();
    const data = {
      txt: gift,
      store: store,
      url: urli
    };

    const url = `https://giftr.onrender.com/api/person/${params.id}/gift`;
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
          console.log('Gift added successfully');
          setGift('');
          setUrli('');
          setStore('');
          navigate(`/people/${params.id}`);
        } else {
          console.log('Failed to add gift');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
   <div>
    <form onSubmit={handleSubmit}>
      <div className="flex flex-column gap-2">
        <label htmlFor="username">Gift Idea</label>
        <InputText id="username" aria-describedby="gift-help" required value={gift} onChange={(e) => setGift(e.target.value)}/>
        <small id="username-help">Enter the name of the gift</small>
    </div>
    <div className="flex flex-column gap-2">
        <label htmlFor="username">Store</label>
        <InputText id="username" aria-describedby="username-help" value={store} onChange={(e) => setStore(e.target.value)}/>
        <small id="username-help">Enter the name of the store</small>
    </div>
    <div className="flex flex-column gap-2">
        <label htmlFor="username">Url</label>
        <InputText id="username" aria-describedby="username-help" value={urli} onChange={(e) => setUrli(e.target.value)}/>
        <small id="username-help">Enter the name of the url</small>
    </div>
     <Button label="Delete" icon="pi pi-delete-left" iconPos="right" severity="warning" />
        <Button label="Submit" icon="pi pi-check" iconPos="right" severity='success' type="submit" />
      
    </form>
   </div>
    
  )
}

export default AddEditGift