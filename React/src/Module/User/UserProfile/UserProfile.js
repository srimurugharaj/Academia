import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import Header from '../../../Components/Header/Header'
import profilePng from './profilePng.png'
import axios from 'axios'

function UserProfile() {

  const[userDetails,setUserDetails]=useState([])

  useEffect(() => {
    const userId = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    axios.get(`http://localhost:8080/users/userDetails/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        setUserDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("error while fetching", error);
      })
  }, []);

  return (
    <div>
        <Header/>
        <div className='profile-main'>
          <div className='profile-title'>Profile</div>
          <div className='profile-cont'>
          <div className='profile-left'>  
          <div className='profile-icon' >
          {userDetails?.name?.charAt(0)}
          </div>
          <div className='profile-name' key={userDetails.id}>
              {userDetails.name}
          </div>
          <hr className='line'></hr>
          <div className='profile-mail'>
              <div className='profileMail'>Email Id <span>(Private to you)</span></div>
              <div className='profileMailId'>{userDetails.email}</div>
          </div>
          </div>
          <div className='profile-right'>
            <img className='profileimg' src={profilePng} alt=''/>
          </div>
          </div>
        </div>
         
    </div>
  )
}

export default UserProfile