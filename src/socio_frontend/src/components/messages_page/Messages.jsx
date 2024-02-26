import React, {useEffect, useRef} from 'react';
import default_profile_black from "../../../assets/images/default_profile.jpg";
import defatult_profile_white from "../../../assets/images/default_pic_white.png";
import { IoIosCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa6";
import { MdPermMedia } from "react-icons/md";
import messages from './data';
import './Messages.css';

export default function Messages({ darkMode }) {

    const lastMessageRef = useRef(null);
    const lastMessageView = () => {
        lastMessageRef.current?.scrollIntoView({behaviour: "smooth"});
    };

    useEffect(lastMessageView, [messages]);

    return (
        <div id="message-container">
            <div className="message-header">
                <FaArrowLeft />
                <div className="message-profile-pic">
                    <img src={darkMode ? default_profile_black : defatult_profile_white} alt="message-profile-pic" />
                </div>
                <div className="message-username">
                    <p>greyhat_rr_007</p>
                    <p className="message-online-status">Online</p>
                </div>
                <div className="call-section">
                    <IoIosCall />
                    <FaVideo />
                </div>
            </div>

            <div className="messages-section">
                {
                    messages.map((item) => 
                    <div key={item.messageId} className={"message-item " + (item.messageId%2 === 0 ? 'left' : 'right')}>
                        <p>{item.message}</p>
                        <span className="message-time">{item.timestamp}</span>
                    </div>)
                }
                <div ref={lastMessageRef} />
            </div>
            <div id="message-input">
                <input type="text" id="message-input" placeholder="Type the message..." style={{
                    border: darkMode ? "solid 1px #ffffff" : "solid 1px #000000",
                    backgroundColor: darkMode ? "#000000" : "#ffffff",
                    color: darkMode ? "#ffffff" : "#000000"
                }} />
                <div id="message-input-icons">
                    <IoSendSharp />
                    <FaMicrophone />
                    <MdPermMedia />
                </div>
            </div>
        </div>
    )
}
