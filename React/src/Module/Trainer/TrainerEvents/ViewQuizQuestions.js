import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ViewQuizQuestions() {

  const [quizData, setQuizData] = useState([]);

  const { eventId } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`http://localhost:8080/quiz/getQuiz/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        setQuizData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Problem while Fetching', error);
      });
  }, []);

 

  return (
    <div>
         {/* <div className='admin-eventSubTitle'>{quizData[0].category}</div> */}
      {quizData.map((qz, index) => (
        <div className='admin-eventSub' key={qz.id}>
          <div className='admin-event-ques'>
            <span className='admin-question-number'>{index + 1}.</span> {qz.question}
          </div>
          <div className='admin-options'>
            <div className='admin-quiz-label'> 
              A. {qz.option1}
            </div>
            <div className='admin-quiz-label'>
              B. {qz.option2}
            </div>
            <div className='admin-quiz-label'>
              C. {qz.option3}
            </div>
            <div className='admin-quiz-label'>
              D. {qz.option4}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
