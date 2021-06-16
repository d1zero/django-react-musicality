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
            <Container maxWidth="sm">
                <Typography variant="body1">
                    Made by <Link href="https://t.me/d1z3ro" style={{ textDecoration: 'none' }} color="secondary">d1zero</Link>
                </Typography>
                <Copyright />
            </Container>
        </footer>
    )
}

export default Footer;