import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Typography, Container, Grid, Card, CardActionArea, CardMedia, CardContent, useMediaQuery } from '@material-ui/core'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

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

const theme = createMuiTheme();

theme.typography.h1 = {
    fontSize: '6rem',
    '@media (min-width:600px)': {
        fontSize: '6rem',
    },
    [theme.breakpoints.down('xs')]: {
        fontSize: '2rem',
    },
};



const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(10),
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
        margin: theme.spacing(1),
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
}))


const AlbumDetail = (props: any) => {
    const albumId = props.match.params.albumId;
    const [data, setData] = useState<alb>();
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/api/albums/' + albumId
            // Development
            // link = 'http://localhost:8000/api/albums/' + albumId

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

    const matches = useMediaQuery(theme.breakpoints.down('md'))

    if (typeof (data) !== 'undefined') {
        let imgSrc = ''
        // Production
        imgSrc = data.cover
        // Development
        // imgSrc = 'http://localhost:8000' + data.cover

        return (
            <div className={classes.root}>
                <Helmet>
                    <title>Альбомы: {data.name}</title>
                </Helmet>
                <Container maxWidth="md">
                    <ThemeProvider theme={theme}>
                        <Typography gutterBottom variant="h1" align="center">{data.name}</Typography>
                    </ThemeProvider>

                    <Grid container direction="row">
                        <img src={imgSrc} alt={data.name} style={{ 'width': '400px', 'height': '400px', 'borderRadius': '10px', 'objectFit': 'cover', 'marginRight': theme.spacing(3) }} />
                        <Grid direction="column">
                            <Typography gutterBottom variant="body2" style={{ wordWrap: "break-word", 'maxWidth': '480px' }}>{data.description}</Typography>
                            <Typography gutterBottom variant="body2">Исполнители: {data.artists_info.map((artist: art) => {
                                return (
                                    <span key={artist.id}>
                                        <Link to={'/artist/' + artist.id}>{artist.nickname}</Link>&nbsp;
                                    </span>
                                );
                            })}
                            </Typography>
                            <Typography variant="body2">Дата выхода: {data.date_of_release}</Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Typography variant="h3">Треки:</Typography><br />
                    <div className="tracks">
                        <Grid spacing={3} container>
                            {data.tracks_info.map((track: trc) => {
                                let imgTrackSrc

                                // Production
                                imgTrackSrc = track.cover
                                // Development
                                // imgTrackSrc = 'http://localhost:8000' + track.cover

                                return (
                                        <Grid item component={Link} to={'/track/' + track.id}>
                                            <Card className={classes.card}>
                                                <CardActionArea onMouseOver={() => { document.getElementById(('content' + track.id))?.setAttribute('style', 'opacity: 1; bottom: -10px') }} onMouseOut={() => { document.getElementById(('content' + track.id))?.removeAttribute('style') }}>
                                                    <CardMedia
                                                        className={classes.media}

                                                        image={imgTrackSrc}

                                                        title={track.title}
                                                    />
                                                    <CardContent style={{
                                                        'opacity': matches ? '1' : '0',
                                                        'bottom': matches ? '-10px' : '',
                                                    }} className={classes.titleBar} id={"content" + track.id}>
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
                    </div>
                </Container>
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default AlbumDetail;