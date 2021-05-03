import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

interface art {
    id: number,
    nickname: string,
    first_name: string,
    last_name: string,
    photo: string,
}

const ArtistList = () => {
    const [data, setData]: any = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios(
                'http://localhost:8000/api/artists/', {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setData(response1.data)
        }
        fetchData()
    }, [])

    return (
        <div>
            <Helmet><title>Исполнители</title></Helmet>
            <br /><br /><br /><br />
            <h1>Artist list</h1>
            {data.map((artist: art) => {
                // Production
                let imgSrc = artist.photo

                // Development
                // let imgSrc = 'http://localhost:8000'+artist.photo
                return (
                    <div key={artist.id}>
                        <Link to={'/artist/' + artist.id}>{artist.first_name} "{artist.nickname}" {artist.last_name}</Link><br />
                        <img src={imgSrc} alt={artist.nickname} height="200px" width="200px" />
                    </div>
                )
            })}
        </div>
    )
}

export default ArtistList