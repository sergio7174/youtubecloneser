import React from "react";
import "./channelCard.css";

import axios from "axios";
import {Link} from "react-router-dom";
import {format} from "timeago.js";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// hook to get state from redux-toolkit store
import {useSelector} from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

const ChannelCard = ({ video, channel }) => {

  // get the user state from redux-toolkit store
  const {currentUser} = useSelector((state) => state.user);

  // deleteVideo Function
  const deleteVideo = async () => {
    
    // action to delete video to backend
    await axios.delete(`/videos/${video._id}`).then(() => {
    // show message: "Video has been deleted!"
      toast.info("Video has been deleted!", toastOptions);
        // wait a 3000 msg to reload url page
        setTimeout(() => {window.location.reload();}, 3000);
        // if there is a error - show by console
      }).catch((err) => {console.log(err);});
  };

  /*** option to where the message position is gonna be show */
  const toastOptions = {
    className: "toast-position",
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "ligth",
  };

  return (
    <div className="channelCard">
      
      <Link to={`/video/${video._id}`} style={{ textDecoration: "none", color: "inherit" }}>

        <img className="channelCardImg" src={video.imgUrl} alt="" />
        <div className="channelCardDetails">
        
          <img className="channelCardChannelImg" src={channel.profile_image}
            alt="" />
          <div className="channelCardTexts">
            <h2 className="channelCardTitle">{video.title}</h2>
            <h2 className="channelCardChannelName">{channel.name}</h2>
            <div className="channelCardInfo">
              {video.views} views • {format(video.createdAt)}
            </div>
          </div>
        </div>
      </Link>
      
      {currentUser && currentUser._id === channel._id ? (
        <div className="deleteVideo">
          <button onClick={deleteVideo} className="deleteVideoButton">
            <DeleteIcon style={{ fill: "red" }} />
            Delete This Video ({video.title})
          </button>
        </div>
      ) : (
        <></>
      )}
      <ToastContainer />
    </div>
  );
};

export default ChannelCard;