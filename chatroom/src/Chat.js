import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { Link, useParams } from 'react-router-dom';
import db, { auth } from './firebase';
import firebase from "firebase";
import { useStateValue } from './StateProvider';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid white',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

function SimplePopper() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
}

function Chat() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const [{user}, dispatch] = useStateValue();

    const [seed,setSeed] = useState('');
    const [input, setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot(snapshot =>(
                setRoomName(snapshot.data().name)
            ));
            db.collection('rooms').doc(roomId).collection('messages')
            .orderBy('timestamp', 'asc').onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map(doc => doc.data()))
                );
        }
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() *4000));

    },[roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("YOU TYOED>>>>>", input);
        db.collection("rooms").doc(roomId).collection("messages").add({
            message:input,
            name: user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('');
    }
    
  return <div className='chat'>
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} 
        />
        <div className="chat-headerInfo">
            <h3>{roomName}</h3>
            <p>{new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
        </div>
        <div className="chat-headerRight">
                <IconButton>
                     <SearchOutlinedIcon />
                </IconButton>
                <IconButton>
                     <AttachFileIcon />
                </IconButton>
                <IconButton>
                    <div className='vertIcon'>
                        <button aria-describedby={id} type="button" onClick={handleClick}>
                        <MoreVertIcon className='vertIcon'/>
                        </button>
                        <Popper id={id} open={open} anchorEl={anchorEl}>
                            <div className={classes.paper}><Link to ='/'><button className='signOutBtn' onClick={() => auth.signOut()}>SignOut</button></Link></div>
                        </Popper>
                    </div>
                     
                </IconButton>
        </div>
      </div>
      <div className="chat-body">
          {messages.map(message => (
                    <p className={`chat-message ${message.name === user.displayName && 'chat-reciever'}`}>
                    <span className="chat-name">{message.name}</span>
                    {message.message}
                    <span className="chat-timestamp">
                           {new Date(message.timestamp?.toDate()).toUTCString()}     
                    </span>
                </p>
          ))}
            
      </div>
      <div className="chat-footer">
        {/* <InsertEmoticonIcon /> */}
        <form>
            <input type="text" placeholder='Type a message'
                onChange={e => setInput(e.target.value)}
            />
            <button type='submit' onClick={sendMessage}>Send a message</button>
        </form>
        {/* <MicIcon /> */}
      </div>

  </div>;
}

export default Chat;
