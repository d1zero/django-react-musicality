import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from 'react-router-dom'
import {Button, Input} from "@material-ui/core";

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    // const [psw2, setPsw2] = useState('')

    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        // if (password === psw2) {
        await fetch('http://localhost:8000/user/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email, username, password
            })
        })

        setRedirect(true);
        // } else {
        //     console.log(`Passwords are different: ${password} - ${psw2}`)
        // }
    }

    if (redirect) return <Redirect to='/login'/>


    return (
        <form onSubmit={submit}>
            <br/>
            <br/>
            <br/>
            <Input autoFocus={true} onChange={e => setEmail(e.target.value)} placeholder="Email" required
                   type="email"/><br/><br/>
            <Input onChange={e => setUsername(e.target.value)} placeholder="Username" required type="text"/><br/><br/>
            <Input onChange={e => setPassword(e.target.value)} placeholder="Password" required
                   type="password"/><br/><br/>
            <Button type="submit" color="primary" variant="outlined">Register</Button>
        </form>
    );
};

export default Register;