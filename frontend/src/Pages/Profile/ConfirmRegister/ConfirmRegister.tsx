import React, { useState } from 'react'
import Cookies from "js-cookie"
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { Container, CssBaseline } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import axios from 'axios'
import { useStyles } from './ConfirmRegisterStyles'

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ConfirmRegister = (props: any) => {
    const code = props.match.params.confirmCode;

    const classes = useStyles();
    const [redirect, setRedirect] = useState(false)


    let link = ''
    // Production
    link = 'http://musicality.std-1578.ist.mospolytech.ru/user/confirm-register/'+code
    // Development
    // link = 'http://localhost:8000/user/confirm-register/' + code

    const headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': '' + Cookies.get('csrftoken')
    }

    const patchData = async () => {
        const response = await axios(link, {
            method: 'PATCH',
            headers: headers,
            withCredentials: true,
        })

        interface obj {
            message: string
        }

        const content: obj = await response.data

        if (content.message === 'success') {
            setTimeout(() => {
                setRedirect(true)
            }, 2500);
        }
    }

    patchData()

    if (redirect) {
        return (
            <Redirect to='/login' />
        )
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.successRegisterAlert}>
            <Helmet><title>Подтверждение регистрации</title></Helmet>
            <CssBaseline />
            <Alert severity="success">E-mail успешно подтверждён! Дождитесь автоматического перенаправления на страницу авторизации</Alert>
        </Container>
    )
}

export default ConfirmRegister