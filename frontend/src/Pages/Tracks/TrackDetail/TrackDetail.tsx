import React, { useEffect, useState, SyntheticEvent } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Slider, Snackbar } from '@material-ui/core';
import { Helmet } from 'react-helmet'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import LoopIcon from '@material-ui/icons/Loop';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUp from '@material-ui/icons/VolumeUp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Cookies from "js-cookie"
import MuiAlert from "@material-ui/lab/Alert";
import { useStyles } from './TrackDetailStyles'


function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const TrackDetail = (props: any) => {
    const trackId = props.match.params.trackId;

    const [playing, setPlaying] = useState<boolean>(false)
    const [repeat, setRepeat] = useState<boolean>(false)
    const [volume, setVolume] = useState<number>(80)
    const [time, setTime] = useState<number>(0)
    const [fullTime, setFullTime] = useState<string>('0:00')
    const [open, setOpen] = useState(false)
    const [favorite, setFavorite] = useState(false)

    const handleClose: any = (e: SyntheticEvent) => {
        setOpen(false)
    }

    interface gen {
        id: number,
        name: string
    }

    interface art {
        id: number,
        nickname: string,
        first_name: string,
        last_name: string,
        photo: string,
    }


    interface obj {
        id: number,
        title: string,
        soundtrack: string,
        cover: string,
        date_of_release: string,
        artists_info: art[],
        genres_info: gen[]
        description: string,
    }

    const [data, setData] = useState<obj>()

    useEffect(() => {
        const fetchData = async () => {
            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/api/tracks/' + trackId
            // Development
            // link = 'http://localhost:8000/api/tracks/' + trackId

            const response1 = await axios(
                link, {
                headers: { 'Content-Type': 'application/json', 'Authorization': 'duplexMismatch' },
                withCredentials: true
            }
            )

            await setData(response1.data)
            response1.data.artists_ids = []
            response1.data.artists_ids = response1.data.artists

            if (props.username !== '') {
                // Production
                link = 'http://musicality.std-1578.ist.mospolytech.ru/api/get-favorite-tracks/' + trackId
                // Development
                // link = 'http://localhost:8000/api/get-favorite-tracks/' + trackId
                const response2 = await axios(
                    link, {
                    headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' + Cookies.get('csrftoken'), 'Authorization': 'duplexMismatch' },
                    withCredentials: true,
                }
                )
                if (response2.data.message === 'success') {
                    setFavorite(true)
                }
            }

        }
        fetchData()
    }, [trackId, props.username])

    const addToFavorite = async (trackId: number) => {
        if (props.username !== '') {
            if (favorite) {
                setFavorite(false)
            } else {
                setFavorite(true)
            }

            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/api/add-track-to-favorite/' + trackId.toString()
            // Development
            // link = 'http://localhost:8000/api/add-track-to-favorite/' + trackId.toString()

            await axios(
                link, {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' + Cookies.get('csrftoken'), 'Authorization': 'duplexMismatch' },
                withCredentials: true,
                data: { 'username': props.username }
            })
        } else {
            setOpen(true)
        }
    }

    const repeatToggle = async () => {
        await setRepeat(!repeat)
    }

    const handleChangeVolume = (event: any, newValue: number | number[]) => {
        setVolume(newValue as number);
        let elems = document.getElementsByTagName('audio')
        for (let i = 0; i < elems.length; i++) {
            let elem = elems[i]
            let pause = elem.paused
            if (!pause) {
                elem.volume = volume / 100
            }
        }
    };

    const handleChangeTime = (event: any, newValue: number | number[]) => {
        let elems = document.getElementsByTagName('audio')
        elems[0].currentTime = Number(newValue) / 100 * elems[0].duration
    };

    const startPlaying = () => {
        setPlaying(true)
        let elem = document.getElementsByTagName('audio')
        elem[0].play()
    }

    const stopPlaying = () => {
        setPlaying(false)
        let elem = document.getElementsByTagName('audio')
        elem[0].pause()
    }

    const Ended = (e: any) => {
        if (repeat) {
            startPlaying()
        } else {
            stopPlaying();
            let elem = document.getElementsByTagName('audio');
            elem[0].currentTime = 0
        }
    }

    var marks = [
        {
            value: 0,
            label: '0:00',
        },
        {
            value: 100,
            label: `${fullTime}`
        },
    ]


    const classes = useStyles();

    if (typeof (data) !== 'undefined') {
        let imgSrc = ''
        let trackSrc = ''
        // Production
        imgSrc = data.cover
        trackSrc = data.soundtrack
        // Development
        // imgSrc = 'http://localhost:8000' + data.cover
        // trackSrc = 'http://localhost:8000' + data.soundtrack

        var iter = 0;

        return (
            <Grid container spacing={3} className={classes.container}>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert severity="warning">Авторизуйтесь или зарегистрируйтесь, чтобы добавлять в избранное</Alert>
                </Snackbar>
                <Grid item style={{ 'visibility': 'hidden' }}>
                    <ReactAudioPlayer src={trackSrc} controls onEnded={Ended} volume={volume / 100} style={{ 'height': 0, 'width': 0, 'visibility': 'hidden' }} onPlay={() =>
                        setInterval(() => {
                            let elemen = document.getElementsByTagName('audio');
                            if (elemen.length > 0) {
                                let curTime = (elemen[0].currentTime / elemen[0].duration);
                                setTime(curTime)
                            }
                        }, 1000)
                    } onLoadedMetadata={async () => {
                        let elems = document.getElementsByTagName('audio')
                        let mins = Math.floor(elems[0].duration / 60)
                        let secs = Math.round(elems[0].duration - mins * 60).toString()
                        if (secs === '0' || secs === '1' || secs === '2' || secs === '3' || secs === '4' ||
                            secs === '5' || secs === '6' || secs === '7' || secs === '8' || secs === '9') { secs = '0' + secs }
                        await setFullTime(`${mins}:${secs}`)
                    }} />
                </Grid>
                <Helmet><title>Трек: {data.title}</title></Helmet>
                <Grid item xs={12} sm={10} md={6} className={classes.trackInfo}>
                    <Typography component="body" variant="h2" align="center" style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}>
                        <strong>
                            {data.title}
                        </strong>
                    </Typography>
                    <Grid item>
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.trackImage}
                                image={imgSrc}
                                title={data.title}
                            />
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography variant="subtitle1">
                                        Артисты:&nbsp;
                                        {data.artists_info.map((artist: art) => {
                                            iter += 1
                                            return <span key={artist.id}>
                                                <Link to={'/artist/' + artist.id.toString()} style={{ textDecoration: 'none', color: '#d32f2f' }}><i>{artist.nickname}</i></Link>
                                                {(data.artists_info.length > 1 && iter !== data.artists_info.length) ? ', ' : ''}
                                            </span>
                                        })}
                                    </Typography>
                                    <Typography >
                                        Дата выхода:&nbsp;{data.date_of_release}
                                    </Typography>
                                    <Typography >
                                        Жанры:&nbsp;{data.genres_info.map((genre: gen) => {
                                            return <span key={genre.id}>
                                                <Link to={'/genre/' + genre.id.toString()} style={{ textDecoration: 'none', color: '#d32f2f' }}><i>{genre.name}</i></Link>&nbsp;
                                            </span>
                                        })}
                                    </Typography>
                                    <span style={{ display: 'flex', justifyContent: 'center' }}>
                                        <IconButton aria-label="add to favorites" id="favorite" onClick={() => { addToFavorite(data.id) }}>
                                            {favorite ? <FavoriteIcon style={{ 'color': 'red' }} /> : <FavoriteBorderIcon />}
                                        </IconButton>
                                    </span>
                                </CardContent>
                                <CardContent className={classes.controlsDiv} style={{ 'paddingBottom': 0 }}>
                                    <div className={classes.volume}>
                                        <Grid container spacing={2}>
                                            <Grid item xs>
                                                <Slider
                                                    value={time * 100}
                                                    onChange={handleChangeTime}
                                                    aria-labelledby="continuous-slider"
                                                    marks={marks}
                                                    step={0.000001}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className={classes.volume}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <IconButton aria-label="soundOff" style={{ 'padding': 3 }}>
                                                    <VolumeOffIcon onClick={() => { setVolume(0) }} />
                                                </IconButton>
                                            </Grid>
                                            <Grid item xs>
                                                <Slider value={volume} onChange={handleChangeVolume} aria-labelledby="continuous-slider" />
                                            </Grid>
                                            <Grid item>
                                                <IconButton aria-label="soundOff" style={{ 'padding': 3 }}>
                                                    <VolumeUp onClick={() => { setVolume(100) }} />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className={classes.controls}>
                                        {playing ?
                                            <IconButton aria-label="play/pause" onClick={() => stopPlaying()}>
                                                <PauseIcon className={classes.playIcon} />
                                            </IconButton> :
                                            <IconButton aria-label="play/pause" onClick={() => startPlaying()}>
                                                <PlayArrowIcon className={classes.playIcon} />
                                            </IconButton>
                                        }
                                        Повтор трека:
                                        <IconButton aria-label="repeat" onClick={() => repeatToggle()} >
                                            {repeat ? <LoopIcon color="secondary" /> : <LoopIcon color="disabled" />}
                                        </IconButton>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    </Grid>
                    <span style={{ display: 'flex', justifyContent: 'center' }} >
                        <Grid item xs={11}>
                            <Typography variant="body1">
                                {data.description}
                            </Typography>
                        </Grid>
                    </span>
                </Grid>
            </Grid>
        );
    } else {
        return (<div></div>)
    }
};

export default TrackDetail;