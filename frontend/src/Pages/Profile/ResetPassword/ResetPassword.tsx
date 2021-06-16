import React, { useState, SyntheticEvent } from 'react'
import { Container, CssBaseline, Avatar, Typography, TextField, Button, Grid, Snackbar, Link as MatUILink } from '@material-ui/core';
import MuiAlert from "@material-ui/lab/Alert";
import { Helmet } from 'react-helmet'
import { Redirect, Link } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Cookies from "js-cookie"
import axios from 'axios';
import {useStyles} from './ResetPasswordStyles'

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('')
    const [redirect, setRedirect] = useState(false)

    const [successPasswordChange, setSuccessPasswordChange] = useState(false)
    const [open, setOpen] = useState(false)
    const classes = useStyles();

    const handleClose: any = (e: SyntheticEvent) => {
        setOpen(false)
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        let link = ''
        // Production
        link = 'http://musicality.std-1578.ist.mospolytech.ru/user/reset-password'
        // Development
        // link = 'http://localhost:8000/user/reset-password'

        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': '' + Cookies.get('csrftoken')
        }

        interface obj {
            message: string
        }

        const response = await axios(link, {
            method: 'POST',
            headers: headers,
            withCredentials: true,
            data: {email}
        })

        const content: obj = await response.data

        if (content.message === 'success') {
            setSuccessPasswordChange(true)
        } else {
            setErrMsg('Пользователь с таким E-mail не найден')
            setOpen(true)
        }
    }


    if (redirect) {
        return (
            <Redirect to='/login' />
        )
    }

    if (!successPasswordChange) {
        return (
            <Container component="main" maxWidth="xs">
                <Helmet><title>Сброс пароля</title></Helmet>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Сброс пароля
                    </Typography>
                    <form className={classes.form} onSubmit={submit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Отправить ссылку для сброса
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/register" style={{ 'textDecoration': 'none' }}>
                                    <MatUILink>
                                        Нет аккаунта? Зарегистрируйтесь
                                    </MatUILink>
                                </Link>
                            </Grid>
                        </Grid>
                        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={open} autoHideDuration={5000} onClose={handleClose}>
                            <Alert severity="error">{errMsg}</Alert>
                        </Snackbar>
                    </form>
                </div>
            </Container>
        )
    } else {
        return (
            <Container component="main" maxWidth="xs" className={classes.successRegisterAlert}>
                <Helmet><title>Сброс пароля</title></Helmet>
                <CssBaseline />
                <Alert severity="info">Перейдите по ссылке в письме, которое было отправлено на указанный email</Alert>
            </Container>
        )
    }
}


export default ResetPassword;