import { useEffect, useState } from 'react';
import { useToken } from '../context/TokenContext';
import { useNavigate } from 'react-router-dom';
import CheckToken from '../auth/CheckToken';
import Logout from '../components/Logout';
import { Button } from 'primereact/button';
import '../Styles/People.css'
import { Card } from 'primereact/card';


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
            dob: new Date(person.dob).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            })
          }))
        );
      })
      .catch((error) => {
        console.warn(error.message);
      });
  }, [token, navigate, setToken]);

  return (
    <section>
      <CheckToken />
      <h2>People List</h2>
      <ul className='list'>
        {people.map((person) => (
          <Card key={person._id} title={person.name} className='card'>
            <p className="m-0">{person.dob} </p>
            <Button icon='pi pi-user-edit' rounded text raised />
            <Button icon='pi pi-gift' rounded text raised />
          </Card>
        ))}
      </ul>
    </section>
  );
}
