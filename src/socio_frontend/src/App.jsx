import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Connect from './components/connect_page/Connect';
import Home from './components/home_page/Home';
import ClipLoader from '../../../node_modules/react-spinners/ClipLoader';

import { useConnect, useCanister } from "@connect2ic/react";
import UserDetails from './components/user_details/UserDetails';
import CanisterContext from './components/CanisterContext';
import { canisterId } from '../../declarations/socio_backend/index';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(null);
  const { isConnected, principal } = useConnect({
    onConnect: () => {
      console.log("connected");
    },
    onDisconnect: () => {
      console.log("disconnected");
    }
  });
  const [canister] = useCanister("socio",{mode: "anonymous"});

  useEffect(() => {
    async function checkForUser(){
      setLoading(true);
      const {status} = await canister.checkUser(principal);
      if(status === 0n){
        setUserExists(false);
      } else {
        setUserExists(true);
      }
      setLoading(false);
    }
    if(isConnected){
      checkForUser();
    }
  }, [isConnected]);

  return (
    <CanisterContext.Provider value={{ canister,principal }}>
      <div id="app">
        {loading ? (
          <ClipLoader /> // Always show the loader while fetching data
        ) : isConnected ? (
          userExists ? (
            <Router>
              <Home />
            </Router>
          ) : (
            <UserDetails setUserExists={setUserExists} setLoading={setLoading} />
          )
        ) : (
          <Connect />
        )}
      </div>
    </CanisterContext.Provider>
  );
}
