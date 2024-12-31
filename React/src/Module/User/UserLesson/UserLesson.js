import React, { useEffect, useState } from 'react';
import Header from '../../../Components/Header/Header';
import './UserLesson.css';
import {  MdKeyboardArrowRight } from 'react-icons/md';
import { BsFillStickiesFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import KeyFea1 from './KeyFea1.webp';
import KeyFea2 from './KeyFea2.webp';
import KeyFea3 from './KeyFea3.webp';
import KeyFea4 from './KeyFea4.webp';
import KeyFea5 from './KeyFea5.webp';
import KeyFea6 from './KeyFea6.webp';
import learner1 from './learner1.webp';
import learner2 from './learner2.webp';
import learner3 from './learner3.webp';

import { Group, Text, Collapse } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UserLesson() {
  const navigate = useNavigate();

  const [opened, { toggle }] = useDisclosure(false);

  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState({});
  const [enroll, setEnroll] = useState(null);

  const token = localStorage.getItem('token');
  const { courseId } = useParams();
  const user_id = localStorage.getItem('id');

  useEffect(() => {
    axios.get(`http://localhost:8080/courses/viewCourseById/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error('Error fetching course data', error);
      });

    axios.get(`http://localhost:8080/courses/courseWithLessons/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        setLessons(response.data.lesson);
      })
      .catch((error) => {
        console.error('Error fetching lesson data', error);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const enrollment = {
      EnrolledAt: new Date().toISOString(),
    };

    axios.post(`http://localhost:8080/enrollment/addEnroll/${user_id}/${courseId}`, enrollment, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        setEnroll(response.data);
        alert('Enrolled');
        navigate('/course');
      })
      .catch((error) => {
        console.error('Error while enrolling', error);
      });
  }

  return (
    <>
      <div className='lesson-screen-conatiner'>
        <Header />
        <div className='lessonBanner' key={course.id}>
          <div className='lessonPath'>
            <li className='list'>Home</li>
            <MdKeyboardArrowRight />
            <li className='list'>Courses</li>
            <MdKeyboardArrowRight />
            <li className='currentScreen'>{course.category}</li>
          </div>
          {lessons.map((lesson) => (
            <div className='bannerContent' key={lesson.id}>
              <div className='lessonTitle'>{lesson.title}</div>
              <div className='lessonSub'>Accelerate your Career</div>
              <div className='lessonContent'>{lesson.content1}</div>
              <div className='lessonPrice'>
                <div className='priceText'>Buy this Course @</div>
                <div className='priceNum'><span>₹1000</span> {course.price}</div>
              </div>
              <div className='bannerContainer'>
                <div className='row'>
                  <div className='col'>1 Module
                    <span>with Certifications</span>
                  </div>
                  <div className='border'></div>
                  <div className='col'>{lesson.description}
                    <span>Title</span>
                  </div>
                  <div className='border'></div>
                  <div className='col'>{course.category}
                    <span>Category</span>
                  </div>
                  <div className='border'></div>
                  <div className='col'>{course.language}
                    <span>Language</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Fixed form on the right side */}
        <div className='fixedForm'>
          <h2>Enroll Now</h2>
          <form>
            <label>Name:</label>
            <input type='text' placeholder='Your Name' required/>
            <label>Email:</label>
            <input type='email' placeholder='Your Email' required />
            <label>Phone Number:</label>
            <input type='num' placeholder='Your Phone Number' required/>
            <button type='button' onClick={handleSubmit}>Submit</button>
          </form>
        </div>
        {lessons.map((lesson) => (
          <div className='lessonContent-2' key={lesson.id}>
            <div className='c2Head'><span className="highlight-container"><span className="highlight">What’s</span></span> in it for You?</div>
            <div className='c2HeadContent'>{lesson.content2}</div>
          </div>
        ))}
        <div className='lessonFeatures'>
          <div className='featureTitle'>Key Features</div>
          <div className='keyCards'>
            <div className='keyCard1'>
              <div className='kc1'><img src={KeyFea1} alt='' />Globally Recognised Certification</div>
              <div className='kc1'><img src={KeyFea2} alt='' />100% online and Self-paced learning</div>
            </div>
            <div className='keyCard1'>
              <div className='kc1'><img src={KeyFea3} alt='' />Full lifetime access to all content</div>
              <div className='kc1'><img src={KeyFea4} alt='' />Access to 4 Gamified Practise Platforms</div>
            </div>
            <div className='keyCard1'>
              <div className='kc1'><img src={KeyFea5} alt='' />Dedicated Forum Support to clear all your doubts</div>
              <div className='kc1'><img src={KeyFea6} alt='' />7 Days refund Policy</div>
            </div>
          </div>
        </div>
        {lessons.map((lesson) => (
          <div className='lessonTopic' key={lesson.id}>
            <div className='topicTitle'>
              Topics you will <span className="highlight-container"><span className="highlight">Learn</span></span>
            </div>
            <Group className='moduleGroup'>
              <div className='module' onClick={toggle}>
                <div className='moduleTitle'>Course Module
                  <AiOutlinePlus />
                </div>
                <Collapse in={opened}>
                  <Text className='moduleContent'>
                    <ul key={lesson.id}>
                      <li>{lesson.topic1}</li>
                      <li>{lesson.topic2}</li>
                      <li>{lesson.topic3}</li>
                      <li>{lesson.topic4}</li>
                      <li>{lesson.topic5}</li>
                      <li>{lesson.topic6}</li>
                    </ul>
                  </Text>
                </Collapse>
              </div>
            </Group>
          </div>
        ))}
        {lessons.map((lesson) => (
          <div className='startCourse' key={lesson.id}>
            <div className='startTitle'>All You Need to <span className="highlight-container"><span className="highlight">Start</span></span> this Course</div>
            <div className='startContent'>
              <ul>
                <div className='startsub'>
                  <BsFillStickiesFill className='startIcon' /><li>{lesson.keyFeature1}</li>
                </div>
                <div className='startsub'>
                  <BsFillStickiesFill className='startIcon' /><li>{lesson.keyFeature2}</li>
                </div>
                <div className='startsub'>
                  <BsFillStickiesFill className='startIcon' /><li>{lesson.keyFeature3}</li>
                </div>
              </ul>
            </div>
          </div>
        ))}
        <div className='learner'>
          <div className='learnTitle'>This is the <span className="highlight-container"><span className="highlight">One for You,</span></span> If You are</div>
          <div className='learnerContainer'>
            <div className='lc'>
              <img src={learner1} alt='' />
              <p key={course.id}>Fresher or a student aiming to build your career in {course.category} and other major tech roles.</p>
            </div>
            <div className='lc'>
              <img src={learner2} alt='' />
              {lessons.map((lesson)=>(
              <p>Professionals looking to upskill or revisit the concepts of {lesson.title}.</p>     
              ))}
              </div>
            <div className='lc'>
              <img src={learner3} alt='' />
              <p>Any individuals wanting to work with large amounts of data using {course.category}.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserLesson;
