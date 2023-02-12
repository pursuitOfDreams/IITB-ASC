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
  // const [section, setSection] = React.useState('');
  var section = "";


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
              <Box style={{ marginTop: "20px", padding: '0px 50px' }}>
                <div style={{fontSize : "30px"}}>Course Registration</div>

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
                                section = e.target.value
                                // setSection(e.target.value)
                                console.log(section)
                                // setcourseSel(true)
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
                              sec_id : section
                            }).then((response) => {
                              console.log(response.data)
                              window.location.reload();
                            }
                            )
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
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];

export default Registration;
