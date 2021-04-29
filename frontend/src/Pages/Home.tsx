import React, {useEffect, useState} from 'react';

const Home = (props: {username: string}) => {

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            {props.username !== '' ? 'Hi, ' + props.username : 'Not hi'}
        </div>
    );
};

export default Home;