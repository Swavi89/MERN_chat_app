import React, { useEffect } from 'react'
import { Container, Box, Center, Tab, TabList, Tabs, TabPanels, TabPanel } from '@chakra-ui/react'
import Login from '../components/Auth/Login'
import Signup from '../components/Auth/Signup'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    // const history = useHistory();
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        

    //     if (user) history.push("/chats");
    // }, [history]);
    if (user) navigate("/chats"); 
    }, [navigate]);
    return (
        <Container maxW='xl' centerContent>
            <Box d="flex" justifyContent={"center"} p={3} bg={"white"} w="100%" m="40px 0 15px 0" borderRadius="1g" borderWidth="1px">
                <Center fontSize={"2xl"} color='black' fontFamily='sans-serif'>Open-Chat-app</Center>
            </Box>
            <Box bg={"white"} w={"100%"} p={4} borderRadius="1g" borderWidth="1px"><Tabs variant='soft-rounded'>
                <TabList mb="1em">
                    <Tab width={"50%"}>Login</Tab>
                    <Tab width={"50%"}>Sign UP</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <p><Login /></p>
                    </TabPanel>
                    <TabPanel>
                        <p><Signup/></p>
                    </TabPanel>
                </TabPanels>
            </Tabs></Box>
        </Container>
    )
}

export default HomePage
