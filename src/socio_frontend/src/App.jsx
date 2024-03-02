import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Connect from './components/connect_page/Connect';
import Home from './components/home_page/Home';
import Loading from './components/Loading/Loading';

import { useConnect, useCanister } from "@connect2ic/react";
import UserDetails from './components/user_details/UserDetails';
import CanisterContext from './components/CanisterContext';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [connected, setConnected] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const { isConnected, principal } = useConnect({
    onConnect: () => {
      console.log("connected");
    },
    onDisconnect: () => {
      console.log("disconnected");
    }
  });
  const [canister] = useCanister("socio", { mode: "anonymous" });

  useEffect(() => {
    setConnected(isConnected);
    async function checkForUser() {
      setLoading(true);
      setLoadingMessage("Checking if user already exists...");
      const { status } = await canister.checkUser(principal);
      if (status === 0n) {
        setUserExists(false);
      } else {
        setUserExists(true);
      }
      setLoading(false);
      setLoadingMessage(null);
    }
    if (isConnected) {
      checkForUser();
    }
  }, [isConnected]);

  return (
    <CanisterContext.Provider value={{ canister, principal, setUserExists, setProfileEdit }}>
      <div id="app">
        {loading ? (
          <Loading loadingText={loadingMessage} /> // Always show the loader while fetching data
        ) : connected ? (
          userExists ? (
            <Router>
              <Home setConnected={setConnected} />
            </Router>
          ) : (
            profileEdit ? (
              <UserDetails setLoading={setLoading} setLoadingMessage={setLoadingMessage} edit={true} />
            ) : (
              <UserDetails setLoading={setLoading} setLoadingMessage={setLoadingMessage} />
            )
          )
        ) : (
          <Connect />
        )}
      </div>
    </CanisterContext.Provider>
  );
}
