import React from 'react'
import './App.css'
import { assets } from '../../assets/assets'

const App = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>Feel Better Experience Download <br />Tomato App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default App