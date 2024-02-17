import React, { useState, useEffect, useRef } from "react";
import "./video.css";
import person from "../../assets/person.png";

import Comment from "../../components/Comment/Comment.jsx"
import RecommendedCard from "../../components/RecommendedCard/RecommendedCard.jsx";

import axios from "axios";
//import {useLocation, useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";

import {format} from "timeago.js"
/**components Icons */
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import SortIcon from '@mui/icons-material/Sort';

//import {fetchSuccess} from "../../redux/videoSlice.js";
//import {useSelector, useDispatch} from "react-redux";
import {useSelector} from "react-redux";

const Video = () => {
 // const navigate = useNavigate();

   // get the state.user from redux-store --> to local const currentUser  
  const {currentUser} = useSelector((state) => state.user);
  //const {currentVideo} = useSelector((state) => state.video);

  /* useLocation proporciona información de nombre de ruta -> /video/:id -> dividir divisiones con :id, segundo elemento.  */
  const path = useLocation().pathname.split("/")[2];

  const likeRef = useRef();
  const dislikeRef = useRef();

  /* initialize local const state of: randomVideos, videoData, videoComments, channel, currentLike
                                      currentSubscribersLength, currentCommentsLength, commentDesc */
  /* Componente de tarjeta pequeña, señal de video (datos) y señal de canal (canal) */
  const [randomVideos, setRandomVideos] = useState([]);
  const [videoData, setVideoData] = useState({});
  const [videoComments, setVideoComments] = useState([]);
  const [channel, setChannel] = useState({});
  const [currentLike, setCurrentLike] = useState([]);
  const [currentSubscribersLength, setCurrentSubscribersLength] = useState([]);
  const [currentCommentsLength, setcurrentCommentsLength] = useState([]);

  const [commentDesc, setCommentDesc] = useState("");

  useEffect(() => {
    
  const fetchData = async () => {
      try {
        // get data from backend using axios method GET to local const videoRes
        const videoRes = await axios.get(`/videos/find/${path}`);
        // update state of videoData with backend data using function setVideoData.
        setVideoData(videoRes.data);
        // update state of currentLike with backend data using function setCurrentLike.
        setCurrentLike(videoRes.data.likes);
        // get data from backend using axios method GET to local const commentRes
        const commentRes = await axios.get(`/comments/${path}`)
        // update state of videoComments with backend data using function setVideoComments.
        setVideoComments(commentRes.data);
        // update state of videoComments with backend data using function setVideoComments.
        setcurrentCommentsLength(commentRes.data.length);

        // get data from backend using axios method GET to local const channelRes
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);
        // update state of channel with backend data using function setChannel.
        setChannel(channelRes.data);
        // update state of CurrentSubscribersLength with backend data using function setCurrentSubscribersLength.
        setCurrentSubscribersLength(channelRes.data.subscribers);

      } catch (err) {
        console.log(err);
      }
    };
  // function to get some random videos
  const fetchRandomVideos = async () => {
      // get data from backend using axios method GET to local const res
      const res = await axios.get("/videos/smallrandom");
      // update state of randomVideos with backend data using function setRandomVideos.
      setRandomVideos(res.data);
    };
     // function call
    fetchData();
    fetchRandomVideos();

  }, [path, setChannel]);

  // function handleLikeClick to update like in database
  const handleLikeClick = async () => {
    await axios.put(`/users/like/${videoData._id}`);
    // reload url again with new state updated
    window.location.reload();
  };
  // function to handle dislike click action
  const handleDislikeClick = async () => {
    await axios.put(`/users/dislike/${videoData._id}`);
  };
// function to handle subscribeToUser
  const subscribeToUser = async () => {
    try {
      await axios.put(`/users/sub/${channel._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  // function to handle unsubscribeToUser
  const unsubscribeToUser = async () => {
    try {
      await axios.put(`/users/unsub/${channel._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  // function to handle comment
  const handleComment = async () => {
        await axios.post(`/comments`, {
          desc: commentDesc,
          videoId: videoData._id
        });
  }

  return (
    <>
      {currentUser ? (
        <div className="video">
          <div className="videoContent">
            <div className="videoWrapper">
            <iframe
            width="100%"
            height="500"
            src={videoData.videoUrl}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>

            </iframe>
            </div>

            <h2 className="videoTitle">{videoData.title}</h2>

            <div className="videoDetails">
              <span className="videoInfo">
                {" "}
                {videoData.views} views • {format(videoData.createdAt)}{" "}
              </span>

              <div className="videoButtons">
                {videoData.likes?.includes(currentUser._id) ? (
                  <div className="videoButton">

                    <ThumbUpOutlinedIcon style={{ fill: "red" }}
                      onClick={handleLikeClick}/>

                    {currentLike.length} Likes
                  </div>
                ) : (
                  <div className="videoButton">
                    <ThumbUpOutlinedIcon onClick={handleLikeClick} ref={likeRef} />
                    {currentLike.length} Likes
                  </div>
                )}

                <div className="videoButton">
                  <ThumbDownOffAltOutlinedIcon onClick={handleDislikeClick} ref={dislikeRef} />
                  Disslike
                </div>

                <div className="videoButton">
                  <ReplyOutlinedIcon />
                  Share
                </div>

                <div className="videoButton">
                  <SaveAltIcon />
                  Save
                </div>
              </div>
            </div>

            <hr className="Hr"></hr>

            <div className="channel">
              <div className="channelInfo">

                <img className="channelImg" src={channel.profile_image} alt=""/>

                <div className="channelDetails">
                  <span className="channelName">{channel.name}</span>

                  <span className="channelCounter">
                    {currentSubscribersLength.length} subscribers
                  </span>

                  <p className="channelDescription">{videoData.desc}</p>
                 
                 {/**if there is a channel subscribers */}

                  {channel.subscribers?.includes(currentUser._id) ? (
 
            <button className="channelSubButton" onClick={unsubscribeToUser}>

                      <NotificationsActiveIcon style={{ fill: "red" }} />
                      {`You subscribed to ${channel.name}. Click to unsubscribe.`}
                    </button>
                  ) : (
                    <button className="channelSubButton" onClick={subscribeToUser}>
                      <NotificationAddIcon />
                      {`Subscribe to ${channel.name}.`}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <hr className="Hr"></hr>

            <div className="commentsHeader">
               <div className="commentsLength">
                 <span>{currentCommentsLength} Comments</span>
               </div>

               <div className="commentsSorting">
                  <SortIcon></SortIcon>
                  <span>ORDER BY;</span>
               </div>
            </div>

            <div className="addComment">
              <div className="addCommentLeft">
                <img className="addCommentPerson" src={channel.profile_image} alt="" />
              </div>

              <div className="addCommentRight">
                
                <input className="addCommentInput" placeholder="Add a comment." 
                       onSubmit={(event)=> {event.preventDefault()}} 
                       onChange={(event)=> {
                  const commentDesc = event.target.value;
                  setCommentDesc(commentDesc);
                }}>
                </input>

                <hr className="addCommentHr" />
                <button className="addCommentButton" onClick={handleComment}>Add Comment</button>
              </div>
            </div>

            {videoComments.map(comment=> (
               <Comment key={comment._id} comment={comment}></Comment>
            ))}

          </div>

          <div className="recommendation">
            {randomVideos.map((video) => (
              <RecommendedCard key={video._id} video={video}></RecommendedCard>
            ))}
          </div>
        </div>
      ) : (
        <div className="video">
          <div className="videoContent">
            <div className="videoWrapper">
              <iframe width="100%" height="500" src={videoData.videoUrl}
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>

              </iframe>
            </div>

            <h1 className="videoTitle">{videoData.title}</h1>

            <div className="videoDetails">
              <span className="videoInfo">
                {" "}
                {videoData.views} views • {videoData.createdAt}{" "}
              </span>

              <div className="videoButtons">
                <div className="videoButton">
                  <ThumbUpOutlinedIcon onClick={(e) => e.preventDefault()} />
                  {currentLike.length} Likes
                </div>

                <div className="videoButton">
                  <ThumbDownOffAltOutlinedIcon
                    onClick={(e) => e.preventDefault()}
                  />
                  Disslike
                </div>

                <div className="videoButton">
                  <ReplyOutlinedIcon />
                  Share
                </div>

                <div className="videoButton">
                  <SaveAltIcon />
                  Save
                </div>
              </div>
            </div>

            <hr className="Hr"></hr>

            <div className="channel">
              <div className="channelInfo">

                <img className="channelImg" src={channel.profile_image} alt=""/>

                <div className="channelDetails">
                  <span className="channelName">{channel.name}</span>

                  <span className="channelCounter">
                    {currentSubscribersLength.length} subscribers
                  </span>

                  <p className="channelDescription">{videoData.desc}</p>

                  <button className="channelSubButton" onClick={(e) => e.preventDefault()}>
                    <NotificationsActiveIcon />
                    {`Sign in to subscribe.`}
                  </button>
                </div>
              </div>
            </div>

            <hr className="Hr" />

            <div className="addComment" onSubmit={(event)=> {event.preventDefault()}} onClick={(event)=> {event.preventDefault()}} >
              <div className="addCommentLeft">
                <img className="addCommentPerson" src={person} alt="" />
              </div>

              <div className="addCommentRight">
                <input className="addCommentInput" placeholder="Sign in to add a comment." onSbumit={(event)=> {event.preventDefault()}}></input>
                <hr className="addCommentHr" />
              </div>
            </div>

            {videoComments.map(comment=> (
               <Comment key={comment._id} comment={comment}></Comment>
            ))}

          </div>

          <div className="recommendation">
            {randomVideos.map((video) => (
              <RecommendedCard key={video._id} video={video}></RecommendedCard>
            ))}
          </div>

        </div>
      )}
    </>
  );
};

export default Video;
