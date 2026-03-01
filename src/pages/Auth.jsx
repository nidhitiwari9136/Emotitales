// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import "./Auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [xy, setXY] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();
  const handleMouseMove = (e) => {
    // Mouse ki position calculate karke card ko halka sa tilt denge
    const x = (window.innerWidth / 2 - e.pageX) / 80;
    const y = (window.innerHeight / 2 - e.pageY) / 60;
    setXY({ x, y });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!username || !password) {
      setMessage("All fields are required");
      return;
    }

    if (!isLogin) {
      if (password.length < 8) {
        setMessage("Password must be at least 8 characters long");
        return;
      }
      if (password !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }
    }

    const url = isLogin
      ? "https://emotitales-backend.onrender.com/api/login/"
      : "https://emotitales-backend.onrender.com/api/register/";

    try {
      const res = await axios.post(url, { username, password });
      if (res.data.message) {
        if (isLogin) {
          localStorage.setItem("user", username);
          navigate("/");
        } else {
          setMessage("Registered successfully. Please login.");
          setIsLogin(true);
        }
      } else {
        setMessage(res.data.error);
      }
    } catch (err) {
      setMessage("Server error. Check backend running.");
    }
  };

  return (
    <div className="auth-page" onMouseMove={handleMouseMove}>
      <div
        className="auth-card"
        style={{ transform: `rotateY(${xy.x}deg) rotateX(${xy.y}deg)` }}
      >
        {/* Header Section */}
        <div className="auth-header">
          <div className="brand-badge">AI Powered Experience</div>
          <h1 className="main-logo">EMOTITALES AI</h1>
          <p className="sub-tagline">{isLogin ? "Welcome back! Please enter your details." : "Create an account to start your journey."}</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* Social Section */}
        <div className="social-login">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              // Isse replace karo:
              const res = await axios.post("https://emotitales-backend.onrender.com/api/google-login/", {
                token: credentialResponse.credential
              });
              if (res.data.message) {
                localStorage.setItem("user", res.data.username);
                navigate("/");
              }
            }}
            onError={() => console.log("Login Failed")}
          />
        </div>

        {/* Footer Section */}
        <div className="auth-footer">
          <p className="switch">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Sign Up" : " Sign In"}
            </span>
          </p>
          {message && <div className="msg-bubble">{message}</div>}
        </div>
      </div>
      {/* <div className="cursor-glow" style={{ left: `${xy.x * 25 + window.innerWidth/2}px`, top: `${xy.y * 25 + window.innerHeight/2}px` }}></div> */}
    </div>
  );
}

export default Auth;