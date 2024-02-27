import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Connect from './components/connect_page/Connect';
import Home from './components/home_page/Home';
import ClipLoader from '../../../node_modules/react-spinners/ClipLoader';

import { useConnect, useCanister } from "@connect2ic/react";
import UserDetails from './components/user_details/UserDetails';
import CanisterContext from './components/CanisterContext';

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
  const [canister] = useCanister("socio");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { status } = await canister.checkUser(principal);
        setUserExists(status !== 0n);
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching user data
      }
    };

    if (principal !== undefined) {
      checkUser();
    }
  }, [principal]);

  return (
    <CanisterContext.Provider value={{ canister }}>
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
