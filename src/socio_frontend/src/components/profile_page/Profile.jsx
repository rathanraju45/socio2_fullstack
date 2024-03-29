import React, { useState, useEffect, useContext } from 'react';
import default_profile_black from "../../../assets/images/default_profile.jpg";
import defatult_profile_white from "../../../assets/images/default_pic_white.png";
import { BsGrid3X3 } from "react-icons/bs";
import { BiSolidVideos } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";
import './Profile.css';
import CanisterContext from '../CanisterContext';
import { Link } from '../../../../../node_modules/react-router-dom/dist/index';
import useConvertToImage from '../../hooks/useConvertToImage';

export default function Profile({ darkMode }) {

  //hooks
  const { image, convertToImage } = useConvertToImage();

  const { canister, principal, setUserExists , setProfileEdit } = useContext(CanisterContext);

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
    convertToImage(vecNat8);
  };

  useEffect(() => {
    if (image !== null) {
      setRawProfilePic(image);
    };
  }, [image]);

  useEffect(() => {
    async function fetchProfile() {
      let fetchedProfile = await canister.getProfile(principal);
      if (fetchedProfile !== null) {
        setProfileData({
          username: fetchedProfile[0].userName,
          displayname: fetchedProfile[0].displayName,
          profilepic: fetchedProfile[0].profilePic,
          posts: (fetchedProfile[0].posts).toString(),
          following: (fetchedProfile[0].following).toString(),
          followers: (fetchedProfile[0].followers).toString(),
          bio: fetchedProfile[0].bio
        });
        handleImageDownload();
      };
    };
    if (principal !== null) {
      fetchProfile();
    }
  }, [canister, principal]);

  useEffect(() => {
    if (profileData.profilePic !== null) {
      handleImageDownload();
    }
  }, [profileData]);

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
            <div className="edit-profile-button" onClick={() => { setUserExists(false); setProfileEdit(true) }}>
              Edit Profile
            </div>
          </div>

          <div className="follow-section">
            <div className="posts">{profileData.posts} posts</div>
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
