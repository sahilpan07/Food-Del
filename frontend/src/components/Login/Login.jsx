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

/*import React, { useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';

const Login = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Login');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkPasswordsMatch(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    checkPasswordsMatch(password, e.target.value);
  };

  const checkPasswordsMatch = (password, confirmPassword) => {
    setPasswordsMatch(password === confirmPassword);
  };

  return (
    <div className='login-popup'>
      <div className='login-container'>
        <div className='login-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='Close' />
        </div>
        <form className='login-inputs'>
          {currState === 'Sign Up' && (
            <>
              <input
                type='text'
                placeholder='Your Name'
                required
              />
              <input
                type='password'
                placeholder='Your password'
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <input
                type='password'
                placeholder='Confirm your password'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {!passwordsMatch && <p className='error-message'>Passwords do not match</p>}
            </>
          )}
          {currState === 'Login' && (
            <>
              <input type='email' placeholder='Your email' required />
              <input type='password' placeholder='Your password' required />
            </>
          )}
          <button type='submit'>
            {currState === 'Sign Up' ? 'Create an Account' : 'Login'}
          </button>
        </form>
        <div className='login-condition'>
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        <p>
          {currState === 'Login'
            ? <>Create a new Account? <span onClick={() => setCurrState('Sign Up')}>Click Here</span></>
            : <>Already Have an Account? <span onClick={() => setCurrState('Login')}>Login Here</span></>}
        </p>
      </div>
    </div>
  );
};

export default Login; */
