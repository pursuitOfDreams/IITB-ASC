 import './App.css';
 import React from 'react';
 import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
 import Home from "./pages/Home"; 
 import Departments from "./pages/Departments"; 
 import Instructors from "./pages/Instructors"; 
 import Courses from "./pages/Courses";   
 import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      {/* <body>
        <ul className='navbar'>
          
          <li className='navitem'> 
            <Link to="/"> Home </Link>
          </li>
          
          <li className='navitem'> 
            <Link to = "/instructors"> Instructors </Link>
          </li>
          
          <li className='navitem'>
            <Link to = "/departments"> Departments </Link>
          </li>
          
          <li className='navitem'>
            <Link to = "/courses"> Courses </Link>
          </li>
          
        </ul>

      </body> */}

      <Router>
          <div className="navbar">
            <div className="links">
              <Link to="/"> Home </Link>
              <Link to="/courses"> Courses</Link>
              <Link to="/instructors"> Instructors</Link>
              <Link to="/departments"> Departments</Link>
              <Link to="/login"> Login </Link>

              {/* {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              ) : (
                <>
                  <Link to="/"> Home Page</Link>
                  <Link to="/createpost"> Create A Post</Link>
                </>
              )} */}
            </div>
            {/* <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div> */}
          </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
