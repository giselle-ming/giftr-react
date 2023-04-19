import React from 'react';
import { OrderList } from 'primereact/orderlist';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToken } from '../context/TokenContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

function Gifts() {
  const [gift, setGifts] = useState([]);
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  let params = useParams();
  
  useEffect(() => {
    console.log("token:",token);
    const url = `https://giftr.onrender.com/api/person/${params.id}`;
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
        setGifts(
          data.data.gifts.map((item) => (
            {_id: item._id,
              txt: item.txt,
              store: item.store,
              url:item.url
          }))
          );
      })
      .catch((error) => {
        console.warn(error.message);
      });
  }, [token, navigate, setToken]);


 
  const itemTemplate = (item) => {

        return (
            <div className="flex flex-wrap p-2 gap-3">
                {/* <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`} alt={item.name} /> */}
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.txt}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{item.store}</span>
                        <span className="text-sm">{item.url}</span>
                    </div>
                    
                </div>
                <Button icon='pi pi-pencil' rounded text raised onClick={(ev) => navigate(`gift/${item._id}`)}/>
                
            </div>
        );
    };
    
    return (
      
        <div className="card xl:flex xl:justify-content-center">
            <OrderList value={gift} onChange={(e) => setGift(e.value)} itemTemplate={itemTemplate} header="Gifts" filter filterBy="txt"></OrderList>
        </div>
    )
}

export default Gifts