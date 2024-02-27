import React, { useState, useContext } from 'react';
import socio_logo from "../../../assets/images/socio_home_logo_black_bg.png";
import defautl_profile_pic from "../../../assets/images/default_profile.jpg";
import Resizer from 'react-image-file-resizer';
import './UserDetails.css';
import CanisterContext from '../CanisterContext';

export default function UserDetails({ setUserExists, setLoading }) {

    const {canister} = useContext(CanisterContext);

    const [usernameError, setUsernameError] = useState(null);
    const [displaynameError, setDisplaynameError] = useState(null);
    const [bioCount, setBioCount] = useState(0);

    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    const [binaryProfile, setBinaryProfile] = useState(null);

    const handleImageUpload = (event) => {
        let file = event.target.files[0];
        convertPicToBinary(file);

        Resizer.imageFileResizer(
            file,
            300,
            300,
            'JPEG',
            100,
            0,
            async (uri) => {
                setProfilePicture(uri);
            },
            'base64'
        );
    };

    function convertPicToBinary(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            var blob = new Blob([event.target.result], { type: file.type });
            blob = new Uint8Array(blob);
            setBinaryProfile(blob);
        };
        reader.readAsArrayBuffer(file);
    };

    async function createNewUser() {
        setLoading(true);
        const { status, msg } = await canister.createNewUser(username, displayName, binaryProfile, bio);
        if (status === 0n) {
            setUserExists(true);
        };
        setLoading(false);
    };

    return (
        <div id="user-details">

            <div id="logo-section">
                <img src={socio_logo} alt="socio-logo" />
            </div>

            <div id="form-section">

                <div id="profile-upload">
                    <label htmlFor="fileUpload">
                        <img src={profilePicture || defautl_profile_pic} alt="Profile" />
                        <p id="profile-update" style={{
                            color: "#ff9c00"
                        }}>*Click to update</p>
                    </label>
                    <input id="fileUpload" type="file" style={{ display: 'none' }} onChange={handleImageUpload} />
                </div>

                <div id="inputs-section">

                    <div id="username-div">
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your Username" id="username-input" />
                        <p className="error-msg username-error" style={{
                            display: usernameError !== null ? 'block' : 'none'
                        }}>*{usernameError}</p>
                    </div>
                    <div id="displayname-div">
                        <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Enter your Display Name" />
                        <p className="error-msg displayname-error" style={{
                            display: displaynameError !== null ? 'block' : 'none'
                        }}>*{displaynameError}</p>
                    </div>
                    <div id="bio-div">
                        <textarea name="bio" value={bio} onChange={(e) => setBio(e.target.value)} id="bio" cols="30" rows="10" placeholder="Enter Bio" />
                        <p className="error-msg bio-error">{bioCount}/60</p>
                    </div>
                    <div id="submit" onClick={() => createNewUser()}>Submit</div>
                </div>

            </div>
        </div>
    )
}
