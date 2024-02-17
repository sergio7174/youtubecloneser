import React, {useState, useEffect} from "react";
import "./Card.css";

import axios from "axios";
import {useNavigate} from "react-router-dom";
import {format} from "timeago.js";

const Card = ({video}) => {
  
      //// Initial local state for channels const
      const [channels, setChannels] = useState({});

      const navigate = useNavigate();

  useEffect(()=> {
    
    // buscar channel -> fetchChannel function to get from backend viedos from users 
    const fetchChannel = async () => {
         const res = await axios.get(`/users/find/${video.userId}`)
         // channel state changes cause the function setChannels get the data from backend
         setChannels(res.data);
      }
      // call fetchChannel function
      fetchChannel();
  }, [video.userId]);

  // agregar visto al video */
  const addViewVideo = async () => {
       await axios.put(`/videos/view/${video._id}`);
  };

  // El ID del vídeo es una URL ,créalo y llévalo allí. -> video/ahj31fs1d53ed
  const navigateToVideo = async () => {
        navigate(`/video/${video._id}`);
  };

  const clickEvents = async () => {
    addViewVideo();
    navigateToVideo();
  };

  return (
    <div className="card" onClick={clickEvents} >
        <img className="cardImg" src={video.imgUrl} alt="" />
        <div className="cardDetails">
          <img className="cardDetailsChannelImg" src={channels.profile_image} alt="" />
          <div className="cardDetailsTexts">
            <h1 className="cardDetailsTitle">{video.title}</h1>
            <h2 className="cardDetailsChannelName">{channels.name}</h2>
            <div className="cardDetailsInfo">{video.views} views • {format(video.createdAt)}</div>
          </div>
        </div>
    </div>
  )
};

export default Card;