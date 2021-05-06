import React, { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet'

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
    }

    const [data, setData] = useState<obj>()

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
    }, [trackId])



    const classes = useStyles();

    if (typeof (data) !== 'undefined') {
        // production
        let imgSrc = data.cover
        let trackSrc = data.soundtrack

        // development
        // let imgSrc = 'http://localhost:8000' + data.cover
        // let trackSrc = 'http://localhost:8000' + data.soundtrack

        return (
            <Grid container spacing={3} className={classes.container}>
                <Helmet><title>Трек: {data.title}</title></Helmet>
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
                        Артисты: {data.artists_info.map((artist: art) => {
                            return <span key={artist.id}>
                                <Link to={'/artist/' + artist.id.toString()}>{artist.nickname}</Link>&nbsp;
                            </span>
                        })}
                    </Grid>
                    <Grid item>
                        Жанры: {data.genres_info.map((genre: gen) => {
                            return <span key={genre.id}>
                                <Link to={'/genre/' + genre.id.toString()}>{genre.name}</Link>&nbsp;
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
    } else {
        return (<div></div>)
    }
};

export default TrackDetail;