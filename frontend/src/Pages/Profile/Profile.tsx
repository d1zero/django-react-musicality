import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import { Grid, Tooltip, Button, Dialog, DialogTitle, Input, InputLabel, Box } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

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

    const handleClose = () => {
        setOpen(false)
    }


    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(
                // Production
                'http://musicality.std-1578.ist.mospolytech.ru/user/profile', {
                // Development
                // 'http://localhost:8000/user/profile', {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            }
            )
            const content = await response1.json()

            if (response1.status === 200) {
                await setData(content)
                if (typeof (data.avatar) !== 'object') {

                    // Production
                    await setAvatarLink(data.avatar)
                    // Development
                    // let link = "http://localhost:8000" + data.avatar
                    // await setAvatarLink(link)

                } else {
                    // Production
                    await setAvatarLink('/media/images/users_avatars/d1zero.jpg')
                    // Development
                    // let link = "http://localhost:8000/media/images/users_avatars/d1zero.jpg"
                    // await setAvatarLink(link)
                }
            } else {
                console.log(222)
            }
        }
        fetchData()
    }, [data.date_joined, data.avatar])


    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Helmet><title>Профиль</title></Helmet>
            {data.id ?
                <Grid container spacing={5}>
                    <Dialog open={open} onClose={handleClose}>
                        <span className={classes.dialog}>
                            <DialogTitle>Изменение профиля</DialogTitle>
                            <form onSubmit={() => {
                                console.log(1);
                            }}>
                                <img
                                    src={avatarLink}
                                    alt={data.username}
                                    style={{ 'borderRadius': '100px', 'width': '200px', 'height': '200px', 'objectFit': 'cover', 'marginBottom': '20px' }}
                                    onClick={() => document.getElementById('imgInput')?.click()}

                                />
                                <InputLabel>Никнейм</InputLabel>
                                <Input placeholder={data.username} type="text" style={{ 'marginBottom': '20px' }} />
                                <InputLabel>Email</InputLabel>
                                <Input placeholder={data.email} type="email" style={{ 'marginBottom': '20px' }} />
                                <Input type="file" id="imgInput" style={{ 'visibility': 'hidden' }} />
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
                                onClick={() => console.log('Click')}
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