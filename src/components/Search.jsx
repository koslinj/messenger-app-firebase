import React from 'react';
import { useState } from 'react';
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext"

function Search() {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size < 1) {
        setError(true);
      }
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    }
    catch {
      setError(true);
    }
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        })
      }
    }
    catch {
      console.log('error po kliknieciu na uzytkownika w search')
    }
    setUser(null);
    setUsername("");
  }

  return (
    <div className="search">
      <div className="search-form">
        <input type="text" placeholder='wyszukaj...' value={username} onKeyDown={(e) => { handleKey(e); setError(false) }} onChange={(e) => setUsername(e.target.value)} />
      </div>
      {error && <div style={{ padding: "12px", fontSize: "14px" }}>Nie ma takiego użytkownika...</div>}
      {user && <div className="user-chat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="user-chat-info">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search