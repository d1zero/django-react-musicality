import React, { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
        flexBasis: '30%',
        marginLeft: '252px',
    },
}))

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
        [index: number]: { id: number, nickname: string }
    }

    const [artists, setArtists] = useState<artist>([
        { id: 0, nickname: '' },
        { id: 0, nickname: '' },
        { id: 0, nickname: '' },
        { id: 0, nickname: '' }
    ])

    interface genre {
        [index: number]: { id: number, name: string }

    }

    const [genres, setGenres] = useState<genre>([
        { id: 0, name: '' },
        { id: 0, name: '' },
        { id: 0, name: '' },
        { id: 0, name: '' }
    ])

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios(
                'http://localhost:8000/api/track/' + trackId, {
                headers: { 'Content-Type': 'application/json' },
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
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )

            await setArtists(response2.data)
        }
        fetchData2()

        const fetchData3 = async () => {
            const response3 = await axios(
                'http://localhost:8000/api/genres', {
                headers: { 'Content-Type': 'application/json' },
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

    const classes = useStyles();

    return (
        <Grid container spacing={3} className={classes.container}>
            <br /><br /><br />
            <Grid item xs={6} className={classes.trackImageDiv}>
                <img className={classes.trackImage} src={imgSrc} alt={data.title} />
            </Grid>
            <Grid item xs={6} className={classes.trackInfo}>
                <Grid item>
                    Название трека: {data.title}
                </Grid>
                <Grid item>
                    Дата выхода: {data.date_of_release}
                </Grid>
                <Grid item>
                    Артисты: {data.artists.map((id: number) => {
                        return <span key={id}>
                            <Link to={'/artists/' + id.toString()}>{artists[id - 1].nickname}</Link>&nbsp;
                        </span>
                    })}
                </Grid>
                <Grid item>
                    Жанры: {data.genres.map((id: number) => {
                        return <span key={id}>
                            <Link to={'/genre/' + id.toString()}>{genres[id - 1].name}</Link>&nbsp;
                        </span>
                    })}
                </Grid>
                <Grid item>
                    <ReactAudioPlayer src={trackSrc} controls />
                </Grid>
            </Grid>
            <Grid item xs={4} className={classes.trackDescription}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut a veniam incidunt ipsa sequi laborum animi velit
                 exercitationem facere excepturi, consequuntur id vitae quasi labore aut, aperiam nisi sapiente ex quidem.
                 Eveniet accusamus quasi harum? Suscipit laudantium commodi distinctio ea esse? Deserunt, iusto culpa vel
                 dolorum error qui! Mollitia, rerum!
            </Grid>
        </Grid>
    );
};

export default TrackDetail;