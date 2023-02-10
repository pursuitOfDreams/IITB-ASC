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
import { Link } from "react-router-dom";
import axios from "axios"

// function createData(
//     name: string,
//     calories: number,
//     fat: number,
//     carbs: number,
//     protein: number,
// ) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];


function InstrDepartments() {

    const [ deptlist, setdeptlist ] = React.useState();

    React.useEffect( ()=> {
        axios.get("http://localhost:3001/api/running").then((response) => {
          setdeptlist(response.data)
        })
      }, [])
    
    return (
        <div>

        <div className="DeptInstructors">
            <Box style={{marginTop : "20px"}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' style={{fontSize : "24px"}}>Departments</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {deptlist.map((value,key) => (
                                <TableRow
                                key={key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align='center' component="th" scope="row">
                                        <Link style={{textDecoration : "none", color : "black"}} to={`/departments/${value.dept_name}`}>{value.dept_name}</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
        </div>
    );
}

export default InstrDepartments;
