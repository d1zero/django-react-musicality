import './App.scss';
import { AppBar, CardMedia, Container, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

function App() {
    const MatUiLogo = require('./logos/MaterialUiIcon.png')
    const useStyles = makeStyles((theme) => ({
        appbar: {
            minHeight: '64px',
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
        root: {
            marginTop: '10%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title1: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        media: {
            height: '290px',
            width: '290px',
        },
        card: {
            width: '75%',
            minHeight: '270px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 100px',
            margin: '50px 0'
        }
    }))
    const classes = useStyles();

    return (
        <Container className="App">
            <AppBar position="fixed">
                <Container fixed>
                    <Toolbar className={classes.appbar}>
                        <Typography variant="h4" style={{ minWidth: '50%' }}><strong className={classes.title} >Musicality Landing</strong></Typography>
                        <span style={{
                            marginLeft: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', minWidth: '50%'
                        }}>
                            <Typography variant="h6" className={classes.title}><a href="#">Треки</a></Typography>
                            <Typography variant="h6" className={classes.title}><a href="#team">Команда</a></Typography>
                            <Typography variant="h6" className={classes.title}><a href="#technologies">Технологии</a></Typography>
                            <Typography variant="h6" className={classes.title}><a href="#project">Проект</a></Typography>
                        </span>
                    </Toolbar>
                </Container>
            </AppBar >
            <div id="team"></div>
            <div id="technologies" className={classes.root}>
                <Typography variant="h2">Стек технологий</Typography>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image='https://yt3.ggpht.com/a/AATXAJxsPBScekvkyYpv4irPstUUUj5xDe3JDITzCA=s900-c-k-c0xffffffff-no-rj-mo'
                    />
                    <CardContent>
                        <Typography variant="h3">Django</Typography>
                        <Typography variant="body1" style={{ maxWidth: '300px' }}>Технология рэально топ, кто хейтит - даун</Typography>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h3">React</Typography>
                        <Typography variant="body1" style={{ maxWidth: '300px' }}>Технология рэально топ, кто хейтит - даун</Typography>
                    </CardContent>
                    <CardMedia
                        className={classes.media}
                        image='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
                    />
                </Card>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image='https://img.icons8.com/color/480/000000/material-ui.png'
                    />
                    <CardContent>
                        <Typography variant="h3">Material UI</Typography>
                        <Typography variant="body1" style={{ maxWidth: '300px' }}>Технология рэально топ, кто хейтит - даун</Typography>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h3">MySQL</Typography>
                        <Typography variant="body1" style={{ maxWidth: '300px' }}>Технология гавно, кто хейтит - респэкт</Typography>
                    </CardContent>
                    <CardMedia
                        className={classes.media}
                        image='https://ploshadka.net/wp-content/uploads/logo/mysql_logo.png'
                    />
                </Card>
            </div>
            <div id="project"></div>
        </Container>
    );
}

export default App;
