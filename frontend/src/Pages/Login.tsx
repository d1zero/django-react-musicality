import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from "react-router-dom";
import {Input, Button} from '@material-ui/core'

const Login = (props: { setUsername: (username: string) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json();
        setRedirect(true);
        props.setUsername(content.username);
    }

    if (redirect) {
        return <Redirect to="/"/>;
    }

    return (
        <form onSubmit={submit}>
            <br />
            <br />
            <br />
            <Input autoFocus={true} onChange={e => setEmail(e.target.value)} placeholder="Email" required
                   type="email"/><br/><br />
            <Input onChange={e => setPassword(e.target.value)} placeholder="Password" required type="password"/><br/><br />
            <Button type="submit" color="primary" variant="outlined">Log in</Button>
        </form>
    );
};

export default Login;