import { useEffect, useState } from 'react';
import { useToken } from '../context/TokenContext';
import { useNavigate } from 'react-router-dom';
import CheckToken from '../auth/CheckToken';
import Logout from '../components/Logout';
import { Button } from 'primereact/button';
import '../Styles/People.css'

//IMPORTANTE el codigo comentado es para evitar errores y hacer diseño
export default function People() {
  const [people, setPeople] = useState([]);
 
  //const [token, setToken] = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    //pretend to fetch data
    const url = `https://random-data-api.com/api/v2/users?size=10`;
    // let request = new Request(url, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer${token}`,
    //     'Content-type': 'application/json'
    //   }
    // });
    //TODO: include the authentication token in the header
    //TODO: add header for json uploads

    fetch(url) //request
      .then((resp) => {
        if (resp.status === 401) throw new Error('Unauthorized access to API.');
        if (!resp.ok) throw new Error('Invalid response.');
        return resp.json();
      })
      .then((data) => {
        setPeople(
          data.map((item) => ({
            _id: item.uid,
            name: item.first_name + ' ' + item.last_name,
          }))
        );
      })
      .catch((error) => {
        console.warn(error.message);
        //setToken(null);
        // navigate('/');
      });
  }, []);

  return (
    <section>
      {/* <CheckToken/> */}
      {/* <Logout/> */}
      <h2>People List</h2>
      <ul className='list'>
        {people.map((person) => (
          <li key={person._id} user={people}>{person.name}<Button icon="pi pi-user-edit" rounded text raised /><Button icon="pi pi-gift" rounded text raised /></li>
        ))}
      </ul>
    </section>
  );
}

//TODO: add the Logout button
//TODO: add the check for authorization
