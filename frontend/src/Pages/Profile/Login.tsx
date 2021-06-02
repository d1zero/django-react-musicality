import React, { SyntheticEvent, useState } from 'react';
import { Redirect, Link } from "react-router-dom";
import { Button, Snackbar, Grid, CssBaseline, Avatar, Container, TextField, Typography, Link as MatUILink } from '@material-ui/core';
import Cookies from 'js-cookie'
import MuiAlert from "@material-ui/lab/Alert";
import { Helmet } from 'react-helmet'
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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

const Login = (props: { setUsername: (username: any) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false);
    const classes = useStyles();


    const handleClose: any = (e: SyntheticEvent) => {
        setOpen(false)
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': '' + Cookies.get('csrftoken')
        }

        let link = ''
        // Production
        link = 'http://musicality.std-1578.ist.mospolytech.ru/user/login'
        // Development
        // link = 'http://localhost:8000/user/login'

        const response = await fetch(link, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json()

        if (content.detail !== 'Incorrect password' && content.detail !== 'User not found' && content.detail !== 'Not activated') {
            setRedirect(true);
            await props.setUsername(content.username)
        } else {
            setOpen(true)
        }
    }

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Helmet><title>Авторизация</title></Helmet>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Войти
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
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Войти
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to='/reset-password' style={{ 'textDecoration': 'none' }}>
                                <MatUILink>
                                    Забыли пароль?
                                </MatUILink>
                            </Link>
                        </Grid>
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
                        <Alert severity="error">Неверная связка логин/пароль или аккаунт не активирован</Alert>
                    </Snackbar>
                </form>
            </div>
        </Container>
    );
};

export default Login;