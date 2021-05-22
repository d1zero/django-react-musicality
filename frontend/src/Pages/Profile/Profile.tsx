import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Tooltip, Button, Dialog, DialogTitle, Input, InputLabel, Box, Typography, Snackbar } from '@material-ui/core';
import MuiAlert from "@material-ui/lab/Alert";
import EditIcon from '@material-ui/icons/Edit';
import Cookies from "js-cookie";
import axios from 'axios'

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface datas {
    id: any,
    email: string,
    username: string,
    avatar: any,
    date_joined: string,
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    edit: {
        color: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.secondary.main,
        }
    },
    dialog: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(2),
    }
}));

const Profile = () => {
    const [data, setData] = useState<datas>({ id: '', email: '', username: '', avatar: '', date_joined: '', })
    const [avatarLink, setAvatarLink]: any = useState('');
    const [open, setOpen] = useState(false)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [failedChangeOpen, setFailedChangeOpen] = useState(false)
    const [successChangeOpen, setSuccessChangeOpen] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [redirect, setRedirect] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleFailedChange = () => {
        setFailedChangeOpen(false)
    }

    const handleSuccessChangeClose = () => {
        setSuccessChangeOpen(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/user/profile'
            // Development
            // link = 'http://localhost:8000/user/profile'

            const response1 = await fetch(
                link, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            }
            )
            const content = await response1.json()

            if (response1.status === 200) {
                await setData(content)
                if (typeof (data.avatar) !== 'object') {

                    // Production
                    setAvatarLink(data.avatar)
                    // Development
                    // setAvatarLink("http://localhost:8000" + data.avatar)

                } else {
                    // Production
                    setAvatarLink('/media/images/users_avatars/d1zero.jpg')
                    // Development
                    // setAvatarLink("http://localhost:8000/media/images/users_avatars/d1zero.jpg")
                }
            } else {
                console.log(222)
            }
        }
        fetchData()
    }, [data.date_joined, data.avatar])

    const submit = async (e: any) => {
        e.preventDefault();
        let link = ''
        // Production
        link = 'http://musicality.std-1578.ist.mospolytech.ru/user/update'
        // Development
        // link = 'http://localhost:8000/user/update'

        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': '' + Cookies.get('csrftoken')
        }

        let bodyData
        let file = e.target[2].files[0]

        if (username === '' && email === '' && typeof (file) === 'undefined') {
            setErrMsg('Ни одно из полей не изменено!')
            setFailedChangeOpen(true)
        } else {
            if (username !== '' && email !== '') {
                bodyData = JSON.stringify({
                    email, username
                })
            } else if (username !== '' && email === '') {
                bodyData = JSON.stringify({
                    username
                })
            } else if (username === '' && email !== '') {
                bodyData = JSON.stringify({
                    email
                })
            }
            const response = await fetch(link, {
                method: 'PATCH',
                headers: headers,
                credentials: 'include',
                body: bodyData,
            })

            interface obj {
                message: string
            }

            const content: obj = await response.json()

            if (content.message === 'success') {
                let inputs = document.getElementsByTagName('input')
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].setAttribute('disabled', 'disabled')
                }
                if (typeof (e.target[2].files[0]) !== 'undefined') {
                    sendImage(e);
                }
                setSuccessChangeOpen(true)
                setTimeout(() => {
                    setOpen(false)
                    setRedirect(true)
                }, 5000);
            } else {
                setErrMsg('Данный email/username занят')
                setFailedChangeOpen(true)
            }
        }

    }

    const sendImage = async (e: any) => {
        e.preventDefault();
        let link = ''
        // Production
        link = 'http://musicality.std-1578.ist.mospolytech.ru/user/update'
        // Development
        // link = 'http://localhost:8000/user/update'

        const headers = {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': '' + Cookies.get('csrftoken')
        }

        let file = e.target[2].files[0]
        let formdata = new FormData()
        formdata.append('image', file)

        const response = await axios(link, {
            method: 'PATCH',
            headers: headers,
            withCredentials: true,
            data: formdata,
        })

        interface obj {
            message: string
        }

        const content: obj = await response.data

        if (content.message === 'success') {
            setSuccessChangeOpen(true)
            // setTimeout(() => {
            //     setOpen(false)
            //     setRedirect(true)
            // }, 5000);
        } else {
            setErrMsg('Не удалось загрузить фото')
            setFailedChangeOpen(true)
        }
    }


    const classes = useStyles()

    if (redirect) {
        return (
            <Redirect to='/' />
        )
    }



    return (
        <div className={classes.root}>
            <Helmet><title>Профиль</title></Helmet>
            {data.id ?
                <Grid container spacing={5}>
                    <Dialog open={open} onClose={handleClose}>
                        <span className={classes.dialog}>
                            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={failedChangeOpen} autoHideDuration={5000} onClose={handleFailedChange}>
                                <Alert severity="error">{errMsg}</Alert>
                            </Snackbar>
                            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={successChangeOpen} autoHideDuration={5000} onClose={handleSuccessChangeClose}>
                                <Alert severity="success">Данные успешно изменены</Alert>
                            </Snackbar>
                            <DialogTitle>Изменение профиля</DialogTitle>
                            <form onSubmit={submit}>
                                <InputLabel>Аватар <br /><Typography variant="caption">* нажмите на изображение, чтобы загрузить новое</Typography></InputLabel>
                                <img
                                    src={avatarLink}
                                    alt={data.username}
                                    style={{ 'borderRadius': '100px', 'width': '200px', 'height': '200px', 'objectFit': 'cover', 'marginBottom': '20px' }}
                                    onClick={() => document.getElementById('imgInput')?.click()}
                                />
                                <InputLabel>Никнейм</InputLabel>
                                <Input placeholder={data.username} type="text" name="username" style={{ 'marginBottom': '20px' }} onChange={e => { setUsername(e.target.value) }} />
                                <InputLabel>Email</InputLabel>
                                <Input placeholder={data.email} type="email" name="email" style={{ 'marginBottom': '20px' }} onChange={e => { setEmail(e.target.value) }} /><br />
                                <input type="file" accept="image/png, image/jpeg" id="imgInput" style={{ 'visibility': 'hidden', 'maxWidth': '200px' }} />
                                <Box>
                                    <Button variant="contained" color="secondary" onClick={() => setOpen(false)}>Отменить изменения</Button>
                                    <Button variant="contained" color="primary" type="submit">Сохранить изменения</Button>
                                </Box>
                            </form>
                        </span>
                    </Dialog>
                    <Grid item sm={6} xs={12} style={{ 'display': 'flex', 'justifyContent': 'flex-end' }}>
                        <Tooltip title="Аватар" aria-label="add">
                            <img
                                src={avatarLink}
                                alt={data.username}
                                style={{ 'borderRadius': '100px', 'width': '200px', 'height': '200px', 'objectFit': 'cover' }}
                            />
                        </Tooltip>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <div style={{ 'display': 'flex', 'alignItems': 'center', 'height': '200px' }}>
                            Никнейм: {data.username}<br />
                            Email: {data.email}<br />
                            Дата регистрации: {data.date_joined.split('T')[0].toString()}<br />
                        </div>
                        <Button variant="outlined" className={classes.edit} onClick={() => setOpen(true)}><EditIcon />Редактировать</Button>
                    </Grid>
                </Grid>
                : <h1>Вы не авторизованы</h1>
            }
        </div>
    );
}

export default Profile;