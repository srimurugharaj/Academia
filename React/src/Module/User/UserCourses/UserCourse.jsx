import React, { useEffect, useState } from 'react'
import './UserCourse.css'
import Header from '../../../Components/Header/Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Course() {
  const navigate = useNavigate();

  const [courses, setCourse] = useState([]);
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:8080/courses/viewCourse', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      setCourse(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data', error);
    });
   
  }, []);

  function goToLesson(courseId) {
    navigate(`/lesson/${courseId}`);
    window.scrollTo(0, 0);
  }

  if (courses.length === 0) {
    return (
      <div>
        <Header/>
        <div className='courseHead'>No Courses</div>
      </div>
    )
  }

  return (
    <div>
      <Header/>
      <section>
        <div className='courseContainer'>
          <div className='courseHead'>Online Courses</div>
          <div className='courseCards'>
            {courses.map((course) => (
              <div className='courseCard' key={course.id}>
                <img  src={course.image} alt='' className='courseImg'/ >
                <h3>{course.title}</h3>
                <div className='sub-text'>
                  <div className='language'>{course.language}</div>
                  <div className='enrolled'>{course.enrolledCount} Enrolled</div>
                </div>
                <div className='price'>{course.price}</div>
                <div className='courseButton'>
                  <button className='courseBtn' onClick={() => goToLesson(course.id)}>Explore</button>
                </div>
              </div>  
            ))}
          </div>
        </div>
      </section>
    </div>    
  )
}

export default Course;
