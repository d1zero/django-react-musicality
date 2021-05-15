import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card, CardActionArea, CardMedia, CardContent, Container } from '@material-ui/core'
import { Helmet } from 'react-helmet'

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(11.5),
    },
    media: {
        height: theme.spacing(25),
        width: theme.spacing(25),
        object: 'fit',
    },
    card: {
        borderRadius: '10px',
        maxWidth: theme.spacing(25),
        maxHeight: theme.spacing(25),
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 100%)',
        position: 'absolute',
        width: 'inherit',
        color: 'white',
        textShadow: '1px 1px 1px #000',
        transition: '.3s',
        opacity: '0',
        bottom: '-50px',
    },
    gridItem: {
        textDecoration: 'none',
    },
    genreImageSpan: {
        display: 'grid',
        justifyContent: 'center'
    },
    genreImage: {
        width: '300px',
        height: '300px',
        objectFit: 'cover',
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
            <Container maxWidth="md">
                <Grid container spacing={3} className={classes.container}></Grid>
                <Typography component="body" variant="h1" align="center" style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}>
                    <strong>
                        {data.name}
                    </strong>
                </Typography>
                <span className={classes.genreImageSpan}>
                    <img
                        className={classes.genreImage}
                        src={'http://localhost:8000' + data.cover}
                    />
                </span>
                <br />
                <Typography align="center" variant='body2'>{data.description}</Typography><br /><br />

                <Grid container spacing={4}>
                    {data.tracks.map((track: track) => {
                        iter += 1;
                        return (
                            <Grid item key={track.id} xs={12} sm={6} md={4} lg={3} component={Link} to={'/track/' + track.id} className={classes.gridItem}>
                                <Card className={classes.card}>
                                    <CardActionArea onMouseOver={() => { document.getElementById(('content' + track.id))?.setAttribute('style', 'opacity: 1; bottom: -10px') }} onMouseOut={() => { document.getElementById(('content' + track.id))?.removeAttribute('style') }}>
                                        <CardMedia
                                            className={classes.media}
                                            image={'http://localhost:8000' + track.cover}
                                            title={track.title}
                                        />
                                        <CardContent className={classes.titleBar} id={"content" + track.id}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {track.title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default GenreDetail;