import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { Button, Input, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Helmet } from 'react-helmet'

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [psw2, setPsw2] = useState('')
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false);

    const handleClose: any = () => {
        setOpen(false)
    }

    const [errMsg, setErrMsg] = useState('')

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (password.length < 8) {
            setErrMsg('Пароль слишком короткий')
            setOpen(true)
        }
        else if (password === psw2) {
            const response = await fetch('http://localhost:8000/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email, username, password
                })
            })

            interface obj {
                id: any,
                email: string[],
                username: string[],
                detail: string
            }

            const content: obj = await response.json()

            if (typeof (content.id) !== 'undefined') {
                await setErrMsg('')
                setRedirect(true)
            }
            else if (typeof (content.email) !== 'undefined') {
                if (content.email.toString() === 'Пользователь с таким Email уже существует.') {
                    await setErrMsg(content.email.toString())
                    setOpen(true)
                } else {
                    setErrMsg('')
                }
            }
            else if (typeof (content.username) !== 'undefined') {
                if (content.username.toString() === 'Пользователь с таким Username уже существует.') {
                    await setErrMsg(content.username.toString())
                    setOpen(true)
                }
            }
        } else {
            setErrMsg('Пароли не совпадают')
            setOpen(true)
        }
    }


    if (redirect) return <Redirect to='/login' />


    return (
        <form onSubmit={submit}>
            <Helmet><title>Регистрация</title></Helmet>
            <br />
            <br />
            <br />
            <Input autoFocus={true} onChange={e => setEmail(e.target.value)} placeholder="Email" required
                type="email" /><br /><br />
            <Input onChange={e => setUsername(e.target.value)} placeholder="Username" required type="text" /><br /><br />
            <Input onChange={e => setPassword(e.target.value)} placeholder="Password" required
                type="password" /><br /><br />
            <Input onChange={e => setPsw2(e.target.value)} placeholder="Password" required
                type="password" /><br /><br />
            <Button type="submit" color="primary" variant="outlined">Register</Button>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert severity="error">{errMsg}</Alert>
            </Snackbar>
        </form>
    );
}
    ;

export default Register;