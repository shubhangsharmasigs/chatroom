import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import {Avatar, IconButton} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from './firebase';


function Sidebar() {

    const [rooms,setRooms] = useState([]);

    useEffect(()=> {
        const unsubscribe = db.collection("rooms").onSnapshot(snapshot =>(
            setRooms(snapshot.docs.map(doc => 
                ({
                    id: doc.id,
                    data: doc.data(),
                })
                ))
        ))

        return ()=> {
           unsubscribe(); 
        }

    },[])

  return ( <div className='sidebar'>
        
        <div className="sidebar-header">
            <Avatar />
            <div className="sidebar-headerRight">
                <IconButton>
                     <DonutLargeIcon />
                </IconButton>
                <IconButton>
                     <ChatIcon />
                </IconButton>
                <IconButton>
                     <MoreVertIcon />
                </IconButton>
                
                
                
            </div>

        </div>

        <div className="sidebar-search">
            <div className="sidebar-searchContainer">
                <SearchOutlinedIcon />
                <input placeholder='Search or start new chat' type='text' />
            </div>
            
        </div>

        <div className="sidebar-chats">
            <SidebarChat addNewChat />
            {rooms.map(room => (
                <SidebarChat key ={room.id} id ={room.id}
                    name= {room.data.name} />
            ))}
            

        </div>
  </div>
  );
}

export default Sidebar;
