import React, {useEffect, useState} from 'react';

const Home = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/user/profile', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                })

                const content = await response.json();
                if (!content.detail) {
                    setUsername(content.username)
                }
            }
        )();
    }, [])

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            {username ? 'Hi, ' + username : 'Not hi'}
        </div>
    );
};

export default Home;