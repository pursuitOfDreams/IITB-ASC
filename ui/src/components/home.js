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
import {useState,useEffect} from 'react';
import {Navigate} from 'react-router-dom'
import Axios from 'axios';
import {useNavigate} from 'react-router-dom'

Axios.defaults.withCredentials = true;

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    ) {
        return { name, calories, fat, carbs, protein };
    }
    
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
    
    const card = (
        <React.Fragment>
        <CardContent>
            <Typography variant="h5" component="div">
                Nikhil Manjrekar
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                200050088
            </Typography>
            <Typography variant="body2">
                Computer Science and Engineering
            </Typography>
            <Typography component="div">
                Total credits : 168
            </Typography>
        </CardContent>
    </React.Fragment>
);

function Home() {
    
    const navigate = useNavigate();
    
    useEffect( ()=>{
        if(localStorage.getItem("auth")=='false'){
            navigate("/login", {replace:true})
        }
    })

    const [userInfo , setuserInfo] = useState("");
    const [haveData, sethaveData] = useState(false);


    useEffect(()=>{
        Axios.get("http://localhost:3001/api/student").then((response) =>{
            setuserInfo(response.data)
            console.log(response.data)
            sethaveData(true);
        },)
    }, [])
    
    return (
        <div>
            {
                !haveData 
                ? <div> Loading ... </div>
                :
            <div className="Home" >
                <Grid container spacing={2}>
                    <Grid xs={3}>
                        <Box style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                            <Box >
                                <Card variant="outlined">
                                <React.Fragment>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {userInfo.name}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {userInfo.id}
                                        </Typography>
                                        <Typography variant="body2">
                                            {userInfo.dept_name}
                                        </Typography>
                                        <Typography component="div">
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
                            Current Courses
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
                                        {userInfo.coursesTaken.map((row) => (
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
                                                <TableCell align="right">{row.sec_id}</TableCell>
                                                <TableCell align="right">{row.semester}</TableCell>
                                                <TableCell align="right">{row.year}</TableCell>
                                                <TableCell align="right">{row.grade}</TableCell>
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
                                            <TableCell align="left">Course ID</TableCell>
                                            <TableCell>Course Name</TableCell>
                                            <TableCell align="right">Section</TableCell>
                                            <TableCell align="right">Semester</TableCell>
                                            <TableCell align="right">Year</TableCell>
                                            <TableCell align="right">Grade</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userInfo.coursesTaken.map((row) => (
                                            <TableRow
                                                key={row.course_id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left" component="th" scope="row">
                                                    {row.course_id}
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
                        </Box>
                    </Grid>
                </Grid>


            </div>
            }
        </div>
    );
}

export default Home;
