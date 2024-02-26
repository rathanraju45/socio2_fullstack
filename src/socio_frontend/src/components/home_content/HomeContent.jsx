import React from 'react';
import default_profile_black from "../../../assets/images/default_pic.png";
import default_profile_white from "../../../assets/images/default_pic_white.png";
import video from "../../../assets/images/video.mp4";
import Content from '../content/Content';
import './HomeContent.css';

export default function HomeContent({ isMobile, darkMode }) {
    return (
        <div id="home-content">

            <div id="empty-div" style={{
                display: isMobile ? 'none' : 'block'
            }}></div>
            <div id="content-div" style={{
                width: isMobile ? '100%' : '35vw',
                height: isMobile ? '90%' : '100%',
            }}>
                <div id="content">
                    <Content
                        isMobile={isMobile}
                        darkMode={darkMode}
                        type={"post"}
                        media={"https://blog.photoadking.com/wp-content/uploads/2020/08/Instagram-Fashion-Post-Templates-1024x1024.jpg"}
                        caption={"Socio is a social media platfrom build on icp blockchain technology. it tries to revoluxhcromextionize the design of social media platofrims."}
                        like={true}
                        authorPic={darkMode ? default_profile_white : default_profile_black}
                        userName={"greyhat_rr_007"}
                        following={false}
                        uploaded={"2 days ago"}
                        saved={false}
                    />

                    <Content
                        isMobile={isMobile}
                        darkMode={darkMode}
                        type={"video"}
                        media={video}
                        caption={"Socio is a social media platfrom build on icp blockchain technology. it tries to revoluxhcromextionize the design of social media platofrims."}
                        like={true}
                        authorPic={darkMode ? default_profile_white : default_profile_black}
                        userName={"greyhat_rr_007"}
                        following={false}
                        uploaded={"2 days ago"}
                        saved={false}
                    />

                    <Content
                        isMobile={isMobile}
                        darkMode={darkMode}
                        type={"post"}
                        media={"https://blog.photoadking.com/wp-content/uploads/2020/08/Instagram-Fashion-Post-Templates-1024x1024.jpg"}
                        caption={"Socio is a social media platfrom build on icp blockchain technology. it tries to revoluxhcromextionize the design of social media platofrims."}
                        like={true}
                        authorPic={darkMode ? default_profile_white : default_profile_black}
                        userName={"greyhat_rr_007"}
                        following={false}
                        uploaded={"2 days ago"}
                        saved={false}
                    />
 

                </div>
            </div>
            <div id="extra-div" style={{
                display: isMobile ? 'none' : 'block',
                borderLeft: darkMode ? "solid 1px white" : "solid 1px black"
            }}>
                Wallet section
            </div>

        </div>
    )
}
