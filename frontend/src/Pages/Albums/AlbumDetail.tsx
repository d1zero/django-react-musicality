import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player';
import { Helmet } from 'react-helmet'

interface art {
    id: number,
    nickname: string,
}

interface trc {
    id: number,
    title: string,
    cover: string,
    soundtrack: string,
}

interface alb {
    id: number,
    name: string,
    description: string,
    cover: string,
    date_of_release: string,
    artists_info: art[],
    tracks_info: trc[],
}


const AlbumDetail = (props: any) => {
    const albumId = props.match.params.albumId;
    const [data, setData] = useState<alb>();

    useEffect(() => {
        const fetchData = async () => {
            let link = ''
            // Production
            // link = 'http://musicality.std-1578.ist.mospolytech.ru/api/albums/' + albumId
            // Development
            link = 'http://localhost:8000/api/albums/' + albumId

            const response1 = await axios(
                link, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setData(response1.data)
        }
        fetchData()
    }, [albumId])

    console.log(data);



    if (typeof (data) !== 'undefined') {
        let imgSrc = ''
        // Production
        // imgSrc = data.cover
        // Development
        imgSrc = 'http://localhost:8000' + data.cover

        return (
            <div>
                <Helmet>
                    <title>Альбомы: {data.name}</title>
                </Helmet>
                <br /><br /><br /><br />
                {data.name}<br />
                {data.description}<br />
                {data.date_of_release}<br />
                <img src={imgSrc} alt={data.name} /><br />
                {data.artists_info.map((artist: art) => {
                    return (
                        <span key={artist.id}>
                            <Link to={'/artist/' + artist.id}>{artist.nickname}</Link>&nbsp;
                        </span>
                    );
                })}<br />
                {data.tracks_info.map((track: trc) => {
                    let imgTrackSrc = ''
                    let soundtrackSrc = ''
                    // Production
                    // imgTrackSrc = track.cover
                    // soundtrackSrc = track.soundtrack
                    // Development
                    imgTrackSrc = 'http://localhost:8000' + track.cover
                    soundtrackSrc = 'http://localhost:8000' + track.soundtrack

                    return (
                        <div key={track.id}>
                            <Link to={'/track/' + track.id}><h5>{track.title}</h5></Link>
                            <img src={imgTrackSrc} alt={track.title} height="100px" width="100px" />&nbsp;
                            <ReactAudioPlayer controls src={soundtrackSrc} />
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default AlbumDetail;