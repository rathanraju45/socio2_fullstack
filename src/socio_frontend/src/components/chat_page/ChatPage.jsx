import React, { useState } from 'react';
import ChatItem from '../chat_list_item/ChatItem';
import Messages from '../messages_page/Messages';
import './ChatPage.css';

export default function ChatPage({ darkMode }) {

  const [chatHead, setChatHead] = useState('chats');
  const [messagesDisplay, setMessagesDisplay] = useState(false);

  return (
    <div id="chat-page">

      <div className={"chats" + (messagesDisplay ? " chatListHide" : " chatListDisplay")}>
        <div id="chat-heading">
          <p onClick={() => setChatHead('chats')} style={{
            color: chatHead === 'chats' ? '#ffc900' : '#ffffff'
          }}>Chats</p>
          <p onClick={() => setChatHead('random')} style={{
            color: chatHead === 'random' ? '#ffc900' : '#ffffff'
          }}>Random</p>
        </div>

        <div id="chats-list">
          <div id="chat-list-search-container" style={{
            backgroundColor: darkMode ? "#000000" : "#ffffff"
          }}>
            <input type="text" id="chat-list-search" placeholder="Search..." style={{
              border: darkMode ? "solid 1px #ffffff" : "solid 1px #00000",
              backgroundColor: darkMode ? "#000000" : "#ffffff",
              color: darkMode ? "#ffffff" : "#000000"
            }} />
          </div>

          <ChatItem darkMode={darkMode} />
          <ChatItem darkMode={darkMode} />
          <ChatItem darkMode={darkMode} />
          <ChatItem darkMode={darkMode} />
          <ChatItem darkMode={darkMode} />
          <ChatItem darkMode={darkMode} />
          <ChatItem darkMode={darkMode} />
          <ChatItem darkMode={darkMode} />
        </div>
      </div>

      <div className={"messages" + (messagesDisplay ? " messagesDisplay" : " messagesHide")}>
        <Messages darkMode={darkMode} />
      </div>

    </div>
  )
}
