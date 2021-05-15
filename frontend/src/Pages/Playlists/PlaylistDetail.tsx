import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import { Helmet } from 'react-helmet'
import { Card, CardContent, CardMedia, IconButton, Typography, Slider, Grid } from '@material-ui/core'
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import LoopIcon from '@material-ui/icons/Loop';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            marginTop: theme.spacing(10),
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: 151,
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        playIcon: {
            height: 38,
            width: 38,
        },
        image: {
            minWidth: '300px',
            maxWidth: '300px',
            minHeight: '300px',
            maxHeight: "300px",
            objectFit: 'cover',
        },
        volume: {
            width: 200
        },
    }),
);

interface art {
    nickname: string
}

interface track {
    id: number,
    title: string,
    cover: string,
    soundtrack: string,
    artists_info: art[],
}

interface playlist {
    id: number,
    name: string,
    description: string,
    photo: string,
    tracks: track[],
}

var trackId: number = 0;

const PlaylistDetail = (props: any) => {
    const playlistId = props.match.params.playlistId;
    const [data, setData] = useState<playlist>({ id: 0, name: '', description: '', photo: '', tracks: [] })
    const [playing, setPlaying] = useState(false)
    const [nowPlaying, setNowPlaying] = useState('Трек')
    const [nowArtists, setNowArtists] = useState('Исполнители')
    const [nowImgSrc, setNowImgSrc] = useState('')
    const [repeat, setRepeat] = useState(false)
    const [volume, setVolume] = useState<number>(10)

    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios(
                // Production
                'http://musicality.std-1578.ist.mospolytech.ru/api/playlists/' + playlistId, {
                // Development
                // 'http://localhost:8000/api/playlists/' + playlistId, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setData(response1.data)

            // Production
            setNowImgSrc(data.photo)
            // Development
            // setNowImgSrc("http://localhost:8000" + response1.data.photo)
        }
        fetchData()
    }, [playlistId])


    const handleChange = (event: any, newValue: number | number[]) => {
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

    const playNext = (e: any) => {
        if (!repeat) {
            if (e.target) {
                var id = e.target.id;
            }
            let elems = document.getElementsByTagName('audio')
            let now = elems[id - 1]
            now.currentTime = 0
            let next = elems[id]
            setNowPlaying(next.title)
            let artists = ''
            data.tracks[id].artists_info.map((artist: art) => artists += (artist.nickname + ' '))
            setNowArtists(artists)

            // Production
            setNowImgSrc(data.tracks[id].cover)
            // Development
            // setNowImgSrc("http://localhost:8000" + data.tracks[id].cover)

            next.volume = volume / 100
            next.play()
        } else {
            if (e.target) {
                var id = e.target.id;
            }
            let elems = document.getElementsByTagName('audio')
            let now = elems[id - 1]
            now.currentTime = 0
            setNowPlaying(now.title)
            now.volume = volume / 100
            now.play()
        }
    }

    const previous = () => {
        let elems = document.getElementsByTagName('audio')
        for (let i = 0; i < elems.length; i++) {
            let elem = elems[i]
            let time = elem.currentTime

            if (time.toString() !== '0') {
                elem.pause()

                if (elem.currentTime >= 2) {
                    elem.currentTime = 0
                    setPlaying(true)
                    elem.play()
                } else {
                    elem.currentTime = 0
                    setPlaying(false)
                    if (i === 0) {
                        elems[0].volume = volume / 100
                        elems[0].play()
                        setNowPlaying(elems[0].title);
                        setPlaying(true)
                    } else {
                        setRepeat(false)
                        elems[i].pause()
                        elems[i].volume = volume / 100
                        elems[i].currentTime = 0
                        setPlaying(false)
                        elems[i - 1].volume = volume / 100
                        elems[i - 1].play()
                        setNowPlaying(elems[i - 1].title);
                        setPlaying(true)
                        let artists = ''
                        data.tracks[i - 1].artists_info.map((artist: art) => artists += (artist.nickname + ' '))
                        setNowArtists(artists)

                        // Production
                        setNowImgSrc(data.tracks[i - 1].cover)
                        // Development
                        // setNowImgSrc("http://localhost:8000" + data.tracks[i - 1].cover)

                    }

                }
            }
        }
    }

    const repeatToggle = async () => {
        await setRepeat(!repeat)
    }

    const next = () => {
        setVolume(volume)
        let elems = document.getElementsByTagName('audio')
        setRepeat(false)
        for (let i = 0; i < elems.length; i++) {
            let elem = elems[i]
            let time = elem.currentTime

            if (time.toString() !== '0') {
                elem.pause()
                elem.currentTime = 0
                setPlaying(false)
                elems[i + 1].play()

                if (i < elems.length - 1) {
                    let elements = document.getElementsByTagName('audio')
                    for (let j = 0; j < elements.length; j++) {
                        let element = elements[j]
                        let pause = element.paused
                        if (!pause) {
                            let el = document.getElementById((j + 1).toString()) as HTMLAudioElement
                            console.log(el);
                            el.volume = volume / 100
                        }
                    }
                    setNowPlaying(elems[i + 1].title);
                    setPlaying(true)
                    let artists = ''
                    data.tracks[i + 1].artists_info.map((artist: art) => artists += (artist.nickname + ' '))
                    setNowArtists(artists)

                    // Production
                    setNowImgSrc(data.tracks[i + 1].cover)
                    // Development
                    // setNowImgSrc("http://localhost:8000" + data.tracks[i + 1].cover)

                } else {
                    elems[0].volume = volume / 100
                    elems[0].play()
                    setNowPlaying(elems[0].title);
                    setPlaying(true)

                    // Production
                    setNowImgSrc(data.tracks[0].cover)
                    // Development
                    // setNowImgSrc("http://localhost:8000" + data.tracks[0].cover)

                }
            }
        }
    }



    const startPlaying = async (trackId: number) => {
        setPlaying(true)
        let elems = document.getElementsByTagName('audio')
        elems[trackId].play()
        setNowPlaying(elems[trackId].title);
        elems[trackId].volume = volume / 100
        let artists = ''
        await data.tracks[trackId].artists_info.map((artist: art) => artists += (artist.nickname + ' '))
        setNowArtists(artists)

        // Production
        await setNowImgSrc(data.tracks[trackId].cover)
        // Development
        // await setNowImgSrc("http://localhost:8000" + data.tracks[trackId].cover)

    }

    const stopPlaying = () => {
        setPlaying(false)
        let elems = document.getElementsByTagName('audio')
        for (let i = 0; i < elems.length; i++) {
            let elem = elems[i]
            let pause = elem.paused
            if (!pause) {
                trackId = i
                elem.pause()
            }
        }
    }

    let iter: number = 0;

    return (
        <>
            <Helmet><title>Плейлист: {data.name}</title></Helmet>
            <br /><br /><br /><br />
            <h1>{data.name}</h1>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.image}
                    image={nowImgSrc}
                    title={nowPlaying}
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            {nowPlaying}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {nowArtists}
                        </Typography>
                    </CardContent>
                    <div className={classes.volume}>
                        <Typography id="continuous-slider" gutterBottom>
                            Громкость
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item>
                                <VolumeDown />
                            </Grid>
                            <Grid item xs>
                                <Slider value={volume} onChange={handleChange} aria-labelledby="continuous-slider" />
                            </Grid>
                            <Grid item>
                                <VolumeUp />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.controls}>
                        <IconButton aria-label="previous">
                            <SkipPreviousIcon onClick={() => previous()} />
                        </IconButton>
                        <IconButton aria-label="play/pause" >
                            {playing ? <PauseIcon onClick={() => stopPlaying()} className={classes.playIcon} /> : <PlayArrowIcon onClick={() => startPlaying(trackId)} className={classes.playIcon} />}
                        </IconButton>
                        <IconButton aria-label="next">
                            <SkipNextIcon onClick={() => next()} />
                        </IconButton>
                        Повтор трека:
                        <IconButton aria-label="repeat">
                            {repeat ? <LoopIcon onClick={() => repeatToggle()} color="secondary" /> : <LoopIcon onClick={() => repeatToggle()} color="disabled" />}
                        </IconButton>

                    </div>
                </div>
            </Card>
            <br /> <br />



            {data.tracks.map((track: track) => {
                iter++;

                // Production
                let imgSrc = track.cover
                let soundtrackSrc = track.soundtrack
                // Development
                // let imgSrc = 'http://localhost:8000' + track.cover
                // let soundtrackSrc = 'http://localhost:8000' + track.soundtrack


                return (
                    <ReactAudioPlayer
                        id={iter.toString()}
                        onEnded={playNext}
                        src={soundtrackSrc}
                        title={track.title}
                        style={{ 'visibility': 'hidden' }}
                    />
                )
            })}
        </>
    )
}

export default PlaylistDetail