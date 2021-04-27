import React, {useEffect, useState} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import {Link} from 'react-router-dom';
import axios from "axios";


const TrackDetail = (props: any) => {
    const trackId = props.match.params.trackId;

    interface obj {
        id: number,
        title: string,
        soundtrack: string,
        cover: string,
        date_of_release: string,
        artists: any[],
        genres: any[],
        artists_ids: number[]
    }

    const [data, setData] = useState<obj>({
        id: 0,
        title: '',
        soundtrack: '',
        cover: '',
        date_of_release: '',
        artists: [],
        genres: [],
        artists_ids: [0]
    })

    interface artist {
        [index: number]: {id: number, nickname: string}
    }

    const [artists, setArtists] = useState<artist>([{id: 0, nickname: ''}, {id: 0, nickname: ''}, {id: 0, nickname: ''}])

    interface genre {
        [index: number]: {id: number, name: string}

    }

    const [genres, setGenres] = useState<genre>([{id: 0, name: ''}, {id: 0, name: ''}, {id: 0, name: ''}])

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios(
                'http://localhost:8000/api/tracks/' + trackId, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )

            await setData(response1.data)
            response1.data.artists_ids = []
            response1.data.artists_ids = response1.data.artists
        }
        fetchData()

        const fetchData2 = async () => {
            const response2 = await axios(
                'http://localhost:8000/api/artists', {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )

            await setArtists(response2.data)
        }
        fetchData2()

        const fetchData3 = async () => {
            const response3 = await axios(
                'http://localhost:8000/api/genres', {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )

            await setGenres(response3.data)
        }
        fetchData3()
    }, [trackId])

    // production
    // let imgSrc = data.cover
    // let trackSrc = data.soundtrack

    // development
    let imgSrc = 'http://localhost:8000' + data.cover
    let trackSrc = 'http://localhost:8000' + data.soundtrack

    return (
        <div>
            <br/><br/><br/>
            Название трека: {data.title}<br/>
            Дата выхода: {data.date_of_release}<br/>
            Артисты: {data.artists.map((id: number) => {
            return <span key={id}>
                <Link to={'/artists/' + id.toString()}>{artists[id-1].nickname}</Link>&nbsp;
            </span>
        })}<br/>
            Жанры: {data.genres.map((id: number) => {
            return <span key={id}>
                    <Link to={'/genres/' + id.toString()}>{genres[id-1].name}</Link>&nbsp;
                </span>
        })}
            <br/>
            Трек: <ReactAudioPlayer src={trackSrc} controls/><br/>
            Обложка: <img src={imgSrc} alt="sdfdsf"/>
        </div>
    );
};

export default TrackDetail;