import React, { useEffect, useState } from 'react';
import './App.css';
import Login from "./Pages/Profile/Login";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios'

import Home from "./Pages/Home";
import Register from "./Pages/Profile/Register";
import { Container, CssBaseline, Typography, Link } from '@material-ui/core'
import TrackDetail from "./Pages/Tracks/TrackDetail";
import TrackList from "./Pages/Tracks/TrackList";
import Profile from './Pages/Profile/Profile';
import GenreList from './Pages/Genres/GenreList';
import GenreDetail from './Pages/Genres/GenreDetail';
import PlaylistList from './Pages/Playlists/PlaylistList';
import PlaylistDetail from './Pages/Playlists/PlaylistDetail';
import AlbumList from './Pages/Albums/AlbumList'
import AlbumDetail from './Pages/Albums/AlbumDetail'
import ArtistList from './Pages/Artists/ArtistList';
import ArtistDetail from './Pages/Artists/ArtistDetail';
import { makeStyles } from '@material-ui/core/styles';
import ResetPassword from './Pages/Profile/ResetPassword';
import ConfirmRegister from './Pages/Profile/ConfirmRegister';
import ConfirmResetPassword from './Pages/Profile/ConfirmResetPassword';


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

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: theme.spacing(10),
    },
}));

function App() {
    const [username, setUsername]: any = useState('')

    useEffect(() => {
        const fetchData = async () => {
            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/user/profile'
            // Development
            // link = 'http://localhost:8000/user/profile'

            await axios.get(
                link, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            ).then(res => {
                const content = res.data
                setUsername(content.username)
            }).catch(error => { })
        }
        fetchData()
    }, [])

    const classes = useStyles();

    return (
        <Router>
            <div className="App">
                <Container>
                    <Nav setUsername={setUsername} username={username} />

                    <Switch>
                        <Route path="/" exact component={Home} />

                        <Route path="/login/" component={() => <Login setUsername={setUsername} />} />
                        <Route path="/register/" component={Register} />
                        <Route path="/confirm-register/:confirmCode" component={ConfirmRegister} />
                        <Route path="/profile/" component={() => <Profile setUsername={setUsername} username={username} />} />
                        <Route path="/reset-password/" component={ResetPassword} />
                        <Route path="/confirm-reset-password/:confirmCode" component={ConfirmResetPassword} />

                        <Route path="/tracks/" component={TrackList} />
                        <Route path="/track/:trackId" component={(props: any)=><TrackDetail {...props} username={username}/>} />

                        <Route path="/genres/" component={GenreList} />
                        <Route path="/genre/:genreId" component={(props:any)=><GenreDetail {...props} username={username} />} />

                        <Route path="/playlists/" component={PlaylistList} />
                        <Route path="/playlist/:playlistId" component={(props:any)=><PlaylistDetail {...props} username={username} />} />

                        <Route path="/albums/" component={AlbumList} />
                        <Route path="/album/:albumId" component={(props:any)=><AlbumDetail {...props} username={username} />} />

                        <Route path="/artists/" component={ArtistList} />
                        <Route path="/artist/:artistId" component={(props:any)=><ArtistDetail {...props} username={username} />} />
                    </Switch>
                </Container>

                <CssBaseline />
                <br/><br/><br/><br/><br/><br/>
                <footer className={classes.footer}>

                    <Container maxWidth="sm">
                        <Typography variant="body1">
                            Made by <Link href="https://t.me/d1z3ro" style={{ 'textDecoration': 'none' }} color="secondary">d1zero</Link>
                        </Typography>
                        <Copyright />
                    </Container>
                </footer>
            </div>
        </Router>
    );
}

export default App;
