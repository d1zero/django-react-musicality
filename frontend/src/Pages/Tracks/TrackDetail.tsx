import React, { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import LoopIcon from '@material-ui/icons/Loop';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

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
    }
}))

const TrackDetail = (props: any) => {
    const trackId = props.match.params.trackId;
    const [playing, setPlaying] = useState<boolean>(false)
    const [repeat, setRepeat] = useState<boolean>(false)
    const [volume, setVolume] = useState<number>(10)
    const [time, setTime] = useState<number>(0)
    const [fullTime, setFullTime] = useState<string>('0:00')

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
            link = 'http://musicality.std-1578.ist.mospolytech.ru/api/track/' + trackId
            // Development
            // link = 'http://localhost:8000/api/track/' + trackId

            const response1 = await axios(
                link, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )

            await setData(response1.data)
            response1.data.artists_ids = []
            response1.data.artists_ids = response1.data.artists
        }
        fetchData()
    }, [trackId])

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

        return (
            <Grid container spacing={3} className={classes.container}>
                <Grid item style={{ 'visibility': 'hidden' }}>
                    <ReactAudioPlayer src={trackSrc} controls onEnded={Ended} volume={volume / 100} onPlay={() =>
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
                    <Typography component="body" variant="h1" align="center" style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}>
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
                                            return <span key={artist.id}>
                                                <Link to={'/artist/' + artist.id.toString()}>{artist.nickname}</Link>&nbsp;
                                            </span>
                                        })}
                                    </Typography>
                                    <Typography >
                                        Дата выхода:&nbsp;{data.date_of_release}
                                    </Typography>
                                    <Typography >
                                        Жанры:&nbsp;{data.genres_info.map((genre: gen) => {
                                            return <span key={genre.id}>
                                                <Link to={'/genre/' + genre.id.toString()}>{genre.name}</Link>&nbsp;
                                            </span>
                                        })}
                                    </Typography>
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
                                                    step={0.01}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className={classes.volume}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <VolumeDown />
                                            </Grid>
                                            <Grid item xs>
                                                <Slider value={volume} onChange={handleChangeVolume} aria-labelledby="continuous-slider" />
                                            </Grid>
                                            <Grid item>
                                                <VolumeUp />
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className={classes.controls}>
                                        <IconButton aria-label="play/pause" style={{ 'paddingLeft': 0 }}>
                                            {playing ? <PauseIcon onClick={() => stopPlaying()} className={classes.playIcon} /> : <PlayArrowIcon onClick={() => startPlaying()} className={classes.playIcon} />}
                                        </IconButton>
                                        Повтор трека:
                                        <IconButton aria-label="repeat">
                                            {repeat ? <LoopIcon onClick={() => repeatToggle()} color="secondary" /> : <LoopIcon onClick={() => repeatToggle()} color="disabled" />}
                                        </IconButton>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={12} className={classes.trackDescription} >
                        {data.description}
                    </Grid>
                </Grid>
            </Grid>
        );
    } else {
        return (<div></div>)
    }
};

export default TrackDetail;