import React from 'react'
import Input from './Input'
import Messages from './Messages'
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

function Chat() {

  const { data } = useContext(ChatContext);
  console.log(data);

  return (
    <div className='chat'>
      <div className="chat-info">
        {data.user?.displayName}
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat