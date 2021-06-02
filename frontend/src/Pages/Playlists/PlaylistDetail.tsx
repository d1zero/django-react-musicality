import React, { useEffect, useState, SyntheticEvent } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Slider, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUp from '@material-ui/icons/VolumeUp';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Cookies from 'js-cookie';
import MuiAlert from "@material-ui/lab/Alert";


function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    trackInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        paddingTop: theme.spacing(3),
    },
    trackImageDiv: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    trackImage: {
        objectFit: 'cover',
        height: theme.spacing(44),
        width: theme.spacing(44),
    },
    container: {
        marginTop: theme.spacing(8),
        justifyContent: 'center',
    },
    trackDescription: {

    },
    volume: {
        display: 'flex',
        width: 200,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
    },
    playIcon: {
        display: 'flex',
        alignItems: 'flex-start',
        height: 38,
        width: 38,
        paddingLeft: 0,
    },
    root: {
        display: 'flex',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingLeft: 0,
        borderRadius: theme.spacing(3)
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        paddingBottom: '0'
    },
    controlsDiv: {
        justifyContent: 'center',
        marginTop: theme.spacing(8),
        paddingBottom: '0',
    },
    tracks: {
        marginLeft: '8px',
        textDecoration: 'none',
    }
}))
var trackId = 0;

const PlaylistDetail = (props: any) => {
    const playlistId = props.match.params.playlistId;
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(80)
    const [time, setTime] = useState<number>(0)
    const [length, setLength] = useState<string>()
    const [open, setOpen] = useState(false)
    const [favorite, setFavorite] = useState(false)

    const handleClose: any = (e: SyntheticEvent) => {
        setOpen(false)
    }



    interface playlist {
        id: number,
        tracks: track[],
        name: string,
        description: string,
        photo: string,
        track: number[]
    }

    interface track {
        id: number,
        title: string,
        soundtrack: string,
        cover: string,
        artists_info: artist[],
    }

    interface artist {
        id: number,
        nickname: string,
    }

    const [data, setData] = useState<playlist>()


    useEffect(() => {
        const fetchData = async () => {
            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/api/playlists/' + playlistId
            // Development
            // link = 'http://localhost:8000/api/playlists/' + playlistId

            const response1 = await axios(
                link, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )

            await setData(response1.data)

            if (props.username !== '') {
                // Production
                link = 'http://musicality.std-1578.ist.mospolytech.ru/api/get-favorite-playlists/' + playlistId
                // Development
                // link = 'http://localhost:8000/api/get-favorite-playlists/' + playlistId

                const response2 = await axios(
                    link, {
                    headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' + Cookies.get('csrftoken') },
                    withCredentials: true,
                }
                )
                if (response2.data.message === 'success') {
                    setFavorite(true)
                }
            }

        }

        fetchData()
    }, [])

    const addToFavorite = async (playlistId: number) => {
        let heart = document.getElementById('favorite')
        if (props.username !== '') {
            if (favorite) {
                setFavorite(false)
            } else {
                setFavorite(true)
            }

            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/api/add-playlist-to-favorite/' + playlistId.toString()
            // Development
            // link = 'http://localhost:8000/api/add-playlist-to-favorite/' + playlistId.toString()

            await fetch(
                link, {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' + Cookies.get('csrftoken') },
                credentials: 'include',
                body: JSON.stringify({ 'username': props.username })
            })
        } else {
            setOpen(true)
        }
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
    }

    const playNext = () => {
        if (typeof (data) !== 'undefined') {
            if (trackId < data?.tracks.length - 1) {
                stopPlaying()
                let elems = document.getElementsByTagName('audio')
                elems[trackId].currentTime = 0
                trackId += 1;
                changeTime(elems[trackId].duration)
                startPlaying()
            } else {
                stopPlaying()
                let elems = document.getElementsByTagName('audio')
                elems[trackId].currentTime = 0
                trackId = 0;
                changeTime(elems[trackId].duration)
                startPlaying()
            }
        }
    }

    const playPrevious = () => {
        if (typeof (data) !== 'undefined') {
            if (trackId > 0) {
                stopPlaying()
                let elems = document.getElementsByTagName('audio')
                elems[trackId].currentTime = 0
                trackId -= 1;
                changeTime(elems[trackId].duration)
                startPlaying()
            } else {
                stopPlaying()
                let elems = document.getElementsByTagName('audio')
                elems[trackId].currentTime = 0
                changeTime(elems[trackId].duration)
                startPlaying()
            }
        }
    }

    const changeTime = (duration: number) => {
        let mins = Math.floor(duration / 60)
        let secs = Math.round(duration - mins * 60).toString()
        if (secs === '0' || secs === '1' || secs === '2' || secs === '3' || secs === '4' ||
            secs === '5' || secs === '6' || secs === '7' || secs === '8' || secs === '9') { secs = '0' + secs }
        setLength(`${mins}:${secs}`)
    }


    const stopPlaying = () => {
        setPlaying(false)
        let elems = document.getElementsByTagName('audio')
        let track_name = document.getElementById('track' + trackId)
        track_name?.removeAttribute('style')
        elems[trackId].pause()
    }

    const startPlaying = () => {
        setPlaying(true)
        let elems = document.getElementsByTagName('audio')
        let track_name = document.getElementById('track' + trackId)
        track_name?.setAttribute('style', 'color: red')
        elems[trackId].play()
    }

    const handleChangeTime = (event: any, newValue: number | number[]) => {
        let elems = document.getElementsByTagName('audio')
        elems[trackId].currentTime = Number(newValue) / 100 * elems[trackId].duration
    };

    const classes = useStyles();

    if (typeof (length) !== 'undefined') {
        var marks = [
            {
                value: 0,
                label: '0:00',
            },
            {
                value: 100,
                label: `${length}`
            },
        ]
    } else {
        var marks = [
            {
                value: 0,
                label: '0:00',
            }
        ]
    }

    if (typeof (data) !== 'undefined') {
        let imgSrc = ''

        // Production
        imgSrc = data.tracks[trackId].cover
        // Development
        // imgSrc = 'http://localhost:8000' + data.tracks[trackId].cover

        return (
            <Grid container spacing={3} className={classes.container}>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert severity="warning">Авторизуйтесь или зарегистрируйтесь, чтобы добавлять в избранное</Alert>
                </Snackbar>
                <Grid item style={{ 'visibility': 'hidden' }}>
                    {data.tracks.map((track: track) => {
                        let trackSrc;
                        // Production
                        trackSrc = track.soundtrack
                        // Development
                        // trackSrc = 'http://localhost:8000' + track.soundtrack

                        return (
                            <ReactAudioPlayer src={trackSrc} controls onEnded={playNext} volume={volume / 100}
                                onPlay={() =>
                                    setInterval(() => {
                                        let elemen = document.getElementsByTagName('audio');
                                        if (elemen.length > 0) {
                                            let curTime = (elemen[trackId].currentTime / elemen[trackId].duration);
                                            setTime(curTime)
                                        }
                                    }, 1000)} onLoadedMetadata={async () => {
                                        let elems = document.getElementsByTagName('audio')
                                        let mins = Math.floor(elems[trackId].duration / 60)
                                        let secs = Math.round(elems[trackId].duration - mins * 60).toString()
                                        if (secs === '0' || secs === '1' || secs === '2' || secs === '3' || secs === '4' ||
                                            secs === '5' || secs === '6' || secs === '7' || secs === '8' || secs === '9') { secs = '0' + secs }
                                        await setLength(`${mins}:${secs}`)
                                    }}
                                style={{ 'height': 0, 'width': 0, 'visibility': 'hidden' }}
                            />
                        )
                    })}
                </Grid>
                <Helmet><title>Плейлист: {data.name}</title></Helmet>
                <Grid item xs={12} sm={10} md={6} className={classes.trackInfo}>
                    <Typography gutterBottom component="body" variant="h1" align="center" style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}>
                        <strong>
                            {data.name}
                        </strong>
                    </Typography>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {favorite ? <Typography variant="h6">В избранном</Typography> : <Typography variant="h6">Добавить в избранное</Typography>}
                        <IconButton aria-label="add to favorites" id="favorite">
                            {favorite ? <FavoriteIcon style={{ 'color': 'red' }} onClick={() => { addToFavorite(data.id) }} /> : <FavoriteBorderIcon onClick={() => { addToFavorite(data.id) }} />}
                        </IconButton>
                    </span><br />
                    <Grid container>
                        <Grid item xs={7} className={classes.trackDescription} >
                            <Typography variant="h6" style={{display: 'flex', justifyContent: 'center'}}>О плейлисте</Typography>
                            {data.description}
                        </Grid>
                        <Grid item xs={5} className={classes.trackDescription} >
                        <Typography variant="h6" style={{display: 'flex', justifyContent: 'center'}}>Содержимое плейлиста</Typography>
                            {data.tracks.map((tr: track, index: number) => {
                                {/* <IconButton aria-label="next" style={{ 'padding': 0 }}>
                                            <PlayArrowIcon className={classes.playIcon} />
                                        </IconButton> */}
                                return (
                                    <Typography variant="body1" className={classes.tracks} id={'track' + index.toString()}>
                                        {tr.title}<br />
                                    </Typography>
                                )
                            })}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.trackImage}
                                image={imgSrc}
                                title={data.name}
                            />
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography variant="h4">
                                        <Link to={'/track/' + data.tracks[trackId].id} style={{ 'textDecoration': 'none', 'color': '#D32F2F' }}><i>{data.tracks[trackId].title}</i></Link><br />
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {data.tracks[trackId].artists_info.map((art: artist) => { return (<span><Link to={'/artist/' + art.id} style={{ 'textDecoration': 'none', 'color': '#D32F2F' }}><i>{art.nickname}</i></Link><br /></span>) })}
                                    </Typography>
                                </CardContent>
                                <CardContent className={classes.controlsDiv} style={{ 'padding': 3, 'marginLeft': 16 }}>
                                    <div className={classes.volume}>
                                        <Grid container spacing={2}>
                                            <Grid item xs>
                                                <Slider
                                                    value={time * 100}
                                                    onChange={handleChangeTime}
                                                    aria-labelledby="continuous-slider"
                                                    marks={marks}
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
                                                <IconButton aria-label="soundOn" style={{ 'padding': 3 }}>
                                                    <VolumeUp onClick={() => { setVolume(100) }} />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className={classes.controls}>
                                        <IconButton aria-label="previous" style={{ 'padding': 3 }}>
                                            <SkipPreviousIcon onClick={playPrevious} />
                                        </IconButton>
                                        <IconButton aria-label="play/pause" style={{ 'padding': 3 }}>

                                            {playing ? <PauseIcon onClick={() => stopPlaying()} className={classes.playIcon} /> : <PlayArrowIcon onClick={() => startPlaying()} className={classes.playIcon} />}

                                        </IconButton>
                                        <IconButton aria-label="next" style={{ 'padding': 3 }}>
                                            <SkipNextIcon onClick={playNext} />
                                        </IconButton>
                                        {/* Повтор трека:
                                        <IconButton aria-label="repeat">
                                            {repeat ? <LoopIcon onClick={() => repeatToggle()} color="secondary" /> : <LoopIcon onClick={() => repeatToggle()} color="disabled" />}
                                        </IconButton> */}
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    </Grid>
                </Grid>

            </Grid >
        );
    } else {
        return (<div></div>)
    }
};

export default PlaylistDetail;