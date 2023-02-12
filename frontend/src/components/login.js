import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import { useNavigate,Navigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from "axios";
import { useState,useEffect } from 'react';


Axios.defaults.withCredentials = true;

const theme = createTheme();


export default function SignIn() {
  
  const [login , setLogin] = useState(false);
  const navigate = useNavigate(); 
  
  const [userID, setuserID] = useState("");
  const [pass, setPass] = useState("");

  useEffect( () => {
    if(localStorage.getItem("auth")===true){
      navigate("/home", {replace: true})
    }
  })  

  const [loginStatus, setloginStatus] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    Axios.post("http://localhost:3001/api/auth/login", {
      student_id: userID,
      password: pass
    }).then((response) => {
 
      if(response.status === 401){
        setloginStatus(response.data.message)
      }
      else{
        setLogin(true)
        setloginStatus("Logged in")
        localStorage.setItem("auth", true)
      }
      console.log(response.data)
    })
  };


  return login ? (
      <Navigate to = "/home" />
  ) : (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{marginTop : "100px"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={(e) => { setuserID(e.target.value) }}
              margin="normal"
              required
              fullWidth
              id="userID"
              label="UserID"
              name="userID"
              autoComplete="userID"
              autoFocus
            />
            <TextField
              onChange={(e) => { setPass(e.target.value) }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              LOGIN
            </Button>
          </Box>
        </Box>
        <div>
          {loginStatus}
        </div>
      </Container>
    </ThemeProvider>
  );
}


export function SignOut(){

  const navigate = useNavigate();
  
  useEffect(()=>{
    Axios.get("http:/localhost:3001/api/auth/logout")
    localStorage.setItem("auth", false);
    navigate("/login", {replace: true})
  })

}
  
