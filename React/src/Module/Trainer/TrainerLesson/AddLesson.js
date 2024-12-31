import React, { useState } from 'react'
import './TrainerLesson.css'
import { useParams } from 'react-router-dom';
import { Input,  Button } from '@mantine/core';
import axios from 'axios';

function AddLesson() {

    const { courseId } = useParams();
    const token=localStorage.getItem('token')
    console.log(courseId)


    const [lessonData, setLessonData] = useState({
        image: '',
        title: '',
        description: '',
        content1: '',
        content2: '',
        keyFeature1: '',
        keyFeature2: '',
        keyFeature3: '',
        topic1: '',
        topic2: '',
        topic3: '',
        topic4: '',
        topic5: '',
        topic6: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setLessonData({ ...lessonData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post(`http://localhost:8080/lesson/addLesson/${courseId}`,lessonData,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }).then((response)=>{
            setLessonData(response.data)
            console.log(response.data);
        }).catch((error)=>{
            console.error("Problem while Posting",error)
        });
        
      };
    
      return (
        <div>
          <div className='lessonHead'>Add Lesson for CourseId {courseId}</div>
          <form className='lessonForm'onSubmit={handleSubmit}>
            <label>Image:</label>
            <Input className='lessonInput'
              type="text"
              name="image"
              value={lessonData.image}
              onChange={handleChange}
            />
    
            <label>Title:</label>
            <Input  className='lessonInput'
              type="text"
              name="title"
              value={lessonData.title}
              onChange={handleChange}
            />
    
            <label>Sub_Title:</label>
            <Input className='lessonInput'
              type="text"
              name="description"
              value={lessonData.description}
              onChange={handleChange}
            />
    
            <label>Content 1:</label>
            <textArea className='textArea'
              name="content1"
              value={lessonData.content1}
              onChange={handleChange}
            />
    
            <label>Content 2:</label>
            <textArea className='textArea'
              name="content2"
              value={lessonData.content2}
              onChange={handleChange}
            />
    
            <label>Key Feature 1:</label>
            <Input className='lessonInput'
              type="text"
              name="keyFeature1"
              value={lessonData.keyFeature1}
              onChange={handleChange}
            />
    
            <label>Key Feature 2:</label>
            <Input className='lessonInput'
              type="text"
              name="keyFeature2"
              value={lessonData.keyFeature2}
              onChange={handleChange}
            />
    
            <label>Key Feature 3:</label>
            <Input className='lessonInput'
              type="text"
              name="keyFeature3"
              value={lessonData.keyFeature3}
              onChange={handleChange}
            />
    
            <label>Topic 1:</label>
            <Input className='lessonInput'
              type="text"
              name="topic1"
              value={lessonData.topic1}
              onChange={handleChange}
            />
    
            <label>Topic 2:</label>
            <Input className='lessonInput'
              type="text"
              name="topic2"
              value={lessonData.topic2}
              onChange={handleChange}
            />
    
            <label>Topic 3:</label>
            <Input className='lessonInput'
              type="text"
              name="topic3"
              value={lessonData.topic3}
              onChange={handleChange}
            />
    
            <label>Topic 4:</label>
            <Input className='lessonInput'
              type="text"
              name="topic4"
              value={lessonData.topic4}
              onChange={handleChange}
            />
    
            <label>Topic 5:</label>
            <Input className='lessonInput'
              type="text"
              name="topic5"
              value={lessonData.topic5}
              onChange={handleChange}
            />
    
            <label>Topic 6:</label>
            <Input className='lessonInput'
              type="text"
              name="topic6"
              value={lessonData.topic6}
              onChange={handleChange}
            />
    
            <Button type="submit">Add Lesson</Button>
          </form>
        </div>
      );
    }
    

export default AddLesson