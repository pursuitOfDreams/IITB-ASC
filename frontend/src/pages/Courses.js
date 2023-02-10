import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';

function Courses() {

  
  const [courseinfo, setcourseinfo] = useState([]);
  const [prereq, setPrereq] = useState([]);
  const [instr, setInstruct] = useState([]);
  
  useEffect( ()=> {
    axios.get("http://localhost:3001/api/course/CS-101").then((response) => {
      setcourseinfo(response.data.courseInfo);
      setPrereq(response.data.course_prereq);
      setInstruct(response.data.course_instructors);
    })
  }, [])
  
  return (
  <div>
        {/* <div className='left'>
            <ul className="nav">
                <li className="navitem"> <a href="/"> Home </a> </li>
                <li className="navitem"> <a href="/courses"> Courses </a> </li>
                <li className="navitem"> <a href="/instructors"> Instructors </a> </li>
                <li className="navitem"> <a href="/departments"> Departments </a> </li>
                <li className="navitem"> <a href="/login"> Login </a></li>
            </ul>
        </div> */}

        <div className = "body">
          <div className='heading'>
              Courses
          </div>

          <div className='listDepts'> 
            {courseinfo.map((value, key) => {
              return <div className="heading"> {value.course_id} </div>
            })}
            {instr.map((value,key) => {
              return <div className='heading'> {value.name} </div>
            })}
          </div>
        </div>
    </div>
  )
}

export default Courses
