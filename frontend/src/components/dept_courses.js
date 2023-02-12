import '../App.css';
import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Link,useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react';
import Axios from "axios";
Axios.defaults.withCredentials = true;


function DepartmentCourses() {

    const { dept_name } = useParams();
    const navigate = useNavigate();

    console.log(dept_name)
    
    useEffect( ()=>{
        if(localStorage.getItem("auth")=='false'){
            navigate("/login", {replace:true})
        }
    })

    const [deptcourses , setdeptCourses] = useState("");
    const [haveData, sethaveData] = useState(false);

    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/course/running/${dept_name}`).then((response) =>{
            setdeptCourses(response.data)
            console.log(response.data)
            sethaveData(true);
        },)
    }, [])

    
    return (
        <div>
            {
                !haveData ? <div> Loading.. </div>
                : 

            <div className="departments">
                <Box style={{ marginTop: "30px" }}>
                    {dept_name} Courses
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Course ID</TableCell>
                                    <TableCell>Course Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {deptcourses.map((row) => (
                                    <TableRow
                                        key={row.course_id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left" component="th" scope="row">
                                            <Link to={`/course/${row.course_id}`}>
                                                {row.course_id}
                                            </Link>
                                        </TableCell>
                                        <TableCell >{row.title}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </div>
            }

        </div>
    );
}

export default DepartmentCourses;
