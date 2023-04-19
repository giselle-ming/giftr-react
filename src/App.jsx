import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Gifts from './components/Gifts';
import AddEditPerson from './components/AddEditPerson';
import AddEditGift from './components/AddEditGift';
import FourOhFour from './components/FourOhFour';
import People from './components/People';
import Header from './components/Header'

function App() {

  return (
    <div>
    <Header></Header>
      <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/people' element={<People></People>}></Route>
          <Route path='/people/addPeople' element={<AddEditPerson></AddEditPerson>}></Route>
          <Route path='/people/:id/addPeople' element={<AddEditPerson></AddEditPerson>}></Route>
          <Route path='/people/:id/*' element={<Gifts></Gifts>}></Route>
          <Route path='/people/:id/addGift' element={<AddEditGift></AddEditGift>}></Route>
          <Route path='*' element={<FourOhFour></FourOhFour>}></Route>
          </Routes>
      
    </div>
  )
}

export default App
