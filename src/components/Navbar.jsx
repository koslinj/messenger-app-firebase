import React from 'react';
import Logo from '../images/messenger-logo.svg';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar() {

  const {currentUser} = useContext(AuthContext);

  return (
    <div className="navbar">
      <img className='logo' src={Logo} alt="Logo" />
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Wyloguj</button>
      </div>
    </div>
  )
}

export default Navbar