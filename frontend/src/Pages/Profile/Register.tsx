import React, { SyntheticEvent, useState } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { Button, Snackbar, Container, CssBaseline, Grid, Avatar, TextField, Typography, Link as MatUILink } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from "@material-ui/lab/Alert";
import { Helmet } from 'react-helmet';
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [psw2, setPsw2] = useState('')
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [successRegister, setSuccessRegister] = useState(false)
    const classes = useStyles();

    const handleClose: any = () => {
        setOpen(false)
    }

    const handleSuccessRegisterClose: any = () => {
        setSuccessRegister(false)
        setRedirect(true)
    }

    const [errMsg, setErrMsg] = useState('')

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (password.length < 8) {
            setErrMsg('Пароль слишком короткий')
            setOpen(true)
        }
        else if (password === psw2) {
            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/user/register'
            // Development
            // link = 'http://localhost:8000/user/register'

            const response = await fetch(link, {
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
                document.getElementById('email')?.setAttribute('disabled', 'disabled')
                document.getElementById('username')?.setAttribute('disabled', 'disabled')
                document.getElementById('password')?.setAttribute('disabled', 'disabled')
                document.getElementById('psw2')?.setAttribute('disabled', 'disabled')
                document.getElementById('btnSubmit')?.setAttribute('disabled', 'disabled')
                setSuccessRegister(true)
            }
            else if (typeof (content.email) !== 'undefined') {
                if (content.email.toString() === 'Пользователь с таким Email уже существует.') {
                    await setErrMsg('Пользователь с таким Email уже существует')
                    setOpen(true)
                } else {
                    setErrMsg('')
                }
            }
            else if (typeof (content.username) !== 'undefined') {
                if (content.username.toString() === 'Пользователь с таким Имя пользователя уже существует.') {
                    await setErrMsg('Пользователь с таким Именем пользователя уже существует')
                    setOpen(true)
                }
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
            <Helmet><title>Регистрация</title></Helmet>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Зарегистрироваться
                </Typography>
                <form className={classes.form} onSubmit={submit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoFocus
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="username"
                                label="Имя пользователя"
                                type="text"
                                id="username"
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="password"
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="Пароль"
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="psw2"
                                label="Пароль снова"
                                name="psw2"
                                onChange={e => setPsw2(e.target.value)}
                                type="password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        id="btnSubmit"
                    >
                        Зарегистрироваться
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login" style={{ 'textDecoration': 'none' }}>
                                <MatUILink variant="body2">
                                    Уже есть аккаунт? Авторизуйтесь
                                </MatUILink>
                            </Link>
                        </Grid>
                    </Grid>
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                        open={open} autoHideDuration={5000} onClose={handleClose}>
                        <Alert severity="error">{errMsg}</Alert>
                    </Snackbar>
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                        open={successRegister} autoHideDuration={5000} onClose={handleSuccessRegisterClose}>
                        <Alert severity="success">Сейчас вы будете перенаправлены на страницу авторизации</Alert>
                    </Snackbar>
                </form>
            </div>
        </Container>
    );
}
    ;

export default Register;