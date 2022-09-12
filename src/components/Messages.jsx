import React from 'react'
import Message from './Message'
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';

function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    })

    return () => {
      unsub()
    }
  }, [data.chatId])

  console.log(messages)

  return (
    <div className='messages'>
      {messages.map(m => {
        return <Message message={m} key={m.id} />
      })}
    </div>
  )
}

export default Messages