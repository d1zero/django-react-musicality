import React, {useEffect, useState} from 'react';
import './App.css';
import Login from "./Pages/Login";
import Nav from "./Components/Nav";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import {Container} from '@material-ui/core'
import TrackDetail from "./Pages/TrackDetail";
import TrackList from "./Pages/TrackList";

function App() {
    // const [username, setUsername] = useState('')
    //
    // useEffect(() => {
    //     (
    //         async () => {
    //             const response = await fetch('http://localhost:8000/user/profile', {
    //                 headers: {'Content-Type': 'application/json'},
    //                 credentials: 'include'
    //             })
    //
    //             const content = await response.json();
    //             if (content.detail !== 'Unauthenticated!') {
    //                 setUsername(content.username)
    //             }
    //         }
    //     )();
    // }, [])

    return (
        <Router>
            <div className="App">
                <Container>
                    <Nav/>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        {/*<Route path="/login" component={() => <Login setUsername={setUsername}/>}/>*/}
                        {/*<Route path="/register" component={Register}/>*/}
                        <Route path="/tracks/:trackId" component={TrackDetail}/>
                        <Route exact path="/tracks" component={TrackList}/>
                    </Switch>
                </Container>
            </div>
        </Router>
    );
}

export default App;
