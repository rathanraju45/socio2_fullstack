import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";

import * as socio from "../../declarations/socio_backend";

import { defaultProviders } from "@connect2ic/core/providers";
import { createClient } from "@connect2ic/core";
import { Connect2ICProvider, useConnect } from "@connect2ic/react";

const client = createClient({
  canisters: { socio },
  providers: defaultProviders,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Connect2ICProvider client={client}>
      <App />
    </Connect2ICProvider>
  </React.StrictMode>
);