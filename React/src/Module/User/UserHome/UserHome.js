import React, { useEffect, useState } from 'react';
import './UserHome.css';
import Header from '../../../Components/Header/Header';
import right from './right.png';
import axios from 'axios';
import { Carousel } from '@mantine/carousel';
import {useNavigate} from 'react-router-dom'

function UserHome() {

  const navigate=useNavigate()
  const [homeCourse, setHomeCourse] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:8080/courses/viewCourse', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHomeCourse(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/quiz/getallQuiz',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        setQuiz(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Problem While Fetching", error);
      });
  }, []);

  function ExploreToLesson(id) {
      navigate(`/lesson/${id}`)
      window.scrollTo(0, 0);
  }
  function ExploreToEvents(id) {
    navigate(`/events/${id}`)
    window.scrollTo(0, 0);
}
  function Explore(){
    navigate('/course')
  }
  function ExploreEvents(){
    navigate('/events-home')
  }

  return (
    <div className='homeCont'>
      <Header />
      <div className='homeMain'>
        <div className='left'>
          <div className='welcome'>Welcome to Academia!</div>
          <div className='welcomeText'>Experience the beauty of education.</div>
          <div className='welcomeText1'>Join us on the road to success.</div>
          <button className='homeBtn' onClick={Explore}>Explore our Programs</button>
          {/* <div className='welcomeQuote'>"An investment in knowledge pays the best interest." - Benjamin Franklin</div> */}
        </div>
        <div className='right'>
          <img className='rightImg' src={right} alt='' />
        </div>
      </div>
    <div className='homeCarousel'>
      <div className='car-title'>Courses</div>
      <Carousel className='carousel'
          slideGap="xs"
          loop
          align="start"
        >
        {homeCourse.map((hc) => (
          <div className='homeSub' key={hc.id} onClick={()=>ExploreToLesson(hc.id)}>
            <div className='sub-card'>
              <div className='sub-img'>
                <img src={hc.image} alt='img' />
              </div>
              <div className='sub-card-content'>
                <div className='sub-card-content-title'>{hc.title}</div>
                <div className='sub-card-content-category'>{hc.category}</div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      <div className='course-car' onClick={Explore}><p>View all Courses</p></div>
      </div>
      
      <div className='event-homeCarousel'>
      <div className='car-title'>Events</div>
      <Carousel className='carousel'
          slideGap="xs"
          loop
          align="start"
        >
         
        {quiz.map((qz) => (
          <div className='home-event-main'>
          <div className='home-event-card' key={qz.id}  onClick={()=>ExploreToEvents(qz.id)}>
            <div className='home-event-card-title'>
            {qz.questions.length > 0 ? qz.questions[0].category : 'Category Not Found'}
            </div>
            <div className='home-event-card-category'>
            {qz.title}
            </div>
          </div>
          </div>
        ))}
      
      </Carousel>
      <div className='course-car' onClick={ExploreEvents}><p>View all Events</p></div>
      </div>

    </div>
  );
}

export default UserHome;
