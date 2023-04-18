import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Gifts from './components/Gifts';
import AddEditPerson from './components/AddEditPerson';
import AddEditGift from './components/AddEditGift';
import Main from './Main';

function App() {

  return (
    <div>
      <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/people' element={<Main></Main>}>
            <Route path='/people/:id/*' element={<Gifts></Gifts>}></Route>
             <Route path='/people/:id/addGift' element={<AddEditGift></AddEditGift>}></Route>
          </Route>
          <Route path='/addPeople' element={<AddEditPerson></AddEditPerson>}></Route>
          </Routes>
      
    </div>
  )
}

export default App
