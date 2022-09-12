import React from 'react';
import Add from '../images/add-image.png';
import Logo from '../images/messenger-logo.svg'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase.js'
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];


    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);


      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate('/');
          });
        }
      );

    }
    catch {
      setError(true);
    }
  }

  return (
    <div className='form'>
      <div className='form-container'>
        <img src={Logo} alt="Logo"></img>
        <h1>Zarejestruj się</h1>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='nazwa użytkownika...'></input>
          <input type='email' placeholder='email...'></input>
          <input type='password' placeholder='hasło...'></input>
          <input style={{ display: "none" }} type='file' id='file'></input>
          <label htmlFor='file'>
            <img src={Add} alt='Add'></img>
            <p>Dodaj zdjęcie profilowe</p>
          </label>
          <button>Zarejestruj się</button>
          {error && <p style={{ color: "red" }}>Coś poszło nie tak...</p>}
        </form>
        <p>Masz już konto? <Link to='/login'>Zaloguj się</Link></p>
      </div>
    </div>
  )
}

export default Register