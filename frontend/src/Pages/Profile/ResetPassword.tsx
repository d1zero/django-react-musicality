import React, { useState, SyntheticEvent } from 'react'
import { Container, CssBaseline, Avatar, Typography, TextField, Button, Grid, Snackbar, Link as MatUILink } from '@material-ui/core';
import MuiAlert from "@material-ui/lab/Alert";
import { Helmet } from 'react-helmet'
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, Link } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Cookies from "js-cookie"

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [redirect, setRedirect] = useState(false)

    const [successPasswordChange, setSuccessPasswordChange] = useState(false)
    const [open, setOpen] = useState(false)
    const classes = useStyles();

    const handleClose: any = (e: SyntheticEvent) => {
        setOpen(false)
    }

    const handleSuccessRegisterClose: any = () => {
        setSuccessPasswordChange(false)
        setRedirect(true)
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (password.length < 8) {
            setErrMsg('Пароль слишком короткий')
            setOpen(true)
        }
        else if (password === password2) {
            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/user/reset-password'
            // Development
            // link = 'http://localhost:8000/user/reset-password'

            const headers = {
                'Content-Type': 'application/json',
                'X-CSRFToken': '' + Cookies.get('csrftoken')
            }

            const response = await fetch(link, {
                method: 'PATCH',
                headers: headers,
                credentials: 'include',
                body: JSON.stringify({
                    email, username, new_password: password
                })
            })

            interface obj {
                message: string
            }

            const content: obj = await response.json()

            if (content.message === 'success') {
                setSuccessPasswordChange(true)
            } else if (content.message === 'User not found') {
                setErrMsg('Пользователь с указанными email и username не найден!')
                setOpen(true)
            } else {
                setErrMsg('Что-то пошло не так, попробуйте позже')
                setOpen(true)
            }
        } else {
            setErrMsg('Пароли не совпадают')
            setOpen(true)
        }
    }

    if (redirect) {
        return (
            <Redirect to='/login' />
        )
    }

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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="username"
                        label="Имя пользователя"
                        type="text"
                        id="username"
                        onChange={e => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Новый пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password2"
                        label="Повторение пароля"
                        type="password"
                        id="password2"
                        autoComplete="current-password"
                        onChange={e => setPassword2(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Сбросить пароль
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
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                        open={successPasswordChange} autoHideDuration={5000} onClose={handleSuccessRegisterClose}>
                        <Alert severity="success">Пароль успешно сброшен. Перенаправление на страницу входа</Alert>
                    </Snackbar>
                </form>
            </div>
        </Container>
    )
}


export default ResetPassword;