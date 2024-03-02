import React, { useState, useEffect, useContext } from 'react';
import socio_logo from "../../../assets/images/socio_home_logo_black_bg.png";
import defautl_profile_pic from "../../../assets/images/default_profile.jpg";
import Resizer from 'react-image-file-resizer';
import './UserDetails.css';
import CanisterContext from '../CanisterContext';
import useConvertToBinary from '../../hooks/useConvertToBinary';
import useConvertToImage from '../../hooks/useConvertToImage';

export default function UserDetails({ setLoading, setLoadingMessage, edit = false }) {

    //hooks
    const { imageUrl, binary, convertToBinary } = useConvertToBinary();
    const { image, convertToImage } = useConvertToImage();

    const { canister, principal, setUserExists, profileEdit, setProfileEdit } = useContext(CanisterContext);

    const [usernameError, setUsernameError] = useState(null);
    const [displaynameError, setDisplaynameError] = useState(null);
    const [bioCount, setBioCount] = useState(0);

    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    const [binaryProfile, setBinaryProfile] = useState(null);
    
    const [binaryProfilePic, setBinaryProfilePic] = useState(null); //for edit profile page

    const [autoFilled, setAutoFilled] = useState(false);

    function handleImageUpload(event) {
        const file = event.target.files[0];
        convertToBinary(file);
    };

    useEffect(() => {
        if (imageUrl !== null) {
            setProfilePicture(imageUrl);
        };
    }, [imageUrl]);

    useEffect(() => {
        setBinaryProfile(binary);
    }, [binary]);

    useEffect(() => {
        if (usernameError !== null) {
            setUsernameError(null);
        };
    }, [username]);

    useEffect(() => {
        if (displaynameError !== null) {
            setDisplaynameError(null);
        };
    }, [displayName]);

    useEffect(() => {
        setBioCount(bio.length);
    }, [bio]);

    async function validateUserName() {
        var validateUname = username;
        if (validateUname !== '') {
            if (validateUname.length < 5 || validateUname.length > 20) {
                setUsernameError('Character length must be betweeen 5 & 20');
                return 0;
            } else if (!/^[a-zA-Z_]/.test(validateUname)) {
                setUsernameError('First Character must be alphabet');
                return 0;
            } else if (!/^[a-zA-Z0-9_]*$/.test(validateUname)) {
                setUsernameError('only alphanumerics and _ is allowed');
                return 0;
            } else {
                setUsernameError('Checking for Username availability');
                const { status } = await canister.checkUsername(validateUname);
                if (status !== 0n) {
                    setUsernameError("Username already taken");
                    return 0;
                } else {
                    setUsernameError(null);
                    return 1;
                };
            };
        } else {
            setUsernameError('Username is empty');
            return 0;
        };
    };

    function validateDisplayName() {
        var validateDname = displayName;
        if (validateDname !== '') {
            if (validateDname.length < 5 || validateDname.length > 20) {
                setDisplaynameError('Character length must be betweeen 5 & 20');
                return 0;
            } else if (!/^[a-zA-Z_]/.test(validateDname)) {
                setDisplaynameError('First Character must be alphabet');
                return 0;
            } else if (!/^[a-zA-Z0-9_]*$/.test(validateDname)) {
                setDisplaynameError('only alphanumerics and _ is allowed');
                return 0;
            }
        } else {
            setDisplaynameError('Display name is empty');
            return 0;
        };
        return 1;
    };

    function validateBio() {
        if (bio === "") {
            console.log("Setting default bio...");
            setBio('Socio user');
        };
    };

    async function createNewUser() {
        const uNameresult = await validateUserName();
        const dNameresult = validateDisplayName();

        if (uNameresult === 1 && dNameresult === 1) {
            if (binaryProfile === null) {
                alert("please upload profile picture");
            } else {
                if (bio === "") {
                    validateBio();
                };
                setLoading(true);
                setLoadingMessage("Creating the user...");
                const { status } = await canister.createNewUser(principal, username, displayName, binaryProfile, bio);
                if (status === 0n) {
                    setUserExists(true);
                };
                setLoading(false);
                setLoadingMessage(null);
            };
        };
    };

    async function autoFillForEdit() {
        const { data } = await canister.getEditableProfile(principal);
        setUsername(data[0].username);
        setDisplayName(data[0].displayname);
        setBinaryProfilePic(data[0].profilepic);
        setBio(data[0].bio);
        if (data) {
            setAutoFilled(true);
        };
    };

    function handleEditImageDownload() {
        let vecNat8 = binaryProfilePic;
        convertToImage(vecNat8);
    };

    useEffect(() => {
        if (profileEdit) {
            handleEditImageDownload();
        };
    }, [binaryProfilePic]);

    useEffect(() => {
        if (profileEdit && image !== null) {
            setProfilePicture(image);
        };
    }, [image]);

    async function editProfile() {
        const uNameresult = await validateUserName();
        const dNameresult = validateDisplayName();

        if (uNameresult === 1 && dNameresult === 1) {
            if (binaryProfile === null) {
                alert("Please upload profile picture");
            } else {
                if (bio === "") {
                    validateBio();
                };
                setLoading(true);
                setLoadingMessage("Updating Profile...");
                const { status } = await canister.editProfile(principal, username, displayName, binaryProfile, bio);
                if (status === 0n) {
                    setUserExists(true);
                    setProfileEdit(false);
                };
                setLoading(false);
                setLoadingMessage(null);
            };
        };
    };

    useEffect(() => {
        if (profileEdit) {
            autoFillForEdit();
        };
    }, [profileEdit]);

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
                        <textarea maxLength="150" name="bio" value={bio} onChange={(e) => setBio(e.target.value)} id="bio" cols="30" rows="10" placeholder="Enter Bio" />
                        <p className="error-msg bio-error" id={bioCount < 150 ? "bio-color" : ""}>{bioCount}/150</p>
                    </div>
                    <div className="submit" onClick={() => createNewUser()} style={{
                        display: edit ? 'none' : 'flex'
                    }}>Submit</div>
                    <div className="submit" onClick={() => {
                        if (autoFilled) {
                            editProfile();
                        }
                    }} style={{
                        display: edit ? 'flex' : 'none'
                    }}>Edit</div>
                </div>

            </div>
        </div>
    )
}
