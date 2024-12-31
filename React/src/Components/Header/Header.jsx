import React, { useState, useEffect } from 'react';
import './Header.css';
import { FaAmazon, FaBars, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { MdAccountCircle, MdHelpOutline, MdToc, MdClear } from "react-icons/md";
import { Menu } from '@mantine/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Header() {

  const navigate=useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const token = localStorage.getItem('token');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

  function Profile(){
    navigate('/profile')
  }

  return (
    <div className='header'>
      <div className='navbar'>
        <div className='logo'>
          <a href='/home'>Academia</a>
        </div>
        {token !== null ? ( 
          <ul className='links'>
            <li><a href='/home'>Home</a></li>
            <li><a href='/course'>Courses</a></li>
            <li><a href='/enrolled'>MyCourses</a></li>
            <li><a href='/events-Home'>Events</a></li>
          </ul>
        ) : null}
        {token != null ? ( 
          <div className='action_btn'>
            <Menu width={300}> 
              <Menu.Target>
                <div className='profile-btn' >
                  {userDetails?.name?.charAt(0)?.toUpperCase()}
                </div>
              </Menu.Target>

              <Menu.Dropdown>
                {/* <Menu.Label>Application</Menu.Label> */}
                <Menu.Item className='profile-menuTop'icon={
                  <div className='drop-action_btn'>
                    <div className='drop-profile-btn'>
                      {userDetails?.name?.charAt(0)}
                    </div>
                  </div>}>
                  <div className='profile-drop' key={userDetails.id}>
                    <div className='name'>{userDetails.name}</div>
                    <div className='email'>{userDetails.email}</div>
                  </div>
                </Menu.Item>

                <Menu.Divider />
                
                <Menu.Item className='profile-menuProfile' onClick={Profile}  icon={<MdAccountCircle size={16} />}>MyProfile</Menu.Item>
                <Menu.Divider />
                <Menu.Item className='profile-menu' icon={<MdHelpOutline size={16} />}>Help</Menu.Item>
                <Menu.Item className='profile-menu' color="red" icon={<FaSignOutAlt size={16} />}>Log out</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        ) : null}
        <div className='toggle_btn' onClick={toggleDropdown}>
          {isDropdownOpen ? <MdClear /> : <MdToc />}
        </div>
      </div>
      <div className={`dropdown_menu ${isDropdownOpen ? 'open' : ''}`}>
        <ul>
        <li><a href='/home'>Home</a></li>
          <li><a href='/course'>Courses</a></li>
          <li><a href='/enrolled'>MyCourses</a></li>
          <li><a href='/events'>Events</a></li>
        </ul>
        {/* <a href='#' className='action_btn'>Get Started</a> */}
      </div>
    </div>
  );
}

export default Header;
