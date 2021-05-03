import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet'

const useStyles = makeStyles((theme) => ({

}))

interface track {
    id: number,
    title: string
}

interface genre {
    id: number,
    tracks: track[],
    name: string,
    description: string,
}

const GenreDetail = (props: any) => {
    const genreId = props.match.params.genreId;
    const [data, setData] = useState<genre>({
        id: 0, name: '', description: '', tracks: [
            { id: 0, title: '' },
            { id: 0, title: '' },
            { id: 0, title: '' }
        ]
    })
    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios(
                'http://localhost:8000/api/genres/' + genreId, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setData(response1.data)
        }
        fetchData()
    }, [genreId])


    var iter = 0

    // const classes = useStyles();

    return (
        <div>
            <Helmet><title>Жанры: {data.name}</title></Helmet>
            <br /><br /><br /><br />
            <h1>{data.name}</h1><br />
            {data.description}<br />
            {data.tracks.map((trackId: track) => {
                iter += 1;
                return (
                    <div key={iter}>
                        <Link to={'/track/' + trackId.id}>{data.tracks[iter - 1].title}</Link><br />
                    </div>
                )
            })}<br />
        </div>
    )
}

export default GenreDetail;