import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import { Helmet } from 'react-helmet'

interface track {
    id: number,
    title: string,
    cover: string,
    soundtrack: string,
}

interface playlist {
    id: number,
    name: string,
    description: string,
    photo: string,
    tracks: track[],
}

const PlaylistDetail = (props: any) => {
    const playlistId = props.match.params.playlistId;
    const [data, setData] = useState<playlist>({ id: 0, name: '', description: '', photo: '', tracks: [] })

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios(
                'http://localhost:8000/api/playlists/' + playlistId, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setData(response1.data)
        }
        fetchData()
    }, [playlistId])

    const playNext = (e: any) => {
        if (e.target) {
            var id = e.target.id;
        }
        let now = document.getElementById(id.toString())
        let cur = now?.getAttribute('currentSrc')
        now?.setAttribute('ended', 'false')
        console.log(now);

        console.log(cur);
        now?.setAttribute('currentTime', '0')
        console.log(cur);

        id = Number(id) + 1;
        let next = document.getElementById(id.toString())
        next?.setAttribute('autoPlay', 'true')
    }

    const startPlaying = () => {
        let first = document.getElementById("1")
        first?.setAttribute('autoPlay', 'true')
    }

    return (
        <div><br /><br /><br /><br />
            <Helmet><title>Плейлист: {data.name}</title></Helmet>
            <h1>Playlist detail {playlistId}</h1>
            {data.id}<br />
            {data.name}<br />
            {data.description}<br />
            <button onClick={startPlaying}>Start playlist</button><br />
            {data.tracks.map((track: track) => {
                let trackId = '' + track.id.toString()
                // production
                let soundtrackSrc = track.soundtrack

                // development
                // let soundtrackSrc = 'http://localhost:8000' + track.soundtrack
                return (<span key={track.id}>
                    {track.title}: <ReactAudioPlayer
                        id={trackId}
                        onEnded={playNext}
                        src={soundtrackSrc}
                        controls
                    /><br />
                </span>
                )
            })}
            <img src={"http://localhost:8000" + data.photo} alt={data.name} /><br />
            {data.tracks.map((track: track) => {
                // production
                let imgSrc = track.cover

                // development
                // let imgSrc = 'http://localhost:8000' + track.cover
                return (
                    <span key={track.id}>
                        <Link to={"/track/" + track.id}>{track.title}</Link><br />
                        <img src={imgSrc} alt={track.title} />
                    </span>
                )
            })}
        </div>
    )
}

export default PlaylistDetail