import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListitem from '../UserAvatar/UserListitem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUser, setSelectedUser] = useState([]);
    const [search, setSearch] = useState("");
    const [searchresult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const {user,chats,setChats} = ChatState();

    const handleSearch = async (query) => {
        setSearch(query)
        if(!query){
            return;
        }
        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization : `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get(`/api/user?search=${search}`,config)
            console.log(data);
            setLoading(false)
            setSearchResult(data);
        } catch (error) {
            toast({
               title: "Error Occured",
               description: "Failed to load the search result",
               status: "error",
               duration: 5000,
               isClosable : true,
               position: "bottom-left", 
            });
        }
    }
    const handleSubmit= async () => {
        if(!groupChatName || !selectedUser){
              toast({
               title: "Please fill all the field ",
               status: "warning",
               duration: 5000,
               isClosable : true,
               position: "top", 
            });
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization : `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.post('/api/chat/group',{
                name:groupChatName,
                users:JSON.stringify(selectedUser.map((u) => u._id))
            },config);
            setChats([data,...chats]);
            onClose();
              toast({
               title: "New Group Chat Created ",
               status: "success",
               duration: 5000,
               isClosable : true,
               position: "bottom", 
            });
        } catch (error) {
              toast({
               title: "Failed to create the chat ",
               description: error.response.data,
               status: "warning",
               duration: 5000,
               isClosable : true,
               position: "bottom-left", 
            });
        }
    };


    const handleDelete= (deleteUser) => {
        setSelectedUser(selectedUser.filter
            (sel => sel._id !== deleteUser._id))
    };

    const handleGroup= (userToAdd) => {
        if(selectedUser.includes(userToAdd)){
             toast({
               title: "User already added",
               status: "error",
               duration: 5000,
               isClosable : true,
               position: "top", 
            });
            return
        }
        setSelectedUser([...selectedUser,userToAdd])
    };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"35px"} fontFamily={"sans-serif"}
          display={"flex"} justifyContent={"center"}>Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"}>
           <FormControl>
            <Input placeholder='Chat Name' mb={3} 
            onChange ={(e) =>setGroupChatName(e.target.value)}/>
           </FormControl>
            <FormControl>
            <Input placeholder='Add Users' mb={1} 
            onChange ={(e) => handleSearch(e.target.value)}/>
           </FormControl>

           <Box w={"100%"} display={"flex"} flexWrap={"wrap"}>
           {selectedUser.map(u => (
            <UserBadgeItem key={user._id} 
            user={u} 
            handleFunction={()=>handleDelete(u)}/>
           ))}</Box>

           {loading ? <div>loading</div> :(
            searchresult?.slice(0,4).map((user) => (
                <UserListitem key={user._id}
                 user={user} 
                 handleFunction={() => handleGroup(user)}/>
            ))
            )} 
          

          </ModalBody>
          
          <ModalFooter>
            <Button colorScheme='blue'  onClick={handleSubmit}>
              Create Chat
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal