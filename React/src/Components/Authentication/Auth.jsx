import React, { useState } from 'react';
import axios from 'axios'; 
import './Auth.css';
import { MdAccountBox } from 'react-icons/md';
import { BiLogoGmail } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';
import SignIn from './SignIn.png';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const navigate=useNavigate()
  const [action, setAction] = useState('Sign Up');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all fields.');
      return;
    }

    axios.post('http://localhost:8080/users/new',formData).then((response)=>{
      alert("User Registered Successfully")
      setAction('Login')
    })
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please fill in all fields.');
      return;
    }
    
    axios.post('http://localhost:8080/users/login',
    {email: formData.email,
    password: formData.password})
    .then((response)=>{

      if(response.data.token!==null)
      {
        let listvar = response.data.token.role[0].authority;
        localStorage.setItem("token",response.data.token.token);
        localStorage.setItem("id",response.data.userId);

        if (listvar === 'ROLE_USER' ) {
          navigate('/home');
          alert("User Login Successfull")
        } else if(listvar === 'ROLE_ADMIN') {
          navigate('/trainer-course');
          alert("Admin Login Successfull")
        }
      }
      else {
        alert("Invalid Credentials");
      }
    })

    .catch((err) => {
      alert("User not found")
    });
  };

  return (
    <div className="mainAuth">
      <img id='image' src={SignIn} alt="" className="png-image" />
      <div className="authContainer">
        <div className="authHeader">
          <div className="authText">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="authInputs">
          {action === 'Login' ? (
            <div></div>
          ) : (
            <div className="authInput">
              <MdAccountBox className="authIcon" />
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="authInput">
            <BiLogoGmail className="authIcon" />
            <input
              type="email"
              placeholder="Email Id"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="authInput">
            <RiLockPasswordFill className="authIcon" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        {action === 'Sign Up' ? (
          <div></div>
        ) : (
          <div className="forgotPassword">
            Forgot Password? <span>Click here</span>
          </div>
        )}
        <div className="submitContainer">
          {action === 'Login' ? (
            <div className="authSubmit" onClick={handleLogin}>
              Login
            </div>
          ) : (
            <div className="authSubmit" onClick={handleSignup}>
              Sign Up
            </div>
          )}
          <div
            className={action === 'Sign Up' ? 'authSubmit gray' : 'authSubmit gray'}
            onClick={() => {
              setAction(action === 'Sign Up' ? 'Login' : 'Sign Up');
            }}
          >
            {action === 'Sign Up' ? 'Switch to Login' : 'Switch to Sign Up'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
