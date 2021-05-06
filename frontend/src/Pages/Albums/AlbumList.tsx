import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

interface art {
    id: number,
    nickname: string,
    first_name: string,
    last_name: string
}

interface alb {
    id: number,
    name: string,
    description: string,
    cover: string,
    artists_info: art[],
}

const AlbumList = () => {
    const [data, setData]: any[] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios(
                'http://localhost:8000/api/albums/', {
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
            <Helmet>
                <title>Альбомы</title>
            </Helmet>
            <br /><br /><br /><br />
            <h1>Albums list</h1>
            {data.map((album: alb) => {
                // Production
                let imgSrc = album.cover
                // Development
                // let imgSrc = 'http://localhost:8000' + album.cover

                return (
                    <div key={album.id}>
                        <Link to={'/album/' + album.id}>{album.name}</Link><br />
                        {album.artists_info.map((artist: art) => {
                            return (
                                <span key={artist.id}>
                                    <Link to={'/artist/' + artist.id}>{artist.nickname}</Link>&nbsp;
                                </span>
                            )
                        })}
                        <p>{album.description}</p>
                        <img src={imgSrc} alt={album.name} /><br />
                    </div>
                );

            })}
        </div>
    )
}

export default AlbumList;