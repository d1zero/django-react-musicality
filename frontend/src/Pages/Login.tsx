import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from "react-router-dom";
import {Input, Button, Snackbar} from '@material-ui/core';
import Cookies from 'js-cookie'
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = (props: { setUsername: (username: any) => void}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false);

    const handleClose: any = (e: SyntheticEvent) => {
        setOpen(false)
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': '' + Cookies.get('csrftoken')
        }
        const response = await fetch('http://localhost:8000/user/login', {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json()

        if (content.detail !== 'Incorrect password' && content.detail !== 'User not found') {
            setRedirect(true);
            await props.setUsername(content.username)
        } else {
            setOpen(true)
        }
    }

    if (redirect) {
        return <Redirect to="/"/>;
    }

    return (
        <form onSubmit={submit}>
            <br/>
            <br/>
            <br/>
            <Input autoFocus={true} onChange={e => setEmail(e.target.value)} placeholder="Email" required
                   type="email"/><br/><br/>
            <Input onChange={e => setPassword(e.target.value)} placeholder="Password" required
                   type="password"/><br/><br/>
            <Button type="submit" color="primary" variant="outlined">Log in</Button>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                      open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert severity="error">Неверная связка логин/пароль</Alert>
            </Snackbar>
        </form>
    );
};

export default Login;