import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from './firebase';
import './SidebarChat.css';

function SidebarChat({addNewChat,id,name}) {

    const [seed,setSeed] = useState('');
    const [messages, setMessages] = useState("");

    useEffect(() => {
      if(id){
        db.collection("rooms")
          .doc(id)
          .collection("messages")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => 
            setMessages(snapshot.docs.map((doc) => doc.data()))
          )
      }
    },[id]);

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

  return !addNewChat ? (
    <Link to ={`/rooms/${id}`}>
      <div className='sidebarChat'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
            />
            <div className="sidebarChat-info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>

         </div>
    </Link>
  
  ):(
      <div onClick={createChat}
      className='sidebarChat'>
        <h2>Add new Chat</h2>
        </div>
  );
}

export default SidebarChat;
