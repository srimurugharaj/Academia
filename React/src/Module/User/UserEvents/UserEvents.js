import React, { useEffect, useState } from 'react';
import './UserEvents.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UserEvents() {
  const [quizData, setQuizData] = useState([]);
  const [userResponses, setUserResponses] = useState({});
  const [postResponse, setPostResponse] = useState(null);
  const [isSubmissionValid, setIsSubmissionValid] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState(false);

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

  useEffect(() => {
    if (notificationVisible) {
      const notificationTimeout = setTimeout(() => {
        setNotificationVisible(false);
      }, 5000);

      return () => clearTimeout(notificationTimeout);
    }
  }, [notificationVisible]);

  const handleChoiceChange = (questionId, choice) => {
    setUserResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: choice,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allQuestionsAnswered = quizData.every((qz) => userResponses[qz.id]);

    if (!allQuestionsAnswered) {
      setIsSubmissionValid(false);
      setNotificationVisible(true);
    } else {
      const responses = quizData.map((qz) => ({
        id: qz.id,
        response: userResponses[qz.id],
      }));

      axios
        .post(`http://localhost:8080/quiz/submit/${eventId}`, responses, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log('POST request successful:', response.data);

          setPostResponse(response.data);
          setIsSubmissionValid(true);
          setNotificationVisible(true);
        })
        .catch((error) => {
          console.error('Error making POST request:', error);
        });
    }
  };

  return (
    <div>
      {quizData.length > 0 && (
        <div className='event-top'>
          <div className='eventSubTitle'>{quizData[0].category}</div>
          <div className='submitBtn'> <button onClick={handleSubmit}>Submit</button></div>
        </div>
      )}
      {quizData.map((qz) => (
        <div className='eventSub' key={qz.id}>
          <div className='event-ques'>{qz.question}</div>
          <label>
            <input
              type='radio'
              name={`choice-${qz.id}`}
              value={qz.option1}
              checked={userResponses[qz.id] === qz.option1}
              onChange={() => handleChoiceChange(qz.id, qz.option1)}
            />
            {qz.option1}
          </label>
          <label>
            <input
              type='radio'
              name={`choice-${qz.id}`}
              value={qz.option2}
              checked={userResponses[qz.id] === qz.option2}
              onChange={() => handleChoiceChange(qz.id, qz.option2)}
            />
            {qz.option2}
          </label>
          <label>
            <input
              type='radio'
              name={`choice-${qz.id}`}
              value={qz.option3}
              checked={userResponses[qz.id] === qz.option3}
              onChange={() => handleChoiceChange(qz.id, qz.option3)}
            />
            {qz.option3}
          </label>
          <label>
            <input
              type='radio'
              name={`choice-${qz.id}`}
              value={qz.option4}
              checked={userResponses[qz.id] === qz.option4}
              onChange={() => handleChoiceChange(qz.id, qz.option4)}
            />
            {qz.option4}
          </label>
        </div>
      ))}

      {notificationVisible && (
        <div className={`notification ${isSubmissionValid ? 'success' : 'error'}`}>
          {isSubmissionValid ? `POST request response: ${postResponse}` : 'Please answer all questions before submitting.'}
        </div>
        
      )}

    </div>
  );
}
