import { useEffect, useState } from 'react';
import { useToken } from '../context/TokenContext';
import { useNavigate } from 'react-router-dom';
import CheckToken from '../auth/CheckToken';
import { Button } from 'primereact/button';
import '../Styles/People.css'
import { Card } from 'primereact/card';
import { Tooltip } from 'primereact/tooltip';
        


export default function People() {
  const [people, setPeople] = useState([]);
  const [token, setToken] = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("token:",token);
    const url = `https://giftr.onrender.com/api/person`;
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
        console.log(data.data)
        setPeople(
          data.data.map((person) => (
            {
            _id: person._id,
            name: person.name,
            dob: new Date(person.dob).toLocaleDateString('en-CA', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              timeZone: 'UTC'
            })
          }))
        );
      })
      .catch((error) => {
        console.warn(error.message);
      });
  }, [token, navigate, setToken]);


  const editPerson = (id) => {
    navigate(`/people/${id}/addPeople`);
  };

  const addGift = (id) => {
    navigate(`/people/${id}/gifts`)
  };


  return (
    <section>
      <CheckToken />
      <h2>People List</h2>
      <ul className='list'>
        {people.map((person) => (
          <Card key={person._id} title={person.name} className='cardP'>
            <div className='flex flex-row gap-3 justify-content-between align-items-center p-0'>
            <p className="m-0 p-0">{person.dob} </p>
            <div className='flex gap-4'>
            <Button icon='pi pi-user-edit' rounded severity="secondary" raised onClick={(ev) => navigate(`/people/${person._id}/addPeople`)}/>
            <Button icon='pi pi-gift' className='btn' rounded severity="secondary" raised onClick={(ev) => navigate(`/people/${person._id}/gifts`)}/>
            </div>
            </div>
          </Card>
        ))}
          
      </ul>
    </section>
  );
}
