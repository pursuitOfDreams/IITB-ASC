import '../App.css';
import { Grid, Link } from '@mui/material';
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
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import ResponsiveAppBar from './navbar';

Axios.defaults.withCredentials = true;

function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("auth") == 'false') {
            navigate("/login", { replace: true })
        }
    })

    const [userInfo, setuserInfo] = useState("");
    const [haveData, sethaveData] = useState(false);


    useEffect(() => {
        Axios.get("http://localhost:3001/api/student").then((response) => {
            setuserInfo(response.data)
            console.log(response.data.coursesTaken)
            sethaveData(true);
        },)
    }, [])

    return (
        <div>
            <ResponsiveAppBar />
            {
                !haveData
                    ? <div> Loading ... </div>
                    :
                    <div className="Home" style={{marginTop : "100px"}}>
                        <Grid container spacing={2}>
                            <Grid xs={3}>
                                <Box style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                    <Box >
                                        <Card variant="outlined">
                                            <React.Fragment>
                                                <CardContent >
                                                    <Typography component="div" style={{textAlign : "left"}}>
                                                        name
                                                    </Typography>
                                                    <Typography variant="h4" component="div" style={{textAlign : "left"}}>
                                                        {userInfo.name}
                                                    </Typography>
                                                    <Typography component="div" style={{textAlign : "left"}}>
                                                        id
                                                    </Typography>
                                                    <Typography variant ="h5" sx={{ mb: 1.5 }} color="text.secondary" style={{textAlign : "left"}}>
                                                        {userInfo.id}
                                                    </Typography>
                                                    <Typography component="div" style={{textAlign : "left"}}>
                                                        dept name
                                                    </Typography>
                                                    <Typography variant="h5" color="text.secondary" style={{textAlign : "left"}}>
                                                        {userInfo.dept_name}
                                                    </Typography>
                                                    <Typography component="div" style={{textAlign : "left"}}>
                                                        total credits
                                                    </Typography>
                                                    <Typography component="div" variant='h5' color="text.secondary" style={{textAlign : "left"}}>
                                                        {userInfo.tot_cred}
                                                    </Typography>
                                                </CardContent>
                                            </React.Fragment>
                                        </Card>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid xs={9}>
                                <Box>
                                    <div style={{ fontSize: "25px", textWeight: "bold" }}>Current Courses</div>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">Course ID</TableCell>
                                                    <TableCell>Course Name</TableCell>
                                                    <TableCell align="left">Section</TableCell>
                                                    <TableCell align="left">Semester</TableCell>
                                                    <TableCell align="left">Year</TableCell>
                                                    <TableCell align="left">Grade</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {userInfo.currentCourses.map((row) => (
                                                    <TableRow
                                                        key={row.course_id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align="left" component="th" scope="row">
                                                            <Link href={`/course/${row.course_id}`}>
                                                                {row.course_id}
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell >{row.title}</TableCell>
                                                        <TableCell align="left">{row.sec_id}</TableCell>
                                                        <TableCell align="left">{row.semester}</TableCell>
                                                        <TableCell align="left">{row.year}</TableCell>
                                                        <TableCell align="left">
                                                            <Button variant="outlined" color="error" onClick={(e) => {
                                                                Axios.post("http://localhost:3001/api/drop_course", {
                                                                    course_id: row.course_id,
                                                                    sec_id: row.sec_id,
                                                                    sem: row.semester,
                                                                    year: row.year
                                                                }).then((response) => {

                                                                    console.log(response.data)
                                                                    window.location.reload();
                                                                })
                                                            }}>Drop</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                                <Box style={{ marginTop: "30px" }}>
                                    <div style={{ fontSize: "25px" }}>Past Courses</div>
                                    {userInfo.semList.map((sem) => (
                                        <div style={{marginTop : "30px"}}>
                                            <div style={{textAlign : "left", fontSize : "20px", textWeight : "bold", marginBottom: "20px"}}>{sem}</div>
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="left">Course ID</TableCell>
                                                            <TableCell>Course Name</TableCell>
                                                            <TableCell align="right">Section</TableCell>
                                                            <TableCell align="right">Semester</TableCell>
                                                            <TableCell align="right">Year</TableCell>
                                                            <TableCell align="right">Grade</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {userInfo.coursesTaken[sem].map((row) => (

                                                            <TableRow
                                                                key={row.course_id}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell align="left" component="th" scope="row">
                                                                    <Link href={`/course/${row.course_id}`}>
                                                                        {row.course_id}
                                                                    </Link>
                                                                </TableCell>
                                                                <TableCell >{row.title}</TableCell>
                                                                <TableCell align="right">{row.sec_id}</TableCell>
                                                                <TableCell align="right">{row.semester}</TableCell>
                                                                <TableCell align="right">{row.year}</TableCell>
                                                                <TableCell align="right">{row.grade}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>


                    </div>
            }
        </div>
    );
}

export default Home;
