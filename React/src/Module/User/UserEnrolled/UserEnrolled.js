import React, { useEffect, useState } from "react";
import './UserEnrolled.css'
import Header from "../../../Components/Header/Header";
import axios from "axios";

export default function UserEnrolled() {
    const [enrolled, setEnrolled] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {

        const userId = localStorage.getItem('id');

        axios.get(`http://localhost:8080/enrollment/getEnrolled/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setEnrolled(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching enrolled data', error);
            });
    }, [token]);
    

    return (
          
            <div>
            <Header/>
            <section>
              <div className='courseContainer'>
                <div className='courseHead'>My Courses</div>
                <div className='courseCards'>
                  {enrolled.map((enroll) => (
                    <div className='courseCard' key={enroll.course.id}>
                      <img  src={enroll.course.image} alt='' className='courseImg'/ >
                      <h3>{enroll.course.title}</h3>
                      <div className='enrolled-sub-text'>
                        <div className='language'>{enroll.course.language}</div>
                        <div className='enrolled'>0% completed</div>
                      </div>
                    </div>  
                  ))}
                </div>
              </div>
            </section>
          </div>    
    )
}