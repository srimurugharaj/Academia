import React, { useState } from 'react';
import './TrainerEvents.css'; 
import axios from 'axios';

function AddQuestions() {
  const [addQues, setAddQues] = useState({
    category: '',
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddQues({
      ...addQues,
      [name]: value
    });
  };

  const token=localStorage.getItem('token')

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/question/add',addQues,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }).then((response)=>{
        setAddQues(response.data)
        alert("Question Added successfully")
        console.log(response.data);
    }).catch((error)=>{
        console.error("Problem while adding",error)
    })
    
  };

  return (
    <div className="addQues-container">
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-addQues">
          <label className="label">Category:</label>
          <input
            type="text"
            name="category"
            value={addQues.category}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Question:</label>
          <textarea
            type="text"
            name="question"
            value={addQues.question}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Option 1:</label>
          <input
            type="text"
            name="option1"
            value={addQues.option1}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Option 2:</label>
          <input
            type="text"
            name="option2"
            value={addQues.option2}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Option 3:</label>
          <input
            type="text"
            name="option3"
            value={addQues.option3}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Option 4:</label>
          <input
            type="text"
            name="option4"
            value={addQues.option4}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Answer:</label>
          <input
            type="text"
            name="answer"
            value={addQues.answer}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <button type="submit" className="submit-button">Add Question</button>
      </form>
    </div>
  );
}

export default AddQuestions;
