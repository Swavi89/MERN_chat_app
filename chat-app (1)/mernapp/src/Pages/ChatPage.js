// import React, { useEffect,useState } from 'react'

import { Box } from "@chakra-ui/react"
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChat from "../components/MyChat";
import ChatBox from "../components/ChatBox";
import { useState } from "react";

// import axios from 'axios'
const ChatPage = () => {
  const { user } = ChatState()
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{width:'100%'}}>
      {user && <SideDrawer />}
      <Box display='flex' justifyContent={'space-between'}
       width='100%' height='91.5vh' padding='10px'>
        {user && <MyChat fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>


    </div>
  )

  //   const [chats, setchats] = useState([])

  //    const fetchChats = async() => {
  //   const {data} = await axios.get('/api/chat')

  //       setchats(data);
  //   }

  //   useEffect(() => {
  //   fetchChats();
  //   }, [])
    
  //  return (
  //    <div>
  //      {chats.map((chat) => (
  //        <div key={chat._id}>{chat.chatName}</div>
  //      ))}
  //    </div>
  //  )
}

export default ChatPage;
