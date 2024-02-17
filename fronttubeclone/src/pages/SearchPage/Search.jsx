import React, {useState, useEffect} from 'react'
import "./search.css";

import {useLocation} from "react-router-dom";
import SearchCard from "../../components/SearchCard/SearchCard.jsx";

import axios from "axios";

const Search = () => {

  const [videos, setVideos] = useState([]);
  //The useLocation hook returns the location object from the current URL, which includes the following:

/*  pathname: This is the path of the URL.
    search: This is the query string (?) included in the URL.
    hash: This is the result of the hash fragment (#) from the URL.*/
  const query = useLocation().search;

  useEffect(()=> {
    // buscar videos --> fetchVideos function
    const fetchVideos = async () => {
        const res = await axios.get(`/videos/search${query}`);
        setVideos(res.data); // change video state getting data from backend to function setVideos
    }
    // function call
    fetchVideos();
  }, [query])

  return (
    <div className='search'>
       {videos.map((video)=> (
         <SearchCard key={video._id} video={video}></SearchCard>
       ))}
    </div>
  )
}

export default Search;