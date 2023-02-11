import React from 'react'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Departments() {

  const [listofDepts, setlistofDepts] = useState([]);

  useEffect( ()=> {
    axios.get("http://localhost:3001/api/running").then((response) => {
      setlistofDepts(response.data)
    })
  }, [])

  let navigate = useNavigate(); 

  const redirectdept = (dept_name) =>{ 
    let path = `/departments/${dept_name}`; 
    navigate(path);
  }

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

          <div className='heading'>
              Departments
          </div>

          <div className='body'> 
            {listofDepts.map((value, key) => {
              return (
                <div className="post"> 
                  <div className='body'>
                    {/* <button onClick={redirectdept(value.dept_name)}> */}
                      {value.dept_name}
                    {/* </button> */}
                  </div>
                </div>
              )
              
            })}
          </div>
    </div>
  )
}

export default Departments
