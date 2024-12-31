import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './Components/Authentication/Auth';
import Course from './Module/User/UserCourses/UserCourse.jsx';
import UserLesson from './Module/User/UserLesson/UserLesson';
import UserEnrolled from './Module/User/UserEnrolled/UserEnrolled';
import UserHome from './Module/User/UserHome/UserHome';
import UserEvents from './Module/User/UserEvents/UserEvents';
import UserProfile from './Module/User/UserProfile/UserProfile';
import UserHomeEvents from './Module/User/UserEvents/UserHomeEvents';

import Sidebar from './Components/Sidebar/Sidebar'
import TrainerCourse from './Module/Trainer/TrainerCourse/TrainerCourse';
import AddLesson from './Module/Trainer/TrainerLesson/AddLesson';
import ViewLesson from './Module/Trainer/TrainerLesson/ViewLesson';
import ViewQuestions from './Module/Trainer/TrainerEvents/ViewQuestions';
import AddQuestions from './Module/Trainer/TrainerEvents/AddQuestions';
import CreateQuiz from './Module/Trainer/TrainerEvents/CreateQuiz';
import ViewQuiz from './Module/Trainer/TrainerEvents/ViewQuiz';
import ViewQuizQuestions from './Module/Trainer/TrainerEvents/ViewQuizQuestions';


function App() {
    return (
    <Router>
      <Routes>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/home' element={<UserHome/>}/>
        <Route path='/course' element={<Course/>}/>
        <Route path='/lesson/:courseId' element={<UserLesson />} />
        <Route path='/enrolled' element={<UserEnrolled/>}/>
        <Route path='/events-home' element={<UserHomeEvents/>}/>
        <Route path='/events/:eventId' element={<UserEvents/>}/>

        <Route path='/trainer-course' element={<Sidebar><TrainerCourse/></Sidebar>}/>
        <Route path='/addLesson/:courseId' element={<Sidebar><AddLesson/></Sidebar>}/>
        <Route path='/viewLesson/:courseId' element={<Sidebar><ViewLesson/></Sidebar>}/>
        <Route path='/viewQuestions' element={<Sidebar><ViewQuestions/></Sidebar>}/>
        <Route path='/addQuestions' element={<Sidebar><AddQuestions/></Sidebar>}/>
        <Route path='/createQuiz' element={<Sidebar><CreateQuiz/></Sidebar>}/>
        <Route path='/viewQuiz' element={<Sidebar><ViewQuiz/></Sidebar>}/>
        <Route path='/ViewQuizQuestions/:eventId' element={<Sidebar><ViewQuizQuestions/></Sidebar>}/>
      </Routes>
    </Router>
    );
}


export default App;
