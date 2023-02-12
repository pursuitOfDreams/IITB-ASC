import '../App.css';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link,useNavigate } from "react-router-dom";
import Axios from "axios";
import {useState, useEffect} from "react";
import {useParams} from "react-router"
import ResponsiveAppBar from './navbar';

Axios.defaults.withCredentials = true;


function Course(params) {
    const {course_id} = useParams();
    const navigate = useNavigate();

    console.log(course_id)
    
    useEffect( ()=>{
        if(localStorage.getItem("auth")=='false'){
            navigate("/login", {replace:true})
        }
    })

    const [coursedat , setcourseInfo] = useState("");
    const [haveData, sethaveData] = useState(false);

    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/course/${course_id}`).then((response) =>{
            setcourseInfo(response.data)
            console.log(response.data)
            sethaveData(true);
        },)
    }, [])

    const prereqs = [
        { course_id: "CS-151" },
        { course_id: "CS-354" },
        { course_id: "CS-123" },
        { course_id: "CS-103" },
    ]
    return (

        <div>
            <ResponsiveAppBar />
            {
                !haveData ? <div> Loading... </div>
                :

            <div className="Course" >
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <Box style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                            <Box >
                                <Card variant="outlined">
                                <React.Fragment>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {coursedat.courseInfo[0].course_id}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {coursedat.courseInfo[0].title}
                                        </Typography>
                                        <Typography variant="body2">
                                            {coursedat.courseInfo[0].dept_name} 
                                        </Typography>
                                        <Typography component="div">
                                            Credits: {coursedat.courseInfo[0].credits}
                                        </Typography>
                                    </CardContent>
                                </React.Fragment>
                                </Card>
                            </Box>
                            <Box style={{ marginTop: "30px" }}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 50 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align='center' style={{ fontSize: "24px" }}>Prerequisites</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {coursedat.course_prereq.map((row) => (
                                                <TableRow
                                                    key={row.prereq_id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align='center' component="th" scope="row">
                                                        <Link style={{ textDecoration: "none", color: "black" }} to={`/course/${row.prereq_id}`}>{row.prereq_id}</Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>

                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid style={{ marginTop: "50px" }} xs={12}>
                        <Box style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                            Instructors
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell align="right">Name</TableCell>
                                            <TableCell align="right">Department</TableCell>
                                            <TableCell align="right">Semester</TableCell>
                                            <TableCell align="right">Year</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {coursedat.course_instructors.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <Link style={{textDecoration: "none", color : "black"}} to={`/instructor/${row.id}`}>{row.id}</Link>
                                                </TableCell>
                                                <TableCell align="right">{row.name}</TableCell>
                                                <TableCell align="right">{row.dept_name}</TableCell>
                                                <TableCell align="right">{row.semester}</TableCell>
                                                <TableCell align="right">{row.year}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                </Grid>


            </div>
            }
        </div>
    );
}

export default Course;
