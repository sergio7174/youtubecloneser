import React, { useState, useEffect } from "react";
import "./recommendedCard.css"

import axios from "axios";
import {useNavigate} from "react-router-dom";
import {format} from "timeago.js";

const RecommendedCard = ({ video }) => {

    const navigate = useNavigate();
    
    // Initial State Channel local const
    const [channel, setChannel] = useState({});

    useEffect(() => {
        // function Buscar canal --> fecthChannel - to get videos using user id 
        const fetchChannel = async () => {
            const res = await axios.get(`http://localhost:5000/api/users/find/${video.userId}`);
            // change channel state by function setChannel been update in line setChannel(res.data);
            setChannel(res.data);
        };
        // call the function fetchChannel() 
        fetchChannel();
    }, [video.userId]);

    // function to get the video and update the numbers of views from backend
    const addViewVideo = async () => {await axios.put(`/videos/view/${video._id}`);};

    // Crea una URL del _id del video y lo obtiene del backend -> video/ahj31fs1d53ed
    const navigateToVideo = async () => {navigate(`/video/${video._id}`);};

    const clickEvents = async () => {
        addViewVideo();
        navigateToVideo();
    }

    return (
        <div className="smallCard" onClick={clickEvents}>

            <img className="smallCardImg" src={video.imgUrl} alt="" />

            <div className="smallCardDetails">

                <img className="smallCardDetailsChannelImg" src={channel.profile_image} alt="" />

                <div className="smallCardDetailsTexts">

                    <h2 className="smallCardDetailsTitle">{video.title}</h2>
                    <h2 className="smallCardDetailsChannelName">{channel.name}</h2>
                    <div className="smallCardDetailsInfo">
                        {video.views} views • {format(video.createdAt)}
                    </div>

                </div>

            </div>

        </div>
    )

};

export default RecommendedCard;