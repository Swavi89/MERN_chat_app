import React from 'react';
import{BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ChakraProvider} from '@chakra-ui/react'
import ChatProvider from './Context/ChatProvider'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ChatProvider>
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </ChatProvider>
  </BrowserRouter>
  </React.StrictMode>,
document.getElementById('root')
  
);

