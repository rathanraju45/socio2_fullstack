import React, { useState, useEffect, useContext } from 'react';
import default_profile_black from "../../../assets/images/default_profile.jpg";
import defatult_profile_white from "../../../assets/images/default_pic_white.png";
import { BsGrid3X3 } from "react-icons/bs";
import { BiSolidVideos } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";
import './Profile.css';
import CanisterContext from '../CanisterContext';

export default function Profile({ darkMode }) {

  const { canister, principal } = useContext(CanisterContext);

  const [acitveHead, setActiveHead] = useState('posts');
  const [profileData, setProfileData] = useState({
    username: "",
    displayname: "",
    profilepic: null,
    posts: "-",
    following: "-",
    followers: "-",
    bio: ""
  });

  const [rawProfilePic, setRawProfilePic] = useState(null);

  function handleImageDownload() {

    let vecNat8 = profileData.profilepic;
    // Convert the Vec<Nat8> back to an ArrayBuffer
    const arrayBuffer = new Uint8Array(vecNat8).buffer;

    // Convert the ArrayBuffer to a Blob
    const imageBlob = new Blob([arrayBuffer], { type: 'image/jpeg' });

    // Create a URL for the Blob
    const imageUrl = URL.createObjectURL(imageBlob);

    setRawProfilePic(imageUrl);
  }

  function replacer(key, value) {
    if (typeof value === 'bigint') {
      return value.toString();
    } else {
      return value;
    }
  }

  useEffect(() => {
    async function fetchProfile() {
      let fetchedProfile = await canister.getProfile(principal);
      fetchedProfile = JSON.stringify(fetchedProfile, replacer, 2);
      if (fetchedProfile !== null) {
        const { userName, displayName, profilePic, posts, following, followers, bio } = fetchedProfile;
        setProfileData({
          username: userName,
          displayname: displayName,
          profilepic: profilePic,
          posts: posts,
          following: following,
          followers: followers,
          bio: bio
        });
      };
    };
    if (principal !== null) {
      fetchProfile();
      handleImageDownload();
    }
  }, [canister, principal]);


  useEffect(() => {
    console.log(profileData);
  }, [profileData])

  return (
    <div id='profile-container'>
      <div id="profile-top">
        <div className="profile-pic-container">
          <img src={rawProfilePic === null ? (darkMode ? default_profile_black : defatult_profile_white) : rawProfilePic} alt="profile-pic" />
        </div>
        <div className="profile-details">

          <div className="username-section">
            <div className="profile-username">
              <p>{profileData.username}</p>
            </div>
            <div className="edit-profile-button">
              Edit profile
            </div>
          </div>

          <div className="follow-section">
            <div className="posts">{profileData.post} posts</div>
            <div className="following">{profileData.following} following</div>
            <div className="followers">{profileData.followers} followers</div>
          </div>

          <div className="bio-section">
            <p className="display-name">{profileData.displayname}</p>
            <div className="bio">
              {profileData.bio}
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
