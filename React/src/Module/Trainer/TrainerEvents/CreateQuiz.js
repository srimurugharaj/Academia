import React, { useState } from 'react';
import axios from 'axios';
import './TrainerEvents.css';

function CreateQuiz() {
  const [category, setCategory] = useState('');
  const [num, setNum] = useState('');
  const [title, setTitle] = useState('');

  const token=localStorage.getItem('token')

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/quiz/create', null, {
  params: {
    category,
    num: parseInt(num),
    title,
  },
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then((response) => {
  setCategory(response.data.category);
  setNum(response.data.num);
  setTitle(response.data.title);
  alert('Assessment Created Successfully');
})
.catch((error) => {
  console.error('Error creating assessment', error);
});

    }      

  return (
    <div>
         <h2>Create Assessment</h2>
      <div className='quiz-form-container'>
     
        <form className='quiz-form' onSubmit={handleSubmit}>
          <div>
            <label className="quiz-label">Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="quiz-input"
            />
          </div>
          <div>
            <label className="quiz-label">Number:</label>
            <input
              type="number"
              value={num}
              onChange={(e) => setNum(e.target.value)}
              required
              className="quiz-input"
            />
          </div>
          <div>
            <label className="quiz-label">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="quiz-input"
            />
          </div>
          <button type="submit" className="quiz-button">Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateQuiz;
