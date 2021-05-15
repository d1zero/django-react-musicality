import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core'
import { Helmet } from 'react-helmet'

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(11.5),
    },
}))

interface track {
    id: number,
    title: string,
    cover: string,
}

interface genre {
    id: number,
    tracks: track[],
    name: string,
    cover: string,
    description: string,
}

const GenreDetail = (props: any) => {
    const genreId = props.match.params.genreId;
    const [data, setData] = useState<genre>({
        id: 0, name: '', cover: '', description: '', tracks: [
            { id: 0, title: '', cover: '' },
            { id: 0, title: '', cover: '' },
            { id: 0, title: '', cover: '' }
        ]
    })
    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios(
                // Production
                'http://musicality.std-1578.ist.mospolytech.ru/api/genres/' + genreId, {
                // Development
                // 'http://localhost:8000/api/genres/' + genreId, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setData(response1.data)
        }
        fetchData()
    }, [genreId])


    var iter = 0

    const classes = useStyles();

    return (
        <div>
            <Helmet><title>Жанры: {data.name}</title></Helmet>
            <Grid container spacing={3} className={classes.container}></Grid>
            <Typography component="body" variant="h1" align="center" style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}>
                <strong>
                    {data.name}
                </strong>
            </Typography>
            <img
                src={'http://localhost:8000' + data.cover}
                style={{ 'width': '300px', 'height': '300px' }}
            /><br />
            {data.description}<br />
            {data.tracks.map((track: track) => {
                iter += 1;
                return (
                    <div key={iter}>
                        <img src={'http://localhost:8000' + track.cover} style={{ 'width': '100px', 'height': '100px' }} />
                        <Link to={'/track/' + track.id}>{data.tracks[iter - 1].title}</Link><br />
                    </div>
                )
            })}<br />
        </div>
    )
}

export default GenreDetail;