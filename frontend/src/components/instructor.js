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
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router"
import ResponsiveAppBar from './navbar';

Axios.defaults.withCredentials = true;


function Instructor() {
    const { instructor_id } = useParams();
    const navigate = useNavigate();

    console.log(instructor_id)

    useEffect(() => {
        if (localStorage.getItem("auth") == 'false') {
            navigate("/login", { replace: true })
        }
    })

    const [instrInfo, setinstrInfo] = useState("");
    const [haveData, sethaveData] = useState(false);

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/instructor/${instructor_id}`).then((response) => {
            setinstrInfo(response.data)
            console.log(response.data)
            sethaveData(true);
        },)
    }, [])

    return (
        <div>
            <ResponsiveAppBar />
            {
                !haveData ? <div> Loading.. </div>
                    :

                    <div className="Home" >
                        <Grid container spacing={2}>
                            <Grid xs={4}>
                                <Box style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                    <Box >
                                        <Card variant="outlined">
                                            <React.Fragment>
                                                <CardContent >
                                                    <Typography component="div" style={{ textAlign: "left" }}>
                                                        name
                                                    </Typography>
                                                    <Typography variant="h4" component="div" style={{ textAlign: "left" }}>
                                                        {instrInfo.instructorInfo[0].name}
                                                    </Typography>
                                                    <Typography component="div" style={{ textAlign: "left" }}>
                                                        id
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ mb: 1.5 }} color="text.secondary" style={{ textAlign: "left" }}>
                                                        {instrInfo.instructorInfo[0].id}
                                                    </Typography>
                                                    <Typography component="div" style={{ textAlign: "left" }}>
                                                        dept name
                                                    </Typography>
                                                    <Typography variant="h5" color="text.secondary" style={{ textAlign: "left" }}>
                                                        {instrInfo.instructorInfo[0].dept_name}
                                                    </Typography>
                                                </CardContent>
                                            </React.Fragment>
                                        </Card>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid xs={8}>
                                <Box>
                                    Current Courses
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>CourseID</TableCell>
                                                    <TableCell >Course name</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {instrInfo.currentCourses.map((row) => (
                                                    <TableRow
                                                        key={row.course_id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            <Link to={`/course/${row.course_id}`}>{row.course_id}</Link>
                                                        </TableCell>
                                                        <TableCell>{row.title}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                                <Box style={{ marginTop: "30px" }}>
                                    Past Courses
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>CourseID</TableCell>
                                                    <TableCell >Course name</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {instrInfo.pastCourses.map((row) => (
                                                    <TableRow
                                                        key={row.course_id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            <Link to={`/course/${row.course_id}`}>{row.course_id}</Link>
                                                        </TableCell>
                                                        <TableCell>{row.title}</TableCell>
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

export default Instructor;
