import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TrainerCourse.css';
import { Button, Table, Modal, Input } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function TrainerCourse() {
  const navigate = useNavigate();

  const [popup, setPopup] = useState(false);
  const [pop2up, setPop2up] = useState(false);
  const [pop3up, setPop3up] = useState(false);
  const [courseDetails, setCourseDetails] = useState([]);
  const [courseEntity, setCourseEntity] = useState({
    image: '',
    title: '',
    category: '',
    language: '',
    price: '',
  });
  const [deleteCourse, setDeleteCourse] = useState({
    CourseId: '',
  });

  const [lessons, setLessons] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseResponse = await axios.get('http://localhost:8080/courses/viewCourse', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourseDetails(courseResponse.data);
  
        const fetchLessonsForCourse = async (courseId) => {
          try {
            const lessonResponse = await axios.get(`http://localhost:8080/courses/courseWithLessons/${courseId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setLessons((prevLessons) => [
              ...prevLessons,
              { courseId, lessons: lessonResponse.data.lesson },
            ]);
            console.log(lessonResponse.data.lesson, "hello");
          } catch (error) {
            console.error('Error fetching lesson data', error);
          }
        };
  
        for (const course of courseResponse.data) {
          await fetchLessonsForCourse(course.id);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
  
    fetchCourseData();
  }, [token]);
  

  const handleAddCourse = () => {
    axios
      .post('http://localhost:8080/courses/addCourse', courseEntity, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCourseEntity(response.data);
        console.log(response.data);
        setPopup(false);
      })
      .catch((error) => {
        console.error('Error adding a new course', error);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8080/courses/deleteCourse/${deleteCourse.courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Course deleted successfully:', response.data);
        setPop3up(false);
      })
      .catch((error) => {
        if (error.response) {
          console.error('Server responded with error status:', error.response.status);
          console.error('Error data:', error.response.data);
        } else if (error.request) {
          console.error('No response received from the server');
        } else {
          console.error('Error while setting up the request:', error.message);
        }
      });
  };

  function goToLesson(courseId) {
    navigate(`/addLesson/${courseId}`);
  }
  function viewLesson(courseId) {
    navigate(`/viewLesson/${courseId}`);
  }

  return (
    <div>
      <div className='courseTopBtn'>
      <Button className='Delbutton' onClick={() => setPop3up(true)}>Delete</Button>
        <Button className='Updatebutton' onClick={() => setPop2up(true)}>Update</Button>
        <Button className='Addbutton' onClick={() => setPopup(true)}>Add Course</Button>
      </div>

      <Table >
        <thead>
          <tr className='courseTableHead'>
            <th>Id</th>
            <th >Title</th>
            <th>Category</th>
            <th>Language</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {courseDetails.map((course) => (
  <tr key={course.id}>
    <td>{course.id}</td>
    <td>{course.title}</td>
    <td>{course.category}</td>
    <td>{course.language}</td>
    <td>{course.price}</td>
    <td>
      {lessons.some((lesson) => lesson.courseId === course.id && lesson.lessons.length === 0) ? (
        <Button className="addLesson" onClick={() => goToLesson(course.id)}>Add Lesson</Button>
      ) :<Button className="viewLesson" onClick={() => viewLesson(course.id)}>View Lesson</Button>}
    </td>
  </tr>
))}


        </tbody>
      </Table>

      <Modal opened={popup} onClose={() => setPopup(false)} title="Add Course" className="courseaddmodal">
      <label>Image Url</label>
        <Input
          placeholder="Image Url"
          id="title"
          value={courseEntity.title}
          onChange={(e) => setCourseEntity({ ...courseEntity, title: e.target.value })}
        />
        <label>Title</label>
        <Input
          placeholder="Title"
          id="title"
          value={courseEntity.title}
          onChange={(e) => setCourseEntity({ ...courseEntity, title: e.target.value })}
        />
        <label>Category</label>
        <Input
          placeholder="Category"
          id="category"
          value={courseEntity.category}
          onChange={(e) => setCourseEntity({ ...courseEntity, category: e.target.value })}
        />
        <label>Language</label>
        <Input
          placeholder="Language"
          id="language"
          value={courseEntity.language}
          onChange={(e) => setCourseEntity({ ...courseEntity, language: e.target.value })}
        />
        <label>Price</label>
        <Input
          placeholder="Price"
          id="price"
          value={courseEntity.price}
          onChange={(e) => setCourseEntity({ ...courseEntity, price: e.target.value })}
        />
        <Button className='course-top-btn' onClick={handleAddCourse}>Submit</Button>
      </Modal>

      <Modal opened={pop2up} onClose={() => setPop2up(false)} title="Update Course" className="courseaddmodal">
        <label>Id</label>
        <Input placeholder="id" label="id" id="id" />
        <label>title</label>
        <Input placeholder="title" id="title" />
        <label>description</label>
        <Input placeholder="description" id="description" />
        <label>Instructor ID</label>
        <Input placeholder="instructorid" id="InstructorId" />
        <Button className='course-top-btn'>submit</Button>
      </Modal>

      <Modal opened={pop3up} onClose={() => setPop3up(false)} title="Delete Course" className="courseaddmodal">
        <label>Course Id</label>
        <Input
          placeholder="CourseId"
          id="courseId"
          value={deleteCourse.courseId}
          onChange={(e) => setDeleteCourse({ ...deleteCourse, courseId: e.target.value })}
        />
        <Button className='course-top-btn' onClick={handleDelete}>Delete</Button>
      </Modal>
    </div>
  );
}

export default TrainerCourse;
