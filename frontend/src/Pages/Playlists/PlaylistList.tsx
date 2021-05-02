import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const PlaylistList = () => {
    const [data, setData]: any[] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios(
                `http://localhost:8000/api/playlists/`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setData(response1.data)
        }
        fetchData()
    }, [])

    console.log(data);

    interface obj {
        id: number,
        name: string,
        description: string,
        photo: string,
    }


    return (
        <div>
            <br /><br /><br /><br />
            <h1>Playlists</h1>
            {data.map((playlist: obj) => {
                return (
                    <div key={playlist.id}>
                        <Link to={'/playlist/'+playlist.id}>{playlist.name}</Link><br />
                        {playlist.description}<br />
                        <img src={"http://localhost:8000"+playlist.photo} alt={playlist.name} />
                    </div>
                )
            })}
        </div>
    )
}

export default PlaylistList