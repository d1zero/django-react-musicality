import React from 'react'
import { useStyles } from './FooterStyles'
import {Container, Typography, Link} from '@material-ui/core'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Non-Copyright(ибо я не юрист) © '}
            <Link color="inherit" href="/">
                Musicality
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Container maxWidth="xs">
                <Typography variant="body1">
                    Made by <a href="https://t.me/d1z3ro" target='_blank' rel="noreferrer" style={{ textDecoration: 'none', color: '#f44336' }}>d1zero</a>
                </Typography>
                <Copyright />
            </Container>
        </footer>
    )
}

export default Footer;