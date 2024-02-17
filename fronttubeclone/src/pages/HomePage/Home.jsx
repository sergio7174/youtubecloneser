/**Hooks to get State from redux and to get Data from state when component render */
import React, {useState, useEffect} from 'react';
import "./home.css";

import Card from "../../components/Card/Card.jsx";
import axios from "axios";

const Home = ({type}) => {

  // initial local state const--> videos
  const [videos, setVideos] = useState([]);

  useEffect(()=> {
    // buscar videos --> fecthVideos function to get videos from backend
      const fetchVideos = async () => {
        // call api axios to get from backend
        const res = await axios.get(`videos/${type}`);
        // get the videos and save them in the matriz setVideos
        setVideos(res.data);
      }
      // call function fechVideos
      fetchVideos();
  }, [type])

  return (
    <div className='home'>
       {videos.map(video=> (
        <Card key={video._id} video={video}></Card>
       ))}
    </div>
  )
}

export default Home;