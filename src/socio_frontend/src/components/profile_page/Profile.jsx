import React, { useState } from 'react';
import default_profile_black from "../../../assets/images/default_profile.jpg";
import defatult_profile_white from "../../../assets/images/default_pic_white.png";
import { BsGrid3X3 } from "react-icons/bs";
import { BiSolidVideos } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";
import './Profile.css';

export default function Profile({ darkMode }) {

  const [acitveHead, setActiveHead] = useState('posts');

  return (
    <div id='profile-container'>
      <div id="profile-top">
        <div className="profile-pic-container">
          <img src={darkMode ? default_profile_black : defatult_profile_white} alt="profile-pic" />
        </div>
        <div className="profile-details">

          <div className="username-section">
            <div className="profile-username">
              <p>greyhat_rr_007</p>
            </div>
            <div className="edit-profile-button">
              Edit profile
            </div>
          </div>

          <div className="follow-section">
            <div className="posts">100 posts</div>
            <div className="following">100 following</div>
            <div className="followers">100 followers</div>
          </div>

          <div className="bio-section">
            <p className="display-name">Rathan Raju</p>
            <div className="bio">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis rerum praesentium ullam optio itaque velit sapiente doloribus at cumque eum?
            </div>
          </div>
        </div>
      </div>
      <div id="profile-bottom">

        <div className="bottom-header">
          <div id="contentPosts" onClick={() => setActiveHead('posts')} className={acitveHead === "posts" ? "activeHead" : ""}>
            <BsGrid3X3 /><p>Posts</p>
          </div>
          <div id="contentReels" onClick={() => setActiveHead('videos')} className={acitveHead === "videos" ? "activeHead" : ""}>
            <BiSolidVideos /><p>Videos</p>
          </div>
          <div id="contentSaved" onClick={() => setActiveHead('saved')} className={acitveHead === "saved" ? "activeHead" : ""}>
            <FaRegBookmark /><p>Saved</p>
          </div>
        </div>

        <div className="content-container">
          <div className="content-item"></div>
          <div className="content-item"></div>
          <div className="content-item"></div>
          <div className="content-item"></div>
          <div className="content-item"></div>
          <div className="content-item"></div>
          <div className="content-item"></div>
          <div className="content-item"></div>
          <div className="content-item"></div>
          <div className="content-item"></div>
        </div>
      </div>
    </div>
  )
}
