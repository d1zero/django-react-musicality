import React, { useEffect, useState } from 'react';
import './App.css';
import Login from "./Pages/Login";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import { Container } from '@material-ui/core'
import TrackDetail from "./Pages/TrackDetail";
import TrackList from "./Pages/TrackList";
import Profile from './Pages/Profile';
import GenreList from './Pages/GenreList';
import GenreDetail from './Pages/GenreDetail';

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
                        <Route path="/" exact component={() => <Home username={username} />} />
                        <Route path="/login" component={() => <Login setUsername={setUsername} />} />
                        <Route path="/register" component={Register} />
                        <Route path="/profile" component={Profile} />

                        <Route exact path="/tracks" component={TrackList} />
                        <Route path="/track/:trackId" component={TrackDetail} />

                        <Route exact path="/genres" component={GenreList} />
                        <Route exact path="/genre/:genreId" component={GenreDetail} />
                    </Switch>
                </Container>
                <br />
                <br />
                <br />
                <br />
            </div>
        </Router>
    );
}

export default App;
