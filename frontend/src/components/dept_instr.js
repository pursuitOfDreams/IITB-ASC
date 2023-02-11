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
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import Axios from "axios";

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




function DeptInstructors() {
    const { dept_name } = useParams();

    const navigate = useNavigate();
    
    useEffect( ()=>{
        if(localStorage.getItem("auth")=='false'){
            navigate("/login", {replace:true})
        }
    })

    const [deptInfo, setdeptInfo] = useState("");
    const [haveData, sethaveData] = useState(false);


    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/dept_instructors/${dept_name}`).then((response) =>{
            setdeptInfo(response.data)
            console.log(response.data)
            sethaveData(true);
        },)
    }, [])
    return (
        <div>
            {
                !haveData ? <div> Loading </div>
                :

            <div className="departments">
                <Box style={{ marginTop: "30px" }}>
                    {dept_name} Instructors                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Instructor ID</TableCell>
                                    <TableCell>Instructor Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {deptInfo.map((row) => (
                                    
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Link to={`/instructor/${row.id}`}>{row.id}</Link>
                                            </TableCell>
                                            <TableCell>{row.name}</TableCell>
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

export default DeptInstructors;