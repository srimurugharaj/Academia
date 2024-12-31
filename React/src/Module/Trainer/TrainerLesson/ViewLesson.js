import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TrainerLesson.css';

function ViewLesson() {
  const { courseId } = useParams();
  const token = localStorage.getItem('token');
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/courses/courseWithLessons/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLessons(response.data.lesson);
      })
      .catch((error) => {
        console.error('Error fetching lesson data', error);
      });
  }, [courseId, token]);

  return (
    <div className="lesson-container">
      {lessons.map((lesson) => (
        <div key={lesson.id} className="lesson-card">
          <h2 className="lesson-title">Lesson Title: {lesson.title}</h2>
          <p className="lesson-description">Sub-Title: {lesson.description}</p>
          <div className="lesson-details">
            <div className="lesson-content">
              <h3 className="section-title">Content 1:</h3>
              <p>{lesson.content1}</p>
            </div>
            <div className="lesson-content">
              <h3 className="section-title">Content 2:</h3>
              <p>{lesson.content2}</p>
            </div>
            <div className="lesson-features">
              <h3 className="section-title">Key Features:</h3>
              <ul>
                <li>{lesson.keyFeature1}</li>
                <li>{lesson.keyFeature2}</li>
                <li>{lesson.keyFeature3}</li>
              </ul>
            </div>
            <div className="lesson-topics">
              <h3 className="section-title">Topics:</h3>
              <ul>
                <li>{lesson.topic1}</li>
                <li>{lesson.topic2}</li>
                <li>{lesson.topic3}</li>
                <li>{lesson.topic4}</li>
                <li>{lesson.topic5}</li>
                <li>{lesson.topic6}</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewLesson;
