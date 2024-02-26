import React from 'react';
import default_profile_black from "../../../assets/images/default_profile.jpg";
import defatult_profile_white from "../../../assets/images/default_pic_white.png";
import './ChatItem.css';

export default function ChatItem({ darkMode }) {
    return (
        <div className="chat-item">
            <div className="chat-profile-pic">
                <img src={darkMode ? default_profile_black : defatult_profile_white} alt="user-profile-pic" />
            </div>
            <div className="chat-profile-details">
                <p className="chat-username">greyhat_rr_007</p>
                <p className="chat-item-preview">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, dolorum?</p>
                <p className="chat-status">Online</p>
            </div>
        </div>
    )
}
