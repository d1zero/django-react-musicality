import React, { useState, SyntheticEvent } from 'react'
import Cookies from "js-cookie"
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { Container, CssBaseline, TextField, Avatar, Typography, Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios'
import { useStyles } from './ConfirmResetPasswordStyles'

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ConfirmResetPassword = (props: any) => {
    const code = props.match.params.confirmCode;
    const classes = useStyles();
    const [redirect, setRedirect] = useState(false)
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [open, setOpen] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [successPasswordChange, setSuccessPasswordChange] = useState(false)

    const handleClose: any = () => {
        setOpen(false)
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (password.length < 8) {
            setErrMsg('Пароль слишком короткий')
            setOpen(true)
        }
        else if (password === password2) {
            const headers = {
                'Content-Type': 'application/json',
                'X-CSRFToken': '' + Cookies.get('csrftoken'),
                'Authorization': 'duplexMismatch'
            }

            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/user/confirm-reset-password/'+code
            // Development
            // link = 'http://localhost:8000/user/confirm-reset-password/' + code

            const response = await axios(link, {
                method: 'PATCH',
                headers: headers,
                withCredentials: true,
                data: { password }
            });

            const content = await response.data

            if (content.message === 'success') {
                setSuccessPasswordChange(true)
                setTimeout(() => {
                    setRedirect(true)
                }, 2500);
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

    if (!successPasswordChange) {
        return (
            <Container component="main" maxWidth="xs" className={classes.successRegisterAlert}>
                <Helmet><title>Смена пароля</title></Helmet>
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
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Повторите пароль"
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
                <Helmet><title>Смена пароля</title></Helmet>
                <CssBaseline />
                <Alert severity="success">Пароль успешно изменён! Дождитесь автоматического перенаправления на страницу авторизации</Alert>
            </Container>
        )
    }
}

export default ConfirmResetPassword