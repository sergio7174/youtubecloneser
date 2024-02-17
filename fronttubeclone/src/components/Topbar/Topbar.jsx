import React, {useState} from "react";
import "./topbar.css";
import logo from "../../assets/logo.png";

import {Link, Navigate, useNavigate} from "react-router-dom";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../redux/userSlice.js";

import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const Topbar = () => {
 
  // const local q
  const [q, setQ] = useState("");
  // const currentUser from redux-toolkit - global
  const {currentUser} = useSelector((state) => state.user);

  const dispatch = useDispatch(); // set global state
  const navigate = useNavigate(); 

  // position and style to show logout message
  const logoutOptions = {
    className: "toast-position",
    position: "top-center",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "ligth",
  };

  // function to handle logout actions
  const handleLogout = async () => {
    // show message in info color, in browser to user when logout
    toast.info("Checking out", logoutOptions);
    setTimeout(()=> { dispatch(logout()); // update user state to redux-store
                      // volver a cargar la url actual, without user
                      window.location.reload();}, 2000);
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topbarLogo">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <img className="topbarLogoImage" src={logo} alt="" />
          </Link>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <span className="topbarLogoText">Youtube</span>
          </Link>
        </div>

       <div className="topbarSearch">
          
         <input className="topbarSearchInput" type="text"
                 placeholder="Search on Youtube.."
                 onChange={(e)=> setQ(e.target.value)}> 
        </input>

          <SearchIcon style={{ color: "white", cursor: "pointer"}} onClick={()=> 
                             {navigate(`/search?q=${q}`)}}/> 
        </div>

        {/**** if there is an user logged in + show the option logout */}
        {currentUser ? ( <button onClick={handleLogout}
              
              style={{
                position: "relative",
                right:"75px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "10px 0px",
                padding: "10px",
                backgroundColor: "transparent",
                border:"none",
                fontSize: "15px",
                cursor: "pointer",
                borderRadius: "3px",
              }}>
              <LogoutIcon style={{ fill: "white" }} />
              <span style={{ color: "white" }}>Log Out</span>
            </button>
      
        ) : (
          <div className="topbarSignIn">
            <Link
              to="/signin"
              style={{ textDecoration: "none", color: "inherit" }}>
              <button className="topbarSignInButton">
                <PersonIcon style={{ fill: "#3ea6ff" }} />
                Sign In
              </button>
            </Link>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Topbar;