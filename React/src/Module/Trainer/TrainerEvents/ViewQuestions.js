import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './TrainerEvents.css'

export default function ViewQuestions() {

    const[questions,setQuestions]=useState([])

    const token=localStorage.getItem('token')

    useEffect(()=>{
        axios.get('http://localhost:8080/question/all',{
            headers:{
                'Authorization': `Bearer ${token}`
            }})
            .then((response)=>{
                setQuestions(response.data)
                console.log(response.data)
            }).catch((error)=>{
                console.error("Problem while Fetching",error)
            })
    },[])

    return (
        <div className="questions-container">
          <h2 className='ques-title'>Questions</h2>
          <div className="questions-list">
            {questions.map((question) => (
              <div className="question-card" key={question.id}>
                <div className="question-cat"> {question.category}</div>
                <div className="question-text">{question.question}</div>
                <ul className="options-list">
                  <li>{question.option1}</li>
                  <li>{question.option2}</li>
                  <li>{question.option3}</li>
                  <li>{question.option4}</li>
                </ul>
                <div className="answer"><span>Answer:</span> {question.answer}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
