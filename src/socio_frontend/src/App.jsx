import React,{useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Connect from './components/connect_page/Connect';
import Home from './components/home_page/Home';

import { useConnect } from "@connect2ic/react";

export default function App() {
  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: () => {
      console.log(principal);
    },
    onDisconnect: () => {
      console.log("disconnected");
    }
  });

  useEffect(() => {
    console.log(principal);
  }, [principal]);

  return (
    isConnected
    ? 
    <Router>
      <div id="app">
        <Home />
      </div>
    </Router>
    : <Connect isConnected={isConnected} />
  );
}