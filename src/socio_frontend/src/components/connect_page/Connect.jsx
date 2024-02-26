import React from 'react';
import socio_connect_logo from "../../../assets/images/socio_connect_logo.png";
import './Connect.css';

import { ConnectButton, ConnectDialog } from "@connect2ic/react";

export default function Connect() {

    return (
        <div id="connect-component">
            <img src={socio_connect_logo} alt="socio_logo" />
            <ConnectDialog dark="false" />
            <div id="buttons">
                <ConnectButton id="connect-button" />
                <div id="recover-button">Recover</div>
            </div>
        </div>
    )
}