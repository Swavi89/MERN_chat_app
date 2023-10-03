import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassowrd] = useState();
    const [password, setPassword] = useState();
    const [loading,setLoading]= useState();
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => setShow(!show);

    const submitHandler = async() => {
        setLoading(true);
        if(!name || !email || !password || !confirmpassword){
            toast({
               title: "Please fill all the fields",
               status:"warning",
               duration: 5000,
               isClosable : true,
               position: "bottom",
            })
            setLoading(false);
            return;
        }

        if(password !== confirmpassword){
            toast({
               title: "password doesnot match",
               status:"warning",
               duration: 5000,
               isClosable : true,
               position: "bottom",
            })
        }

        try {
            const config = {
                headers: {
                    "Content-type":"application/json",
                }
            }
            const {data} = await axios.post("/api/user",{name,email,password},
            config
            );
            toast({
               title: "Registration Successful",
               status:"success",
               duration: 5000,
               isClosable : true,
               position: "bottom", 
            })

            localStorage.setItem('userInfo',JSON.stringify(data));

            setLoading(false);
           navigate('/chats')
        } catch (error) { 
            toast({
               title: "Error Occured",
               description : error.response.data.message,
               status:"error",
               duration: 5000,
               isClosable : true,
               position: "bottom",     
               })      
        }

    };

  return (
    <VStack spacing={"10px"} >
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
              <Input focusBorderColor='blue'
                  isInvalid
                  errorBorderColor='tomato'
            placeholder='Enter Your Name'
            onChange={(e)=> setName(e.target.value)}
            />
        </FormControl>

          <FormControl id='email' isRequired>
              <FormLabel>Email</FormLabel>
              <Input focusBorderColor='blue'
                  isInvalid
                  errorBorderColor='tomato'
                  placeholder='Enter Your Email'
                  onChange={(e) => setEmail(e.target.value)}
              />
          </FormControl>

          <FormControl id='password' isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                  <Input focusBorderColor='blue'
                      isInvalid
                      errorBorderColor='tomato'
                      type={show ? "text" : "password"}
                      placeholder='Password'
                      onChange={(e) => setPassword(e.target.value)}
                  /><InputRightElement width={"4.5rem"}>
                    <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                  </InputGroup>
          </FormControl>

          <FormControl id='password' isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                  <Input focusBorderColor='blue'
                      isInvalid
                      errorBorderColor='tomato'
                      type={show ? "text" : "password"}
                      placeholder='Confirm password'
                      onChange={(e) => setConfirmpassowrd(e.target.value)}
                  /><InputRightElement width={"4.5rem"}>
                      <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                      </Button>
                  </InputRightElement>
              </InputGroup>
          </FormControl>

          <Button colorScheme='blue' width={"100%"} style={{marginTop:15}} onClick={submitHandler} isLoading={loading}>
          SignUp
          </Button>

    </VStack>
  )
}

export default Signup
