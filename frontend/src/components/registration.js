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
import Axios from "axios";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { padding } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from 'axios';
import ResponsiveAppBar from './navbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

Axios.defaults.withCredentials = true;




function Registration() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("auth") == 'false') {
      navigate("/login", { replace: true })
    }
  })
  const [courselist, setcourselist] = React.useState();
  const [haveData, sethaveData] = React.useState(false);
  const [courseSel, setcourseSel] = React.useState(false);
  const [selCourseId, setSelCourseId] = React.useState();
  const [section, setSection] = React.useState('');
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [textError, setTextError] = React.useState('');

  React.useEffect(() => {
    Axios.get("http://localhost:3001/api/course/currentCourses").then((response) => {
      console.log(response.data)
      setcourselist(response.data)
      sethaveData(true)
    })
  }, [])

  return (
    <div>
      <ResponsiveAppBar />
      <div className="departments">
        {
          !haveData

            ? <div> Loading... </div>
            :
            <div>
              
              <Box sx={{ width: '100%' }}>
                <Collapse in={openError}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpenError(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}

                    severity="error"
                  >
                    {textError}
                  </Alert>
                </Collapse>

              </Box>
              <Box style={{ marginTop: "20px", padding: '0px 50px' }}>
                <div style={{ fontSize: "30px" }}>Course Registration</div>

                <Stack spacing={2} sx={{ width: '100%' }} style={{ marginTop: "50px" }}>
                  <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={courselist.courses.map((option) => option.course_id + ' ' + option.title)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search input"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                    )}
                    onChange={(e, value) => {
                      console.log(value)
                      setSelCourseId(value.split(" ")[0])
                      setcourseSel(true)
                    }
                    }
                  />
                </Stack>
              </Box>
            </div>
        }

        {
          courseSel ?
            <TableContainer component={Paper} style={{ marginTop: "50px" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Course ID</TableCell>
                    <TableCell>Course Name</TableCell>
                    <TableCell align="left">Section</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courselist.courses.map((row) => (

                    row.course_id == selCourseId &&
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left" component="th" scope="row"> {row.course_id}</TableCell>
                      <TableCell >{row.title}</TableCell>
                      <TableCell align="left">
                        <div>
                          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-simple-select-helper-label">Section</InputLabel>
                            <Select

                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              value={section}
                              label="section"
                              onChange={(e) => {
                                setSection(e.target.value)
                              }
                              }
                            >
                              {
                                courselist.courseToSec[selCourseId].map((sec) => (
                                  <MenuItem value={sec}>{sec}</MenuItem>
                                ))
                              }
                            </Select>

                          </FormControl>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <Stack spacing={2} direction="row">
                          {/* <Button variant="text">Text</Button> */}
                          <Button variant="contained" onClick={(e) => {
                            Axios.post("http://localhost:3001/api/registration", {
                              course_id: selCourseId,
                              sec_id: section
                            }).then((response) => {
                              console.log(response)
                             
                              console.log(response.data)
                              window.location.reload();
                              // setOpenSuccess(true)


                            }
                            ).catch((err) => {
                              setTextError(err.response.data.message)
                              setOpenError(true)
                              console.log(err.response.data);
                              console.log(err.response.status);
                              console.log(err.response.headers);
                            })
                          }}>Register</Button>
                          {/* <Button variant="outlined">Outlined</Button> */}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            : <div></div>
        }
      </div>
    </div>
  );
}
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top


export default Registration;
