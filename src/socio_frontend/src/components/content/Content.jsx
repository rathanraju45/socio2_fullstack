import React, { useState } from 'react';
import { FaRegThumbsDown } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import './Content.css';

export default function Content({ isMobile, darkMode, type, media, caption, like, authorPic, userName, following, uploaded, saved }) {

    const [readMore, setReadMore] = useState(false);

    return (
        <div className={type + (darkMode ? " darkBG" : " lightBG")} style={{
            border: darkMode ? "solid 1px white" : "solid 1px black",
            margin: "1% 0"
        }}>
            <div className="postAuthor">
                <div className="postAuthorImgContainer">
                    <img src={authorPic} alt="creator-profile-pic" />
                </div>
                <p className="post-username">{userName}</p>
                <div className="creator-follow-button" style={{
                    display: following ? 'none' : 'block'
                }}><p style={{
                    color: darkMode ? "#000000" : "#ffffff",
                    fontWeight: "bold",
                }}>follow</p></div>
            </div>

            <div className={"main-content" + (type === "video" ? " video-wrapper" : "")}>
                {
                    type === 'post'
                        ? <img src={media} alt="post" />
                        : <video controls>
                        <source src={media} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                }
            </div>

            <div className="descritption">
                <p className="caption" style={{
                    height: readMore ? "80%" : "50%"
                }}>{caption}<i style={{ 
                    color: "blue", 
                    cursor: "pointer",
                }} onClick={() => setReadMore(!readMore)}>{readMore ? "less" : "more..."}</i></p>
                <div className="content-stats">
                    <div className="like">
                        {
                            like ? <FaThumbsUp /> : <FaRegThumbsUp />
                        }
                        <div className="count">100</div>
                    </div>

                    <div className="dislike">
                        {
                            like ? <FaRegThumbsDown /> : <FaThumbsDown />
                        }
                        <div className="count">100</div>
                    </div>

                    <div className="comments">
                        <FaRegComment />
                        <div className="count">100</div>
                    </div>

                    <div className="share">
                        <IoIosShareAlt />
                    </div>

                    <div className="save">
                        {
                            saved ? <FaBookmark /> : <FaRegBookmark />
                        }
                    </div>

                    <p className="upload-time">{uploaded}</p>
                </div>
            </div>
        </div>
    )
}