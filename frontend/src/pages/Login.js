import React from 'react'
import { useState } from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"


function Login() {

    const [uid, setuid] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return uid.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    // const updateUser = (event) => {
    //     setUser({ ...user, [event.target.name]: event.target.value })
    //   }
    
    //   const setCookie = (name, value) => {
    //     const d = new Date()
    //     d.setTime(d.getTime() + 3 * 24 * 60 * 60 * 1000)
    //     const expires = 'expires=' + d.toUTCString()
    //     document.cookie = name + '=' + value + ';' + expires + ';path=/'
    //   }
    
    //   // Login user
    //   const loginUser = async (event) => {
    //     event.preventDefault()
    //     try {
    //       const resp = await Axios({
    //         method: 'POST',
    //         url: `${BASE_URL}/auth/login`,
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         data: user
    //       })
    //       setUser({
    //         email: '',
    //         password: ''
    //       })
    //       setAuthUser({
    //         action: LOGIN_USER,
    //         data: resp.data.user
    //       })
    //       setCookie('x-auth-token', resp.data.accessToken)
    //       Axios.defaults.headers.common['x-auth-token'] = resp.data.accessToken
    //       setLogin(true)
    //     } catch (err) {
    //       setNotification({
    //         action: ADD_NOTI,
    //         data: {
    //           id: genId(),
    //           message: err.response.data.message,
    //           type: 'error',
    //           color: 'red'
    //         }
    //       })
    //     }
    //   }

  return (
    <div className='Login'>

    <Form onSubmit={handleSubmit}>

        <Form.Group size="lg" controlId="email">
            <Form.Label>UserID</Form.Label>
            <Form.Control
            autoFocus
            type="int"
            value={uid}
            onChange={(e) => setuid(e.target.value)}
            />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </Form.Group>

        <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
        </Button>

    </Form>  
      
    </div>
  )
}

export default Login


