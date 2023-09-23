import React, { useState } from "react";
import './loginStyle.css'
import { LoginUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
const Login = () => {
  // Define two state variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // Create event handlers to update the state when input fields change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle form submission
  const handleSubmit =async (event) => {
    event.preventDefault();
    // Do something with the email and password, e.g., send them to the server
    console.log("Email:", email);
    console.log("Password:", password);

    let user= await LoginUser(email,password)
    console.log('userrruserr',user?.data?.user_detail?.token
    )
    localStorage.setItem('authorization', user?.data?.user_detail?.token);
    
    navigate("/");
  };




  return (
    <div>
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>
        <label htmlFor="username">Email</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Log In</button>
        <div className="social">
          <div className="go">
            <i className="fab fa-google" /> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook" /> Facebook
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
