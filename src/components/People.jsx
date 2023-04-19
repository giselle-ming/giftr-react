import { useEffect, useState } from 'react';
import { useToken } from '../context/TokenContext';
import { useNavigate } from 'react-router-dom';
import CheckToken from '../auth/CheckToken';
import Logout from '../components/Logout';
import { Button } from 'primereact/button';
import '../Styles/People.css';

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
        setPeople(
          data.data.map((person) => (
            {
            _id: person._id,
            name: person.name,
            dob: person.dob
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
      <Logout />
      <h2>People List</h2>
      <ul className='list'>
        {people.map((person) => (
          <li key={person._id}>
            {person._id} {person.name} {person.dob} 
            <Button icon='pi pi-user-edit' rounded text raised />
            <Button icon='pi pi-gift' rounded text raised />
          </li>
        ))}
      </ul>
    </section>
  );
}
