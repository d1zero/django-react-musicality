import { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Snackbar, Container, CssBaseline, Grid, Avatar, TextField, Typography, Link as MatUILink } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Helmet } from 'react-helmet';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Cookies from "js-cookie"
import axios from 'axios'
import { useStyles } from './RegisterStyles'

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [psw2, setPsw2] = useState('')
    const [open, setOpen] = useState(false)
    const [successRegister, setSuccessRegister] = useState(false)
    const classes = useStyles();

    const handleClose: any = () => {
        setOpen(false)
    }

    const handleSuccessRegisterClose: any = () => {
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

            const headers = {
                'Content-Type': 'application/json',
                'X-CSRFToken': '' + Cookies.get('csrftoken'),
                'Authorization': 'duplexMismatch'
            }

            interface obj {
                id: any,
                email: string[],
                username: string[],
                detail: string
            }
            try {
                const response = await axios(link, {
                    method: 'POST',
                    headers: headers,
                    withCredentials: true,
                    data: {
                        email, username, password
                    }
                })

                const content: obj = await response.data

                if (typeof (content.id) !== 'undefined') {
                    setErrMsg('')
                    document.getElementById('email')?.setAttribute('disabled', 'disabled')
                    document.getElementById('username')?.setAttribute('disabled', 'disabled')
                    document.getElementById('password')?.setAttribute('disabled', 'disabled')
                    document.getElementById('psw2')?.setAttribute('disabled', 'disabled')
                    document.getElementById('btnSubmit')?.setAttribute('disabled', 'disabled')
                    setSuccessRegister(true)
                }

            }
            catch (error: any) {
                const content: obj = await error.response.data
                if (typeof (content.email) !== 'undefined') {
                    if (content.email.toString() === 'Пользователь с таким Email уже существует.') {
                        setErrMsg('Пользователь с таким Email уже существует')
                        setOpen(true)
                    } else {
                        setErrMsg('')
                    }
                }
                else if (typeof (content.username) !== 'undefined') {
                    if (content.username.toString() === 'Пользователь с таким Имя пользователя уже существует.') {
                        setErrMsg('Пользователь с таким именем пользователя уже существует')
                        setOpen(true)
                    }
                }
            }
        } else {
            setErrMsg('Пароли не совпадают')
            setOpen(true)
        }
    }

    if (!successRegister) {
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
                                    onChange={e => { setEmail(e.target.value); setErrMsg('') }}
                                    error={errMsg === 'Пользователь с таким Email уже существует' ? true : false}
                                    helperText={errMsg === 'Пользователь с таким Email уже существует' ? 'Неверно заполнено поле' : ''}
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
                                    onChange={e => { setUsername(e.target.value); setErrMsg('') }}
                                    error={errMsg === 'Пользователь с таким именем пользователя уже существует' ? true : false}
                                    helperText={errMsg === 'Пользователь с таким именем пользователя уже существует' ? 'Неверно заполнено поле' : ''}
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
                                    onChange={e => { setPassword(e.target.value); setErrMsg('') }}
                                    type="password"
                                    error={
                                        errMsg === 'Пароль слишком короткий' || errMsg === 'Пароли не совпадают' ? true : false
                                    }
                                    helperText={
                                        errMsg === 'Пароль слишком короткий' || errMsg === 'Пароли не совпадают'
                                            ? 'Неверно заполнено поле' : ''}
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
                                    onChange={e => { setPsw2(e.target.value); setErrMsg('') }}
                                    type="password"
                                    error={
                                        errMsg === 'Пароли не совпадают' ? true : false
                                    }
                                    helperText={
                                        errMsg === 'Пароли не совпадают'
                                            ? 'Неверно заполнено поле' : ''}
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
    } else {
        return (
            <Container component="main" maxWidth="xs" className={classes.successRegisterAlert}>
                <Helmet><title>Регистрация</title></Helmet>
                <CssBaseline />
                <Alert severity="info">Подтвердите регистрацию в письме, которое было отправлено на указанный email</Alert>
            </Container>
        )
    }
}
    ;

export default Register;