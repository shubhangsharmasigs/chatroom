import React from 'react';
import './Sidebar.css';
import {Avatar, IconButton} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';


function Sidebar() {
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
            <SidebarChat />
            <SidebarChat />
            <SidebarChat />
            

        </div>
  </div>
  );
}

export default Sidebar;
