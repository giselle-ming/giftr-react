import React from 'react';
import { OrderList } from 'primereact/orderlist';
import { useState } from 'react';

function Gifts() {
  const [products, setProducts] = useState([]);

  const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`} alt={item.name} />
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.name}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{item.category}</span>
                    </div>
                </div>
                <span className="font-bold text-900">${item.price}</span>
            </div>
        );
    };
    
    return (
        <div className="card xl:flex xl:justify-content-center">
            <OrderList value={products} onChange={(e) => setProducts(e.value)} itemTemplate={itemTemplate} header="Products" filter filterBy="name"></OrderList>
        </div>
    )
}

export default Gifts