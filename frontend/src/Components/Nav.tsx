import React from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Container, Toolbar, IconButton, Typography, Box, Button} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles, Dialog, DialogTitle} from "@material-ui/core";

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

const Nav = () => {
    const logout = async () => {
        await fetch('http://localhost:8000/user/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
    }

    let menu;

    if (1) {
        menu = (
            <>
                <Box mr={3}>
                    <Button color="inherit" variant="outlined" component={Link} to='/login'>Log
                        in</Button>
                </Box>
                <Button color="secondary" variant="contained" component={Link} to='/register'>Sign up</Button>
            </>
        )
    } else {
        menu = (
            <Button color="secondary" variant="contained" onClick={logout}>Log out</Button>
        )
    }
    const classes = useStyles()
    return (
        <AppBar position="fixed">
            <Container fixed>
                <Toolbar>
                    <IconButton edge="start" color="inherit"
                                aria-label="menu" className={classes.menuButton}>
                        <MenuIcon/>
                    </IconButton>

                    <Typography variant="h6" className={classes.title} component={Link} to='/'>Home</Typography>
                    <Typography variant="h6" className={classes.title} component={Link} to='/tracks'>Track list</Typography>

                    {menu}

                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Nav;