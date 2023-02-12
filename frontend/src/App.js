import './App.css';
import React from 'react';
import Home from './components/home';
import InstrDepartments from './components/instructors';
import Departments from './components/running_courses';
import DepartmentCourses from './components/dept_courses';
import { Route, Routes } from "react-router-dom";
import Footer from './components/footer';
import { Paper } from '@mui/material';
import Course from './components/course';
import DeptInstructors from './components/dept_instr';
import Instructor from './components/instructor';
import SignIn, { SignOut } from './components/login';
import Registration from './components/registration';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element= {<SignIn />} />
        <Route path='/logout' element= {<SignOut />} />
        <Route path='/home' element= {<Home />} />
        <Route path='/home/registration' element={<Registration />} />
        <Route path='/departments' element= {<InstrDepartments />} />
        <Route path='/departments/:dept_name' element = {<DeptInstructors />} />
        <Route path='/instructor/:instructor_id' element= {<Instructor />} />
        <Route path='/course/running' element= {<Departments />} />
        <Route path='/course/:course_id' element= {<Course />} />
        <Route path='/course/running/:dept_name' element= {<DepartmentCourses />} />
      </Routes>
      <Paper sx={{
                marginTop: 'calc(10% + 60px)',
                position: 'fixed',
                bottom: 0,
                width: '100%'
            }} square variant="outlined">
                <Footer />
            </Paper>
    
    </div>

  );
}

export default App;
