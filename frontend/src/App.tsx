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
            // link = 'http://musicality.std-1578.ist.mospolytech.ru/user/profile'
            // Development
            link = 'http://localhost:8000/user/profile'

            await axios.get(
                link, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            ).then(res => {
                const content = res.data
                setUsername(content.username)
            }).catch(error => {
                console.log(error.message)
            })
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
                        <Route path="/profile/" component={Profile} />

                        <Route path="/tracks/" component={TrackList} />
                        <Route path="/track/:trackId" component={TrackDetail} />

                        <Route path="/genres/" component={GenreList} />
                        <Route path="/genre/:genreId" component={GenreDetail} />

                        <Route path="/playlists/" component={PlaylistList} />
                        <Route path="/playlist/:playlistId" component={PlaylistDetail} />

                        <Route path="/albums/" component={AlbumList} />
                        <Route path="/album/:albumId" component={AlbumDetail} />

                        <Route path="/artists/" component={ArtistList} />
                        <Route path="/artist/:artistId" component={ArtistDetail} />
                    </Switch>
                </Container>

                <CssBaseline />
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
