import React, { useEffect, useRef, useState } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import socio_full_logo_black from "../../../assets/images/socio_home_logo_black_bg.png";
import socio_full_logo_white from "../../../assets/images/socio_home_logo_white_bg.png";
import socio_letter_black from "../../../assets/images/socio_letter_logo_black_bg.png";
import socio_letter_white from "../../../assets/images/socio_letter_logo_white_bg.png";
import default_profile_black from "../../../assets/images/default_profile.jpg";
import defatult_profile_white from "../../../assets/images/default_pic_white.png";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { LuMonitorPlay } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBell } from "react-icons/fa";
import HomeContent from '../home_content/HomeContent';
import Profile from '../profile_page/Profile';
import ChatPage from '../chat_page/ChatPage';
import './Home.css';

export default function Home() {

    const isMobile = window.innerWidth <= 885 ? true : false;

    const [navigationSize, setNavigationSize] = useState('max');
    const [darkMode, setDarkMode] = useState(true);
    const [moreDisplay, setMoreDisplay] = useState(false);

    // starts
    // section to handle active Nav

    const [activeNav, setActiveNav] = useState(0);
    function handleNavClick(id) {
        setActiveNav(id);
    };

    // ends

    // starts
    // secion to handle the navbar min-max state based on device width

    useEffect(() => {
        if (isMobile) {
            setNavigationSize('min');
        }
    }, [isMobile]);

    // ends

    // starts
    // minimizing navsize if the location is chat and setting the activeNav

    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('/home')) {
            setActiveNav(0);
        } else if (location.pathname.includes('/search')) {
            setActiveNav(1);
        } else if (location.pathname.includes('/chat')) {
            setActiveNav(2);
        } else if (location.pathname.includes('/wathc')) {
            setActiveNav(3);
        } else if (location.pathname.includes('/profile')) {
            setActiveNav(4);
        }

        if (!isMobile) {
            if (location.pathname.includes('/chat')) {
                setNavigationSize('min');
            } else {
                setNavigationSize('max');
            }
        }
    }, [location]);

    // ends

    // starts
    // handling the display of more-options

    const more_options_ref = useRef(null);
    const button_ref = useRef(null);
    const handleClickOutside = (event) => {
        if (more_options_ref.current && !more_options_ref.current.contains(event.target) && button_ref.current !== event.target) {
            setMoreDisplay(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        window.addEventListener('scroll', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            window.removeEventListener('scroll', handleClickOutside, true);
        };
    }, []);

    //ends

    return (
        <div id="home-component" className={darkMode ? "darkBG" : "lightBG"}>
            <div id="home-navigation" className={navigationSize === 'max' ? ' maxNav' : ' minNav'}>

                <div className="nav-item first-nav" style={{
                    display: isMobile ? 'none' : 'block'
                }}>
                    <img src={
                        darkMode
                            ? navigationSize === 'max' ? socio_full_logo_black : socio_letter_black
                            : navigationSize === 'max' ? socio_full_logo_white : socio_letter_white
                    } alt="socio_logo" />
                </div>

                <Link style={{ color: darkMode ? "#ffffff" : "#000000" }} to="/" className={"nav-item" + (activeNav === 0 ? " activeNav" : '')} onClick={() => handleNavClick(0)}>
                    <div className="icon">
                        <IoMdHome />
                    </div>
                    <p className={navigationSize === 'max' ? "showP" : "hideP"}>Home</p>
                </Link>

                <Link style={{ color: darkMode ? "#ffffff" : "#000000" }} to="/search" className={"nav-item" + (activeNav === 1 ? " activeNav" : '')} onClick={() => handleNavClick(1)}>
                    <div className="icon">
                        <FaSearch />
                    </div>
                    <p className={navigationSize === 'max' ? "showP" : "hideP"}>Search</p>
                </Link>

                <Link style={{ color: darkMode ? "#ffffff" : "#000000" }} to="/chat" className={"nav-item" + (activeNav === 2 ? " activeNav" : '')} onClick={() => handleNavClick(2)}>
                    <div className="icon">
                        <IoChatbubbleEllipsesSharp />
                    </div>
                    <p className={navigationSize === 'max' ? "showP" : "hideP"}>Chat</p>
                </Link>

                <Link style={{ color: darkMode ? "#ffffff" : "#000000" }} to="/watch" className={"nav-item" + (activeNav === 3 ? " activeNav" : '')} onClick={() => handleNavClick(3)}>
                    <div className="icon">
                        <LuMonitorPlay />
                    </div>
                    <p className={navigationSize === 'max' ? "showP" : "hideP"}>Watch</p>
                </Link>

                <Link style={{ color: darkMode ? "#ffffff" : "#000000" }} to="/profile" className={"nav-item" + (activeNav === 4 ? " activeNav" : '')} onClick={() => handleNavClick(4)}>
                    <div className="icon">
                        <img src={darkMode ? default_profile_black : defatult_profile_white} alt="profile-pic" />
                    </div>
                    <p className={navigationSize === 'max' ? "showP" : "hideP"}>Profile</p>
                </Link>

                <div className={"nav-item" + (activeNav === 5 ? " activeNav" : '')} style={{
                    display: isMobile ? 'none' : 'flex'
                }} onClick={() => handleNavClick(5)}>
                    <div className="icon">
                        <LuLogOut />
                    </div>
                    <p className={navigationSize === 'max' ? "showP" : "hideP"}>Logout</p>
                </div>

                <div className="nav-item more-icon" style={{
                    display: isMobile ? 'none' : 'flex'
                }}>
                    <div className="icon">
                        <GiHamburgerMenu />
                        <div ref={more_options_ref} className="more-options" style={{
                            backgroundColor: darkMode ? "#ffffff" : "#000000",
                            color: darkMode ? "#000000" : "#ffffff",
                            display: moreDisplay ? "flex" : "none"
                        }}>
                            <div className="toggle-dark-light">
                                <div className="toggle-div">
                                    <p>dark mode</p>
                                    <div className="toggle-button" style={{
                                        border: darkMode ? "solid 1px #000000" : "solid 1px #ffffff"
                                    }}>
                                        <div className="on" style={{
                                            backgroundColor: darkMode ? "#000000" : "#ffffff",
                                            color: darkMode ? "#ffffff" : "#000000"
                                        }}><p onClick={(e) => { e.stopPropagation(); setDarkMode(true) }}>On</p></div>
                                        <div className="off" style={{
                                            backgroundColor: darkMode ? "#ffffff" : "#000000",
                                            color: darkMode ? "#000000" : "#ffffff"
                                        }}><p onClick={(e) => { e.stopPropagation(); setDarkMode(false) }}>Off</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p ref={button_ref} onClick={() => setMoreDisplay(!moreDisplay)} className={navigationSize === 'max' ? "showP" : "hideP"}>More</p>
                </div>

            </div>
            <div id="home-body" className={(navigationSize === 'max' ? ' minBody' : ' maxBody')}>
                <div id="mobile-view-section" style={{
                    display: isMobile ? 'flex' : 'none'
                }}>
                    <img src={darkMode ? socio_full_logo_black : socio_full_logo_white} alt="socio_logo" />
                    <FaBell id="notification-icon" />
                </div>

                <Routes>
                    <Route path="/" element={<HomeContent isMobile={isMobile} darkMode={darkMode} />} />
                    <Route path="/profile" element={<Profile darkMode={darkMode} />} />
                    <Route path="/chat" element={<ChatPage darkMode={darkMode} />} />
                </Routes>

            </div>
        </div>
    );
}