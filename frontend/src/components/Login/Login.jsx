import React, { useState } from 'react'
import './Login.css'
import {assets} from '../../assets/assets'

const Login = ({setShowLogin}) => {

  const [currState,setCurrState] = useState("Login")

  return (
    <div className='login-popup'>
      <form className="login-container">
        <div className="login-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-inputs">
          {currState==="Login"?<></>:<input type="text" placeholder='Your Name' required />}
          <input aype="email" placeholder='Your email'  required />
          <input type="password" placeholder='Your password' required />
        </div>
        <button>{currState==="Sign Up"?"Create an Account":"Login"}</button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree  to the terms of use & privacy policy</p>
        </div>
        {currState==="Login"
          ?<p>Create a new Accoont? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
          :<p>Already Have an Account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>
        }
      </form>
    </div>
  )
}

export default Login 
