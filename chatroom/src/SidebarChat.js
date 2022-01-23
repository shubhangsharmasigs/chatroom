import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import './SidebarChat.css';

function SidebarChat({addNewChat,id,name}) {

    const [seed,setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() *4000));

    },[]);

    const createChat = () => {
            const roomName = prompt("Please enetr a name for chatroom");

            if(roomName){
                // do some databse stuff
                db.collection("rooms").add({
                    name:roomName,
                })
            }
    };

  return !addNewChat ? (<div className='sidebarChat'>
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
      />
      <div className="sidebarChat-info">
          <h2>{name}</h2>
          <p>Last message...</p>
      </div>

  </div>
  ):(
      <div onClick={createChat}
      className='sidebarChat'>
        <h2>Add new Chat</h2>
        </div>
  );
}

export default SidebarChat;
