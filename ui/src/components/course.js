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
import { Link } from "react-router-dom";


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

const courseInfo = (params) => {
    return (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    CS-101
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Computer Programming
                </Typography>
                <Typography variant="body2">
                    Computer Science and Engineering
                </Typography>
                <Typography component="div">
                    Credits: 6
                </Typography>
                <Typography component="div">
                    Venue: New CSE
                </Typography>
            </CardContent>
        </React.Fragment>
    )
}



function Course() {
    const prereqs = [
        { course_id: "CS-151" },
        { course_id: "CS-354" },
        { course_id: "CS-123" },
        { course_id: "CS-103" },
    ]
    return (
        <div>
            <div className="Course" >
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <Box style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                            <Box >
                                <Card variant="outlined">{courseInfo({})}</Card>
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
                                            {prereqs.map((row) => (
                                                <TableRow
                                                    key={row.course_id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align='center' component="th" scope="row">
                                                        <Link style={{ textDecoration: "none", color: "black" }} to={`/course/${row.course_id}`}>{row.course_id}</Link>
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
                            Current Courses
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Dessert (100g serving)</TableCell>
                                            <TableCell align="right">Calories</TableCell>
                                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <Link style={{textDecoration: "none", color : "black"}} to={`/instructor/${row.name}`}>{row.name}</Link>
                                                </TableCell>
                                                <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                </Grid>


            </div>
        </div>
    );
}

export default Course;
