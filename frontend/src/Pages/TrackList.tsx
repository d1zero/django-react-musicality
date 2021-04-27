import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

const TrackList = () => {
    const [data, setData]: any[] = useState([])
    const [artists, setArtists]: any[] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios(
                'http://localhost:8000/api/tracks', {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )

            await setData(response1.data)

            for (let i = 0; i < response1.data.length; i++) {
                response1.data[i].artists_ids = []
            }

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
    }, [])

    interface obj {
        id: number,
        title: string,
        artists: any[],
        cover: string,
        artists_ids: number[]
    }

    return (
        <ul>
            {data.map((item: obj) => {
                item.artists_ids = item.artists

                let trackHref = '/tracks/' + item.id

                // production
                // let imgSrc = item.cover

                // development
                let imgSrc = 'http://localhost:8000' + item.cover

                return <li key={item.id}><br /><br /><br />Id: {item.id}
                    Трек: <Link to={trackHref.toString()}>{item.title}</Link>
                    Исполнители: {item.artists_ids.map((id: number) => {

                        return <span key={id}>
                            <Link to={'/artists/' + id.toString()}>{''+artists[id-1].nickname+''}</Link>&nbsp;
                        </span>
                    })}
                    <br/>
                    <img src={imgSrc} alt={item.title}/>
                </li>
            })}
        </ul>
    );
};

export default TrackList;