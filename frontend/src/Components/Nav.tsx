import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, Box, Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(1)
    },
    title: {
        color: 'white',
        textDecoration: 'none',
        cursor: 'pointer',
        lineHeight: 1,
        "&:hover": {
            color: 'white',
            textDecoration: 'underline',
        },
        flexGrow: 1,
    }
}))

const Nav = (props: { setUsername: (username: any) => void, username: any }) => {
    const logout = async () => {
        await axios('http://localhost:8000/user/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' + Cookies.get('csrftoken') },
            withCredentials: true
        })
        await props.setUsername('')
    }

    let menu;


    if (props.username === '') {
        menu = (
            <>
                <Box mr={3}>
                    <Button color="inherit" variant="outlined" component={Link} to='/login'>Войти</Button>
                </Box>
                <Button color="secondary" variant="contained" component={Link} to='/register'>Зарегистрироваться</Button>
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

    const classes = useStyles();


    return (
        <AppBar position="fixed">
            <Container fixed>
                <Toolbar>
                    <Typography variant="h4" className={classes.title} component={Link} to='/'><strong>Musicality</strong></Typography>
                    <Typography variant="h6" className={classes.title} component={Link} to='/tracks'>Треки</Typography>
                    <Typography variant="h6" className={classes.title} component={Link} to='/genres'>Жанры</Typography>
                    <Typography variant="h6" className={classes.title} component={Link} to='/playlists'>Плейлисты</Typography>
                    <Typography variant="h6" className={classes.title} component={Link} to='/albums'>Альбомы</Typography>
                    <Typography variant="h6" className={classes.title} component={Link} to='/artists'>Исполнители</Typography>

                    {menu}

                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Nav;