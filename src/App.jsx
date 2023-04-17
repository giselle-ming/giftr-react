import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Main from './Main';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/people' element={<Main></Main>}></Route>
          </Routes>
      
    </div>
  )
}

export default App
