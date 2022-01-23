import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';

function Chat() {

    const [seed,setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() *4000));

    },[]);
    
  return <div className='chat'>
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} 
        />
        <div className="chat-headerInfo">
            <h3>Room name</h3>
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

      </div>

  </div>;
}

export default Chat;
