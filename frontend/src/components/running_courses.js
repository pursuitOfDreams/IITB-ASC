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
import Axios from "axios";
import ResponsiveAppBar from './navbar';

Axios.defaults.withCredentials = true;


function Departments() {
    const navigate = useNavigate();

    React.useEffect( ()=>{
        if(localStorage.getItem("auth")=='false'){
            navigate("/login", {replace:true})
        }
    })

    const [ deptlist, setdeptlist ] = React.useState();
    const [ haveData, sethaveData ] = React.useState(false);

    React.useEffect( ()=> {
        Axios.get("http://localhost:3001/api/running").then((response) => {
            console.log(response.data)
            setdeptlist(response.data)
            sethaveData(true)
        })
      }, [])

    console.log(deptlist)

    return (
        <div>
        <ResponsiveAppBar />
        <div className="departments">
        {
                !haveData 
                
                ? <div> Loading... </div>
                :   
                    <Box style={{marginTop : "20px"}}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' style={{fontSize : "24px"}}> Course Departments</TableCell>
                                </TableRow>
                                {deptlist.map((value,key) => (
                                <TableRow
                                key={value.dept_name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align='center' component="th" scope="row">
                                        <Link style={{textDecoration : "none", color : "black"}} to={`/course/running/${value.dept_name}`}>{value.dept_name}</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableHead>
                            <TableBody>
                                
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

            }
        </div>
        </div>
    );
}

export default Departments;
