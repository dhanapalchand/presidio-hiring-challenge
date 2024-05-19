import React from "react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { authContext } from "../hooks/authContext";
import '../css/LoginComponent.css';
import rectangle from '../images/rectangle.png';
import { API_URL } from "./env";
  
function Login() {
const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { dispatch } = useContext(authContext);
 
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
    if (!rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
  };
 
  const submitHandler = async (e) => {
   
    e.preventDefault();  
    try {
 
      if (!email || !password) {
        setError("Invalid Email or Password. Try Again");
        return;
      }
     // console.log(API_URL);
      console.log("Request start");
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
 
    //  console.log("Response:", response);
 
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        //console.log("User data:", response.data);
        dispatch({ type: "LOGIN", payload: response.data });
        setError("");
        navigate("/");
      } else {
        console.error("Unexpected response status:", response.status);
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An unexpected error occurred. Please try again.");
      if (err.response) {
        // The request was made and the server responded with a status code
        console.error("Server response status:", err.response.status);
        setError(err.response.data.error);
      } else if (err.request) {
        // The request was made but no response was received
        console.error("No response received");
        setError("An error occurred. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request setup error:", err.message);
        setError("An error occurred. Please try again.");
      }
    }
  };
 
 
  return (
    <div className="container-fluid primary-color">
      <section className=" row">
 
         {/* left */}
            <div className="vh-100 col-md-6 d-flex justify-content-center align-items-center">
             <div className="shadow p-5 rounded-3 w-50">  
              <div className='text-left'>  
                <h4 className="mb-4">Login to enter</h4>
 
                <div className="mb-3">
                   <input
                    type="email"
                    className="form-control mb-4 rounded-2"
                     placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
 
                <div className="mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control mb-3 rounded-2"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
 
                <span
                  className="password-toggle-icon position-absolute top-50 end-0 translate-middle-y px-2 pt-1"
                  onClick={togglePasswordVisibility}
                  style={{ color: ' grey' }}
                >
                  {showPassword ? (
                   <ion-icon name="eye-outline"></ion-icon>
                  ) : (                    
                    <ion-icon name="eye-off-outline"></ion-icon>
                  )}
                </span>
              </div>
               
             <br />
 
                 <div>
              {error ? (
                <p className="text-danger">
                 {error}
                </p>
              ) : null}
            </div>
                <div className=''>
                  <button className='button rounded-2 w-100 text-white p-1' onClick={submitHandler}>SIGN IN</button>
                    <div className=' p-3'>
                       Don't have an account? <a href="/" className='link'><Link to="/signup">Sign Up</Link></a>
                    </div>
                </div>
             
            </div>                
          </div>
             </div>  
                {/* right */} 
                <div class="vh-100 col-md-6 d-flex justify-content-end">
                      <div>
                      <img style={{height:"100%",width:"100%"}} src={rectangle} alt="altimage"/>
                       </div>                  
                </div>
      </section>
    </div>
  );
};
 
export default Login;