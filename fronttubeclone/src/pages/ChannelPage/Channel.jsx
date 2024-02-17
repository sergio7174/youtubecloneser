import React, { useState, useEffect } from "react";
import "./channel.css";

import ChannelCard from "../../components/ChannelCard/ChannelCard.jsx";
import axios from "axios";
import {useLocation, Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Channel = () => {
  // get state.user from redux-store to handle with currentUser Const   
  const {currentUser} = useSelector((state) => state.user);

  // local state const channel, videos , set initial state to those const
  const [channel, setChannel] = useState({});
  const [videos, setVideos] = useState([]);

  const path = useLocation().pathname.split("/")[2];

  useEffect(() => {
    // function buscar channel data --> fetchChannelDatas from backend
    const fetchChannelDatas = async () => {
      try {
        const channelRes = await axios.get(`/users/find/${path}`);
        setChannel(channelRes.data); // change the channel state with new parameter to setChannel func 

        const videoRes = await axios.get(`/videos/find/byuser/${path}`);
        setVideos(videoRes.data);  // change the video state with new parameter to setVideos func 
      } catch (err) {
        console.log(err);
      }
    };
    // call function fetchChannelDatas()
    fetchChannelDatas();
  }, []);

  return (
    <div className="specialChannel">
      <div className="channelTopContainer">
        <div className="channelTopTop">

          <div className="channelPersonContainer">

            <img className="channelPersonImg" src={channel.profile_image} alt=""/>
            <span className="channelPersonName">{channel.name}</span>
          </div>

          {/**if there a user logged in show button: Customize Your Channel  */}
          {currentUser ? (
            <div className="channelButtonContainer">
              <button className="channelButton">Customize Your Channel</button>
            </div>
          ) : ( /***if there is not user logged in Show: Subscribe  */
            <div className="channelButtonContainer">
              <Link to="/signin">
                <button className="channelButton">Subscribe</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/**if there a user logged in show: your videos  */}
      {currentUser ? (
        <div className="channelBottomVideosTitle">
          <span>Your Videos</span>
        </div>
      ) : ( /***if there is not user logged in Show: {channel.name}'s Videos  */
        <div className="channelBottomVideosTitle">
          <span>{channel.name}'s Videos</span>
        </div>
      )}

      {/*** show list of videos from videos array data, that comes from backend on render */}
      <div className="channelVideos">
        {videos.map((video) => (
          <ChannelCard key={video._id} video={video} channel={channel} />))}
      </div>
    </div>
  );
}

export default Channel;
