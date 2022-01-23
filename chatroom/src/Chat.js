import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';

function Chat() {

    const [seed,setSeed] = useState('');
    const [input, setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot(snapshot =>(
                setRoomName(snapshot.data().name)
            ))
        }
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() *4000));

    },[roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("YOU TYOED>>>>>", input);
        setInput('');
    }
    
  return <div className='chat'>
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} 
        />
        <div className="chat-headerInfo">
            <h3>{roomName}</h3>
            <p>Last Seen...</p>
        </div>
        <div className="chat-headerRight">
                <IconButton>
                     <SearchOutlinedIcon />
                </IconButton>
                <IconButton>
                     <AttachFileIcon />
                </IconButton>
                <IconButton>
                     <MoreVertIcon />
                </IconButton>
        </div>
      </div>
      <div className="chat-body">
            <p className={`chat-message ${true && 'chat-reciever'}`}>
                <span className="chat-name">Shubhang Sharma</span>
                Hey Guys
                <span className="chat-timestamp">3:18pm</span>
            </p>
      </div>
      <div className="chat-footer">
        <InsertEmoticonIcon />
        <form>
            <input type="text" placeholder='Type a message'
                onChange={e => setInput(e.target.value)}
            />
            <button type='submit' onClick={sendMessage}>Send a message</button>
        </form>
        <MicIcon />
      </div>

  </div>;
}

export default Chat;
