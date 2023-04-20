import {useRef} from 'react'
import { useParams } from 'react-router-dom';
import { useToken } from '../context/TokenContext';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import 'primeflex/primeflex.css';  
import '../Styles/AddEditGift.css';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { confirmPopup } from 'primereact/confirmpopup';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

function AddEditGift() {
  const [token, setToken] = useToken();
  const [gift, setGift] = useState('');
  const [urli, setUrli] = useState('');
  const [store, setStore] = useState('');
  const navigate = useNavigate();
  let params = useParams();
  const toast = useRef(null);

  const accept = () => {
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Gift deleted', life: 3000 });
    fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((resp) => {
        console.log(url)
        if (resp.ok) {
          console.log('Gift deleted successfully');
          navigate(`/people/${params.id}/gifts`);
        } else {
          console.log('Failed to delete gift');
        }
      })
      .catch((error) => {
        console.error(error);
      });
    
  }
  const reject = () => {
        // toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

  let url = `https://giftr.onrender.com/api/person/${params.id}/gift/${params.idGift}`;
  let method = 'PUT';
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const data = {
      txt: gift,
      store: store,
      url: urli
    };
    
    console.log("token in editGift:",token);
    console.log(method)
    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((resp) => {
        console.log(url)
        if (resp.ok) {
          console.log('Gift added successfully');
          setGift('');
          setUrli('');
          setStore('');
          navigate(`/people/${params.id}/gifts`);
        } else {
          console.log('Failed to add gift');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleDeleteGift = (ev) => {
    ev.preventDefault();
    confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        });
  }

  useEffect(() => {
    console.log("token:",token);
    const url = `https://giftr.onrender.com/api/person/${params.id}/gift/${params.idGift}`;
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
        console.log('data')
        console.log(data)
        setGift(data.data.txt);
        setStore(data.data.store);
        setUrli(data.data.url);
      })
      .catch((error) => {
        console.warn(error.message);
      });
  }, [token, navigate, setToken, params.id, params.idGift]);

  if (!params.idGift) {
    method = 'POST';
    url = `https://giftr.onrender.com/api/person/${params.id}/gift/`;
  }
  
  return (
  <div className='bgForm'>
    <form onSubmit={handleSubmit} className='flex flex-column gap-4'>
      <div className="card flex justify-content-center gap-3">
            <span className="p-float-label">
                <InputText id="gift" value={gift} onChange={(e) => setGift(e.target.value)} />
                <label htmlFor="gift">Gift Idea</label>
            </span>
        </div>
      <div className="card flex justify-content-center gap-3">
            <span className="p-float-label">
                <InputText id="store" value={store} onChange={(e) => setStore(e.target.value)} />
                <label htmlFor="store">Store</label>
            </span>
        </div>
      <div className="card flex justify-content-center gap-3">
            <span className="p-float-label">
                <InputText id="url" value={urli} onChange={(e) => setUrli(e.target.value)} />
                <label htmlFor="url">Url Store</label>
            </span>
        </div>
        <div className='flex justify-content-center gap-4'>
          <Toast ref={toast} />
          <ConfirmPopup />
        <Button label="Delete" className="p-button-danger" icon="pi pi-delete-left" iconPos="right" onClick={handleDeleteGift}/>
        <Button label="Submit" icon="pi pi-check" iconPos="right" severity='success' type="submit" />
        </div>
    </form>

  </div>
  )
}

export default AddEditGift