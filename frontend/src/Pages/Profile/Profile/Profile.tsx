import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { Grid, Tooltip, Button, Dialog, DialogTitle, Input, InputLabel, Box, Typography, Snackbar, CircularProgress } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import MuiAlert from "@material-ui/lab/Alert";
import EditIcon from '@material-ui/icons/Edit';
import Cookies from "js-cookie";
import axios from 'axios'
import FavoriteTracks from '../Favorite/FavoriteTracks/FavoriteTracks';
import FavoriteGenres from '../Favorite/FavoriteGenres/FavoriteGenres';
import FavoritePlaylists from '../Favorite/FavoritePlaylists/FavoritePlaylists';
import FavoriteAlbums from '../Favorite/FavoriteAlbums/FavoriteAlbums';
import FavoriteArtists from '../Favorite/FavoriteArtists/FavoriteArtists';
import { useStyles } from './ProfileStyles'

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

const Profile = (props: { setUsername: (username: any) => void, username: string }) => {
    const [data, setData] = useState<datas>({ id: '', email: '', username: '', avatar: '', date_joined: '', })
    const [avatarLink, setAvatarLink] = useState('');
    const [open, setOpen] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successDeleteOpen, setSuccessDeleteOpen] = useState(false)
    const [failedChangeOpen, setFailedChangeOpen] = useState(false)
    const [successChangeOpen, setSuccessChangeOpen] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [loader, setLoader] = useState(false)

    const theme = createMuiTheme();

    theme.typography.h1 = {
        fontSize: '6rem',
        '@media (min-width:600px)': {
            fontSize: '6rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '2rem',
        },
    };


    const handleClose = () => {
        setOpen(false)
    }

    const handleFailedChange = () => {
        setFailedChangeOpen(false)
    }

    const handleSuccessChangeClose = () => {
        setSuccessChangeOpen(false)
    }

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoader(true)
            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/user/profile'
            // Development
            // link = 'http://localhost:8000/user/profile'

            try {
                const response1 = await axios(
                    link, {
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'duplexMismatch' },
                    withCredentials: true,
                }
                )
                const content = await response1.data

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
                setTimeout(() => {
                    setLoader(false)
                }, 300);

            } catch (error) {
                console.log(error);

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
            'X-CSRFToken': '' + Cookies.get('csrftoken'),
            'Authorization': 'duplexMismatch'
        }

        let bodyData
        let file = e.target[2].files[0]

        if (username === '' && email === '' && typeof (file) === 'undefined') {
            setErrMsg('Ни одно из полей не изменено!')
            setFailedChangeOpen(true)
        } else {
            if (username !== '' && email !== '') {
                bodyData = {
                    email, username
                }
            } else if (username !== '' && email === '') {
                bodyData = {
                    username
                }
            } else if (username === '' && email !== '') {
                bodyData = {
                    email
                }
            }

            const response = await axios(link, {
                method: 'PATCH',
                headers: headers,
                withCredentials: true,
                data: bodyData,
            })

            interface obj {
                message: string
            }

            const content: obj = await response.data

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

    const deleteAccount = async (e: any) => {
        e.preventDefault();
        let link = ''
        // Production
        link = 'http://musicality.std-1578.ist.mospolytech.ru/user/delete'
        // Development
        // link = 'http://localhost:8000/user/delete'

        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': '' + Cookies.get('csrftoken'),
            'Authorization': 'duplexMismatch'
        }

        let bodyData

        if (password !== '') {
            bodyData = {
                username: data.username, password,
            }

            const response = await axios(link, {
                method: 'DELETE',
                headers: headers,
                withCredentials: true,
                data: bodyData,
            })

            interface obj {
                message: string
            }

            const content: obj = await response.data

            if (content.message === 'success') {
                setOpenDeleteModal(false)
                setSuccessDeleteOpen(true)
                props.setUsername('')
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
            'X-CSRFToken': '' + Cookies.get('csrftoken'),
            'Authorization': 'duplexMismatch'
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
            <Redirect to='/register' />
        )
    }


    if (!successDeleteOpen) {
        return (
            <div className={classes.root}>
                <Helmet><title>Профиль</title></Helmet>
                {loader
                    ? <CircularProgress className={classes.loader} />
                    :
                    <>
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
                                                <Button variant="contained" color="secondary" onClick={() => setOpen(false)} style={{ 'marginRight': '24px' }}>Отменить изменения</Button>
                                                <Button variant="contained" color="primary" type="submit">Сохранить изменения</Button>
                                            </Box>
                                        </form>
                                    </span>
                                </Dialog>

                                <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
                                    <span className={classes.dialog}>
                                        <DialogTitle>Удаление аккаунта</DialogTitle>
                                        <form onSubmit={deleteAccount}>
                                            <InputLabel>Пароль</InputLabel>
                                            <Input type="password" name="password" style={{ 'marginBottom': '20px' }} onChange={e => { setPassword(e.target.value) }} />
                                            <input type="file" accept="image/png, image/jpeg" id="imgInput" style={{ 'visibility': 'hidden', 'maxWidth': '200px' }} />
                                            <Box>
                                                <Button variant="contained" color="secondary" type="submit">Удалить аккаунт</Button>
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
                                    <div style={{ 'display': 'flex', 'flexDirection': 'column', 'maxHeight': '200px', 'minHeight': '200px' }}>
                                        <span style={{ 'display': 'flex', 'flexDirection': 'row', 'alignItems': 'center' }}>
                                            <h3>Никнейм:</h3>&nbsp;{data.username}
                                        </span>
                                        <span style={{ 'display': 'flex', 'flexDirection': 'row', 'alignItems': 'center' }}>
                                            <h3>Email:</h3>&nbsp;{data.email}
                                        </span>
                                        <span style={{ 'display': 'flex', 'flexDirection': 'row', 'alignItems': 'center' }}>
                                            <h3>Дата регистрации:</h3>&nbsp;{data.date_joined.split('T')[0].toString()}
                                        </span>
                                    </div>
                                </Grid>

                                <Grid container style={{ justifyContent: 'center' }}>
                                    <Grid item style={{ marginRight: '4px' }}>
                                        <Button variant="outlined" className={classes.edit} onClick={() => setOpen(true)}><EditIcon />Редактировать</Button>
                                    </Grid>
                                    <Grid item style={{ marginLeft: '4px' }}>
                                        <Button variant="outlined" color="secondary" onClick={() => setOpenDeleteModal(true)}><EditIcon />Удалить аккаунт</Button>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <FavoriteTracks />
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <FavoriteGenres />
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <FavoritePlaylists />
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <FavoriteAlbums />
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <FavoriteArtists />
                                </Grid>
                            </Grid>

                            : <ThemeProvider theme={theme}><Typography variant="h1">Вы не авторизованы</Typography></ThemeProvider>
                        }
                    </>
                }
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
                <Helmet><title>Профиль</title></Helmet>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    open={successDeleteOpen} autoHideDuration={5000} onClose={handleSuccessChangeClose}>
                    <Alert severity="success">Аккаунт успешно удалён</Alert>
                </Snackbar>
            </div>
        )
    }
}

export default Profile;