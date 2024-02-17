import React, {useState, useEffect} from "react";
import "./signUp.css";
import logo from "../../assets/logo.png";

import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useSelector} from "react-redux";

const SignUp = () => {
  // get the state.user from redux-store --> to local const currentUser  
  const {currentUser} = useSelector((state) => state.user);
  const navigate = useNavigate();

  // initialize state to const name, email,password,confirmpassword
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // hook to get seconds effects when component is render 
  useEffect(() => {
    
    const checkAuth = async () => {
      // if there is an user logged in, navigate to "/"  
      
      if (currentUser) { navigate("/");}
    };
    // function call
    checkAuth();
  }, []);

   // options to get the position where the register message is gonna be show
  const toastOptions = {
    className: "toast-position",
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "ligth",
  };
 // options to get the position where the register error message is gonna be show
  const errorToastOptions = {
    className: "toast-position",
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    type: "default",
    theme: "ligth",
  };

  /**function to handle local validation in form 
   * toast.error: error message to show - errorToastOptions: where is going to be show message
  */
  const handleValidation = async () => {
    if (name === "") { toast.error("Please provide a name", errorToastOptions);
    } else if (name.length < 3) {
      toast.error("Please provide a longer name", errorToastOptions);
    } else if (email === "") {
      toast.error("Please provide an email", errorToastOptions);
    } else if (email.length < 5) {
      toast.error("Please provide a longer name", errorToastOptions);
    } else if (password === "") {
      toast.error("Please provide an password", errorToastOptions);
    } else if (confirmPassword === "") {
      toast.error("Please provide confirm password.", errorToastOptions);
    } else if (password !== confirmPassword) {
      toast.error("Passwords will be same", errorToastOptions);
    }
  };
  // function create user
  const createUser = async () => {
    // if handleValidation === true, 
    if (handleValidation) {
      try {
        // send name, email,password to backend using axios method POST
        await axios.post(`/auth/signup`, {
          name,
          email,
          password,
        });
        // show message: Process is successful in component, toastOptions: where will be show message
        toast.info("Process is successful", toastOptions);
        // navigate to /signin in 3000 milisg
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
        // if there is an error, show message: Error! Check your informations.
      } catch (err) {
        toast.error("Error! Check your informations.", errorToastOptions);
      }
    }
  };

  return (
    <div className="signup">
      <img className="signupLogo" src={logo} alt="" />

      <div className="signupWrapper">
        <h1 className="signupWrapperTitle">Sign Up</h1>

        <input onChange={(event) => {
            // handle input entry
            const name = event.target.value;
            // change name state with new state in function setName.
            setName(name);
          }}
          className="signupWrapperInput"
          type="name"
          placeholder="Name">

          </input>

        <input onChange={(event) => {
            // handle input entry
            const email = event.target.value;
            // change email state with new state in function setEmail.
            setEmail(email);
          }}
          className="signupWrapperInput"
          type="email"
          placeholder="E-mail">

          </input>

        <input
          onChange={(event) => {
            const password = event.target.value;
            // change password state with new state in function setPassword.
            setPassword(password);
          }}
          className="signupWrapperInput"
          type="password"
          placeholder="Password">

          </input>

        <input onChange={(event) => {
            // handle input entry
            const confirmPassword = event.target.value;
            // change confirmPassword state with new state in function setConfirmPassword.
            setConfirmPassword(confirmPassword);
          }}
          className="signupWrapperInput"
          type="password"
          placeholder="Confirm Password">

          </input>

        <button className="signupWrapperButton"
                type="submit" onClick={createUser}>
          Sign Up
        </button>

        <span className="signupWrapperText">Have you an account?</span>
        <Link to="/signin"
          style={{
            textDecoration: "none",
            color: "inherit",
            fontSize: "16px",
          }}>
          Sign In
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
