import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player'
import { Helmet } from 'react-helmet'

interface alb {
    id: number,
    name: string,
    date_of_release: string,
    description: string,
    cover: string,
}

interface trc {
    id: number,
    title: string,
    cover: string,
    soundtrack: string,
    date_of_release: string,
}

interface art {
    first_name: string,
    nickname: string,
    last_name: string,
    date_of_birth: string,
    photo: string,
    tracks: trc[],
    albums: alb[]
}

const ArtistDetail = (props: any) => {
    const artistId = props.match.params.artistId;
    const [data, setData] = useState<art>()

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios(
                'http://localhost:8000/api/artists/' + artistId, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setData(response1.data)
        }
        fetchData()
    }, [artistId])

    console.log(data);

    if (typeof (data) !== 'undefined') {
        return (
            <div>
                <Helmet><title>Исполнитель: {data.nickname}</title></Helmet>
                <br /><br /><br /><br />
                <h1>Artist detail</h1>
                {data.first_name} <strong>"{data.nickname}"</strong> {data.last_name}<br />
                {data.date_of_birth}<br />
                <img src={'http://localhost:8000' + data.photo} alt={data.nickname} height="300px" width="300px" /><br />
                <h3>Треки:</h3>
                {data.tracks.map((track: trc) => {
                    return (
                        <div key={track.id}>
                            <Link to={'/track/' + track.id}><h5>{track.title}</h5></Link>
                            {track.date_of_release}<br />
                            <img src={'http://localhost:8000' + track.cover} alt={track.title} height="100px" width="100px" />&nbsp;
                            <ReactAudioPlayer controls src={'http://localhost:8000' + track.soundtrack} />
                        </div>
                    )
                })}
                <br /><br />
                <h3>Альбомы:</h3>
                {data.albums.map((album: alb) => {
                    return (
                        <div key={album.id}>
                            <Link to={'/album/' + album.id}><h4>{album.name}</h4></Link>
                            {album.date_of_release}<br />
                            <img src={'http://localhost:8000' + album.cover} alt={album.name} height="100px" width="100px" />&nbsp;
                            <p>{album.description}</p>
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default ArtistDetail