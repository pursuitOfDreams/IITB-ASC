import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import { Link,useNavigate,Navigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from "axios";
import { useState } from 'react';

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


export default function SignIn() {
  
  const [login , setLogin] = useState(false);
  const navigte = useNavigate(); 
  
  const [userID, setuserID] = useState("");
  const [pass, setPass] = useState("");

  const [loginStatus, setloginStatus] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();


    Axios.post("http://localhost:3001/api/auth/login", {
      student_id: userID,
      password: pass
    }).then((response) => {
 
      if(response.data.message){
        setloginStatus(response.data.message)
      }
      else{
        localStorage.setItem("token", JSON.stringify(response.data['accessToken'] ))
        setLogin(true)
        console.log(response.data['accessToken'])
        // console.log(login)
        setloginStatus("Logged in")
        // navigte("/home", {replace:true})
      }
      console.log(response.data)
    })
  };


  return login ? (
      <Navigate to = "/home" />
  ) : (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}