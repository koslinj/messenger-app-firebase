import React from 'react'
import Logo from '../images/messenger-logo.svg'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js"


function Login() {

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    }
    catch {
      setError(true);
    }
  }

  return (
    <div className='form'>
      <div className='form-container'>
        <img src={Logo} alt="Logo"></img>
        <h1>Zaloguj się</h1>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='email...'></input>
          <input type='password' placeholder='hasło...'></input>
          <button>Zaloguj się</button>
          {error && <p style={{ color: "red" }}>Coś poszło nie tak...</p>}
        </form>
        <p>Nie masz jeszcze konta? <Link to='/register'>Zarejestruj się</Link></p>
      </div>
    </div>
  )
}

export default Login