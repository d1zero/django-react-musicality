import React, { useEffect, useState } from 'react';
import './App.scss';
import Login from "./Pages/Profile/Login/Login";
import Nav from "./Components/Nav/Nav";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios'
import Home from "./Pages/Home/Home";
import Register from "./Pages/Profile/Register/Register";
import { Container, CssBaseline } from '@material-ui/core'
import TrackDetail from "./Pages/Tracks/TrackDetail/TrackDetail";
import TrackList from "./Pages/Tracks/TrackList/TrackList";
import Profile from './Pages/Profile/Profile/Profile';
import GenreList from './Pages/Genres/GenreList/GenreList';
import GenreDetail from './Pages/Genres/GenreDetail/GenreDetail';
import PlaylistList from './Pages/Playlists/PlaylistList/PlaylistList';
import PlaylistDetail from './Pages/Playlists/PlaylistDetail/PlaylistDetail';
import AlbumList from './Pages/Albums/AlbumList/AlbumList'
import AlbumDetail from './Pages/Albums/AlbumDetail/AlbumDetail'
import ArtistList from './Pages/Artists/ArtistList/ArtistList';
import ArtistDetail from './Pages/Artists/ArtistDetail/ArtistDetail';
import ResetPassword from './Pages/Profile/ResetPassword/ResetPassword';
import ConfirmRegister from './Pages/Profile/ConfirmRegister/ConfirmRegister';
import ConfirmResetPassword from './Pages/Profile/ConfirmResetPassword/ConfirmResetPassword';
import Footer from './Components/Footer/Footer'

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
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'duplexMismatch'
                },
                withCredentials: true
            }
            ).then(res => {
                const content = res.data
                setUsername(content.username)
            }).catch(error => { })
        }
        fetchData()
    }, [])

    return (
        <Router>
            <div className='App'>
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
                        <Route path="/track/:trackId" component={(props: any) => <TrackDetail {...props} username={username} />} />

                        <Route path="/genres/" component={GenreList} />
                        <Route path="/genre/:genreId" component={(props: any) => <GenreDetail {...props} username={username} />} />

                        <Route path="/playlists/" component={PlaylistList} />
                        <Route path="/playlist/:playlistId" component={(props: any) => <PlaylistDetail {...props} username={username} />} />

                        <Route path="/albums/" component={AlbumList} />
                        <Route path="/album/:albumId" component={(props: any) => <AlbumDetail {...props} username={username} />} />

                        <Route path="/artists/" component={ArtistList} />
                        <Route path="/artist/:artistId" component={(props: any) => <ArtistDetail {...props} username={username} />} />
                    </Switch>
                </Container>
                <CssBaseline />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
