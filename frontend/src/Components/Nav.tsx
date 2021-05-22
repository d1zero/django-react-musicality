import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Box, Container, Toolbar, Typography, Drawer, useMediaQuery, Button, List, Divider, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AlbumIcon from '@material-ui/icons/Album';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import axios from "axios";
import Cookies from "js-cookie"

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(1)
    },
    title: {
        color: 'white',
        textDecoration: 'none',
        cursor: 'pointer',
        lineHeight: 1,
        flexGrow: 1,
        "&:hover": {
            color: '#f44336',
        },
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}))


const Nav = (props: { setUsername: (username: any) => void, username: any }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);


    const logout = async () => {
        let link = ''
        // Production
        link = 'http://musicality.std-1578.ist.mospolytech.ru/user/logout'
        // Development
        // link = 'http://localhost:8000/user/logout'

        await axios(link, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' + Cookies.get('csrftoken') },
            withCredentials: true
        })
        setOpen(false);
        props.setUsername('')
    }

    let menu;

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    if (props.username === '') {
        menu = (
            <>
                <Box mr={3}>
                    <Button color="inherit" variant="outlined" component={Link} to='/login/'>Войти</Button>
                </Box>
                <Button color="secondary" variant="contained" component={Link} to='/register/'>Зарегистрироваться</Button>
            </>
        )
    } else {
        menu = (
            <>
                <Box mr={3}>
                    <Button color="inherit" variant="outlined" component={Link} to='/profile/'>Профиль</Button>
                </Box>
                <Button color="secondary" variant="contained" onClick={logout} component={Link} to='/'>Выйти</Button>
            </>
        )
    }

    const list = (anchor: 'top') => (
        <div>
            <List>
                <ListItem button onClick={() => setOpen(false)} component={Link} to='/tracks/'>
                    <ListItemIcon><AudiotrackIcon /></ListItemIcon>
                    <ListItemText primary={'Треки'} />
                </ListItem>
                <ListItem button onClick={() => setOpen(false)} component={Link} to='/genres/'>
                    <ListItemIcon><FolderOpenIcon /></ListItemIcon>
                    <ListItemText primary={'Жанры'} />
                </ListItem>
                <ListItem button onClick={() => setOpen(false)} component={Link} to='/playlists/'>
                    <ListItemIcon><ListAltIcon /></ListItemIcon>
                    <ListItemText primary={'Плейлисты'} />
                </ListItem>
                <ListItem button onClick={() => setOpen(false)} component={Link} to='/albums/'>
                    <ListItemIcon><AlbumIcon /></ListItemIcon>
                    <ListItemText primary={'Альбомы'} />
                </ListItem>
                <ListItem button onClick={() => setOpen(false)} component={Link} to='/artists/'>
                    <ListItemIcon><EmojiPeopleIcon /></ListItemIcon>
                    <ListItemText primary={'Исполнители'} />
                </ListItem>
            </List>
            <Divider />
            <List>
                {props.username === '' ? (
                    <List>
                        <ListItem button onClick={() => setOpen(false)} component={Link} to='/login/'>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary={'Войти'} />
                        </ListItem>
                        <ListItem button onClick={() => setOpen(false)} component={Link} to='/register/'>
                            <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
                            <ListItemText primary={'Зарегистрироваться'} />
                        </ListItem>
                    </List>
                ) : (
                    <List>
                        <ListItem button onClick={() => setOpen(false)} component={Link} to='/profile/'>
                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                            <ListItemText primary={'Профиль'} />
                        </ListItem>
                        <ListItem button onClick={() => { logout() }} component={Link} to='/'>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary={'Выйти'} />
                        </ListItem>
                    </List>
                )}

            </List>
        </div >
    );


    return (
        <AppBar position="fixed">
            <Container fixed>
                <Toolbar>
                    <Typography variant="h4" className={classes.title} component={Link} to='/'><strong>Musicality</strong></Typography>
                    {matches ? (
                        <div>
                            <Button onClick={() => setOpen(true)}><IconButton edge="start" aria-label="menu" style={{ color: 'white' }}><MenuIcon /></IconButton></Button>
                            <Drawer anchor={'top'} open={open} onClose={() => setOpen(false)}>
                                {list('top')}
                            </Drawer>
                        </div >
                    ) : (
                        <>
                            <Typography variant="h6" className={classes.title} component={Link} to='/tracks/'>Треки</Typography>
                            <Typography variant="h6" className={classes.title} component={Link} to='/genres/'>Жанры</Typography>
                            <Typography variant="h6" className={classes.title} component={Link} to='/playlists/'>Плейлисты</Typography>
                            <Typography variant="h6" className={classes.title} component={Link} to='/albums/'>Альбомы</Typography>
                            <Typography variant="h6" className={classes.title} component={Link} to='/artists/'>Исполнители</Typography>

                            {menu}
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}


export default Nav;