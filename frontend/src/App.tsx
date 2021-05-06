import React, { useEffect, useState } from 'react';
import './App.css';
import Login from "./Pages/Profile/Login";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Register from "./Pages/Profile/Register";
import { Container } from '@material-ui/core'
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

function App() {
    const [username, setUsername]: any = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(
                'http://localhost:8000/user/profile', {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            }
            )
            const content = await response1.json()

            if (response1.status === 200) {
                await setUsername(content.username)
            } else {
                console.log(222)
            }
        }
        fetchData()
    }, [])


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
            </div>
            <br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /><br /><br /><br />
        </Router>
    );
}

export default App;
