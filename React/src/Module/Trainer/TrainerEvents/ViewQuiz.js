import React, { useState, useEffect } from 'react';
import { Button } from '@mantine/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TrainerEvents.css'

function ViewQuiz() {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:8080/quiz/getallQuiz',{
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

  function goToEvents(id) {
    navigate(`/ViewQuizQuestions/${id}`);
  }

  return (
    <div>
      <div className='admin-event-main'>
        {quiz.map((qz) => (
          <div className='admin-event-card' key={qz.id}>
            <div className='admin-event-card-title'>
              {qz.questions.length > 0 ? qz.questions[0].category : 'Category Not Found'}
            </div>
            <div className='admin-event-card-category'>
              {qz.title}
            </div>
            <Button fullWidth variant="gradient" gradient={{ from: 'blue', to: 'teal', deg: 90 }} className='admin-event-card-button' onClick={() => goToEvents(qz.id)}>
              View Questions
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewQuiz;
