import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'

const App = () => {
  return (
    <div>
      <div className="app">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={}
        </Routes>
      </div>
    </div>
  )
}

export default App