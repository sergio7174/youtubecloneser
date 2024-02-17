import React, {useState, useEffect} from "react";
import "./comment.css";

import axios from "axios";
import {format} from "timeago.js";

// HAND WITH THE FATTER FINGER UP ICON
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
// HAND WITH THE FATTER FINGER DOWN ICON
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
// COMMENT ICON
import CommentIcon from '@mui/icons-material/Comment';

const Comment = ({comment}) => {

  // INITIAL LOCAL STATE ON commentChannel 
  const [commentChannel, setCommentChannel] = useState({});

  useEffect(()=> {
    // buscar comentarios del canal --> fetchCommentChannel function
    const fetchCommentChannel = async () => {
      // get data from backend  
      const channelRes = await axios.get(`/users/find/${comment.userId}`);
      // change commentChannel state getting data on function: setCommentChannel(channelRes.data);
      setCommentChannel(channelRes.data);
    };
    // call fetchCommentChannel() function
    fetchCommentChannel(); 
  }, [])

  return (
    <div className="comment">

      <div className="commentImageContainer">
        <img className="commentImage" src={commentChannel.profile_image} alt="" />
      </div>

      <div className="commentInfosContainer">

        <div className="commentInfosUsername">
          <span className="commentUsername">{commentChannel.name}</span>
          <span className="commentCreatedAt">{format(comment.createdAt)}</span>
        </div>

        <div className="commentInfosText">
          <span className="commentText">{comment.desc}</span>
        </div>

        <div className="commentInfosBottom">
            
            <div className="commentInfosBottomLikes">
              <ThumbUpOffAltIcon style={{fontSize: "20px", cursor:"pointer"}}/>
              <span>Likes</span>
            </div>
   
            <div className="commentInfosBottomDisslikes">
              <ThumbDownOffAltIcon style={{fontSize: "20px", cursor:"pointer"}} />
            </div>

            <div className="commentInfosBottomOk">
              <div className="commentInfosBottomOkAgain">
                <CommentIcon style={{fontSize: "15px", cursor: "pointer"}}/>
                <span style={{fontSize: "15px", cursor: "pointer"}}>Add Comment</span>
              </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Comment;
