import React, { useState, useEffect } from "react";
import "./addVideo.css";

import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useSelector} from "react-redux";

const AddVideo = () => {
  
  const navigate = useNavigate();
  // get state.user from redux-store and create a const currentUser to handle state
  const {currentUser} = useSelector(state => state.user);

  // set input data state to save it to database, every input entry has a function to handle its value 
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [videoPreview, setVideoPreview] = useState();
  
  useEffect(() => {
    // function to check if there is a user logged In
    const checkAddVideoAuth = async () => {
      
        if (!currentUser && currentUser === null) {
        navigate("/")
      };
    };
    // function call
    checkAddVideoAuth();
  }, [currentUser]); // render eveytime a currentUser change

  // parameters to locate the position where the proceses video result will be show
  const beingProcessedVideoOptions = {
    className: "toast-position",
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "ligth",
  };
  // parameters to locate the position where the proceses video result error will be show
  const anErrorOptions = {
    className: "toast-position",
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "ligth",
  };

  const send = async () => {

    // data instance of FormData()
    const data = new FormData();

    data.append("title", title);
    data.append("description", description);
    data.append("image", image);
    data.append("file", file);

    alert ("Estoy en addvideo - line 58 - function send")

    // send video data to backend to save it in database
    const res = await axios.post('/videos/', data)

    alert ("Estoy en addvideo - line 62 - function send - res:"+res)

    // if (status === 200) no errors , save ok, show message: Video is being processed, will be uploaded shortly.
    if(res.status === 200 && res.statusText){
       toast.info("Video is being processed, will be uploaded shortly.", beingProcessedVideoOptions);
       setTimeout(()=> {
        // go to / page
          navigate('/')
       }, 6500)
    }
    // if there is something wrong ....show error message
    else if(res.status !== 200){
       toast.error("Something went wrong.", anErrorOptions)
    }
  }

  return (
    <div className='file-upload'>
    <div className='file-upload-wrapper'>
        <h2 className='file-upload-text'>Upload File</h2>

        <form action="#">
        
        <label>Video Name:</label>

            <input className='file-upload-input' type="text" name="title" id=""
                onChange={event=> {
                    const title = event.target.value;
                    setTitle(title);}} placeholder='File Name'>
            </input>

        <label style={{marginTop: "5px"}}>Video Description:</label>
            <input className='file-upload-input' type="text"
                   name="description" id=""
                onChange={event=> {
                    const description = event.target.value;
                    setDescription(description);}} placeholder='File Description'>
            </input>
 
        <label>Video Image:</label>
            <input className='file-upload-input' type="file" name="image"
                id="" accept='.jpg, .jpeg, .png'
                onChange={event => {
                    const image = event.target.files[0];
                    setImage(image);
                    setImagePreview(URL.createObjectURL(event.target.files[0]))
                }}
                placeholder='Image'>
            </input>

            Video File:
            <input className='file-upload-input' type="file" name="file" id=""
                accept='.mp4'
                onChange={event => {
                    const file = event.target.files[0];
                    setFile(file);
                    setVideoPreview(URL.createObjectURL(event.target.files[0]))
                }}
                placeholder='File'>
            </input>
        </form>

        <div className="uploadedFiles">
          
          <div className="uploadedImage">
            Your Video Image:
            <img src={imagePreview} alt="" className="uploadedImagePreview"/>
          </div>
   
          <div className="uploadedVideo">
              Your Video:
             <iframe src={videoPreview} frameborder="0" className="uploaded-video" width={"250px"}></iframe>
          </div>
        </div>

        <button className='file-upload-button' onClick={send}>Upload</button>

    </div>
    <ToastContainer />
</div>
  )
};

export default AddVideo;