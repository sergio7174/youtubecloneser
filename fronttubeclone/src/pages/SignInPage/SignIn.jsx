import React, {useState, useEffect} from 'react';
import "./signIn.css";
import logo from "../../assets/logo.png"
import axios from "axios";


import {Link, useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux" // Import hooks useDispatch, 
                              // Importamos el hook para acceder al estado. useSelector

// // Importamos nuestras acciones 
import {loginStart, loginSuccess, loginFailure} from "../../redux/userSlice.js"; 

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {

  // current state.user from redux-store --> to const currentUser
  const {currentUser} = useSelector(state=> state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Inicializamos el disparador.

  useEffect(()=> {
    const checkAuth = async () => {
       // if there is a user logged In --> navigate to "/" 
      
       if(currentUser){navigate("/") }
    }
    // function call
    checkAuth();

  }, [currentUser]); // when currentUser change value, render component ....
   
  // initial state to local const email, password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // options to get the position where the login message is gonna be show
  const loginToastOptions = {
    className: "toast-position",
    position: "top-center",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "ligth",
  };
// options to get the position where the login error message is gonna be show
  const loginErrorToastOptions = {
    className: "toast-position",
    position: "top-center",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    type: "default",
    theme: "ligth",
  };

  // function to handle button login
  const handleLogin = async (e) => {
        e.preventDefault();
        // Disparamos the action loginStart.
        dispatch(loginStart()); /* try with function loginStart in reducers */ 
        try {
          // send email, password to backend using axios  
          const res = await axios.post("auth/signin", {
            email,
            password
          });
          // Disparamos el action loginSuccess y enviamos res.data como payload.
          dispatch(loginSuccess(res.data))
          // show : Process is successful in component, cause login was ok.
          toast.info("Process is successful", loginToastOptions)
          // navigate to "/" in 3500 milisg
          setTimeout(()=> {
            navigate("/");
          }, 3500);
          
        }
        /**If there is an error */
        catch(err){
          // update login state with dispatch(loginFailure() in reducer --> redux-store
          dispatch(loginFailure());
          // show error message in component
          toast.error("Error! Check your informations.", loginErrorToastOptions)
        }
  };

  return (
    <div className='signin'>
      
       <img className='signinLogo' src={logo} alt='' />
      
       <div className='signinWrapper'>
           <h2 className='signinWrapperTitle'>Sign In</h2>

           <input onChange={(e)=> setEmail(e.target.value)} className='signinWrapperInput'
                  type="email" placeholder='E-mail'>
            
           </input>

           <input onChange={(e)=> setPassword(e.target.value)} className='signinWrapperInput'
                  type="password" placeholder='Password'>
           </input>

           <button onClick={handleLogin} className='signinWrapperButton'>Sign In</button>

           <span style={{marginTop:"5px"}}>or</span>

           <span className='signinWrapperText'>Don't you have an account?</span>
           <Link to="/signup" style={{textDecoration: "none", color:"inherit", fontSize:"16px"}}>Sign Up</Link>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignIn;