import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, GridListTile, GridListTileBar, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Carousel from 'react-material-ui-carousel';
import { Typography } from '@material-ui/core';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: '100px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        item: {
            marginBottom: '70px',
        },
        img: {
            // objectFit: 'cover',
        },
        gridList: {
            paddingTop: '20px',
            flexWrap: 'nowrap',
            transform: 'translateZ(0)',
            overflowX: 'scroll',
        },
        title: {
            color: 'white',
        },
        titleBar: {
            background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        paddingBottom: {
            marginBottom: '2000px'
        },
        carousel: {
            borderRadius: '10px',
            boxShadow: '0 1px 2px rgba(0,0,0,.15)',
            transition: 'box-shadow 10s ease-in-out:',
            '&:hover': {
                transition: 'box-shadow 10s ease-in-out:',
                boxShadow: '7px 6px 8px 0px rgba(0, 0, 0, 0.3)',
            }
        },
        carouselItem: {
            display: 'grid',
            gridTemplateAreas: `'image text text''image text text'`,
            gridTemplateColumns: '300px 400px',
        },
        image: {
            gridArea: 'image',
            minWidth: '300px',
            maxWidth: '300px',
            minHeight: '300px',
            maxHeight: "300px",
            objectFit: 'cover',
        },
        typography: {
            display: 'grid',
            alignItems: 'center',
            paddingLeft: '10px',
            gridArea: 'text',
            maxWidth: '400px',
            textDecoration: 'none',
            color: 'black',
        }
    }),
);

const Home = () => {
    const [tracks, setTracks]: any[] = useState([])
    const [playlists, setPlaylists]: any[] = useState([])
    const [albums, setAlbums]: any[] = useState([])
    const [artists, setArtists]: any[] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoader(true)
            const response1 = await axios(
                `http://localhost:8000/api/tracks/`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setTracks(response1.data)

            const response2 = await axios(
                `http://localhost:8000/api/playlists/`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setPlaylists(response2.data)

            const response3 = await axios(
                `http://localhost:8000/api/albums/`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setAlbums(response3.data)

            const response4 = await axios(
                `http://localhost:8000/api/artists/`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setArtists(response4.data)
            setTimeout(() => {
                setLoader(false)
            }, 300);

        }
        fetchData()
    }, [])

    interface obj {
        id: number,
        title: string,
        cover: string,
        description: string,
        date_of_release: string,
        artists_info: art[]
    }

    interface pla {
        id: number,
        name: string,
        photo: string,
        description: string,
        tracks: obj[]
    }

    interface art {
        id: number,
        first_name: string,
        last_name: string,
        nickname: string,
        photo: string,
        about: string,
        date_of_birth: string,
    }

    interface alb {
        id: number,
        name: string,
        cover: string,
        description: string,
        date_of_release: string,
        artists_info: art[],
    }



    const classes = useStyles();
    const classs = classes.root + ' ' + classes.paddingBottom;

    if (typeof (tracks) !== 'undefined') {
        if (loader) {
            return (
                <CircularProgress className={classs} />
            )
        } else {
            return (
                <Grid>
                    <Helmet>
                        <title>Musicality</title>
                    </Helmet>
                    <div className={classes.root}>
                        {/* Треки */}
                        <div className={classes.item}>
                            <h2>Популярные треки:</h2>
                            <Carousel
                                className={classes.carousel}
                                animation="slide"
                                interval={4000}
                                stopAutoPlayOnHover
                                autoPlay
                                indicators={false}
                            >
                                {tracks.map((track: obj) => {
                                    let description = ''

                                    if (track.description.length < 270) {
                                        description = track.description
                                    } else {
                                        description = track.description.substring(0, 270) + '...'
                                    }

                                    // Production
                                    let imgSrc = track.cover
                                    // Development
                                    // let imgSrc = 'http://localhost:8000' + track.cover

                                    return (
                                        <GridListTile component={Link} to={'/track/' + track.id} key={track.id} style={{ textDecoration: 'none' }}>
                                            <Grid item className={classes.carouselItem}>
                                                <img
                                                    src={imgSrc}
                                                    alt={track.title}
                                                    className={classes.image}
                                                />
                                                <GridListTileBar
                                                    title={track.title}
                                                    classes={{
                                                        root: classes.titleBar,
                                                        title: classes.title,
                                                    }}
                                                />
                                                <Typography className={classes.typography}>
                                                    <h3>Исполнители: {track.artists_info.map((artist: art) => {
                                                        return (<span>{artist.nickname} </span>)
                                                    }
                                                    )}
                                                    </h3>
                                                    <h4>Дата выпуска: {track.date_of_release}</h4><br />
                                                    <span style={{ minHeight: '164px', maxHeight: '164px', minWidth: '400px', maxWidth: '400px' }}>{description}</span>
                                                </Typography>
                                            </Grid>
                                        </GridListTile>
                                    )
                                })}
                            </Carousel>
                        </div>

                        {/* Плейлисты */}
                        <div className={classes.item}>
                            <h2>Популярные плейлисты:</h2>
                            <Carousel
                                className={classes.carousel}
                                animation="slide"
                                interval={3000}
                                stopAutoPlayOnHover
                                autoPlay={false}
                                indicators={false}
                            >
                                {playlists.map((playlist: pla) => {
                                    let description = ''

                                    if (playlist.description.length < 170) {
                                        description = playlist.description
                                    } else {
                                        description = playlist.description.substring(0, 170) + '...'
                                    }
                                    let tracks = Array<string>()

                                    { playlist.tracks.map((track: obj) => tracks.push(track.title)) }
                                    if (tracks.length > 5) {
                                        tracks = tracks.splice(0, 5);
                                        tracks.push('И другие...')
                                    } else {
                                        tracks = tracks.splice(0, tracks.length)
                                    }

                                    // Production
                                    let imgSrc = playlist.photo
                                    // Development
                                    // let imgSrc = 'http://localhost:8000' + playlist.photo

                                    return (
                                        <GridListTile style={{ textDecoration: 'none' }} component={Link} to={'/playlist/' + playlist.id} key={playlist.id}>
                                            <Grid item className={classes.carouselItem}>
                                                <img
                                                    src={imgSrc}
                                                    alt={playlist.name}
                                                    className={classes.image}
                                                />
                                                <GridListTileBar
                                                    title={playlist.name}
                                                    classes={{
                                                        root: classes.titleBar,
                                                        title: classes.title,
                                                    }}
                                                />
                                                <Typography className={classes.typography}>
                                                    <p style={{ minHeight: '164px', maxHeight: '164px', marginBottom: 0, }}>
                                                        <strong>Треки:</strong><br />
                                                        {tracks.map((track: string) => {
                                                            if (track !== 'И другие...') {
                                                                return (<>
                                                                    &#183;{track}<br /></>)
                                                            } else {
                                                                return (<>{track}<br /></>)
                                                            }
                                                        })}
                                                    </p>
                                                    <p style={{ minHeight: '100px', maxHeight: '100px', marginBottom: 0, }}>{description}</p>
                                                </Typography>
                                            </Grid>
                                        </GridListTile>
                                    )
                                })}
                            </Carousel>
                        </div>

                        {/* Альбомы */}
                        <div className={classes.item}>
                            <h2>Популярные альбомы:</h2>
                            <Carousel
                                className={classes.carousel}
                                animation="slide"
                                interval={4000}
                                stopAutoPlayOnHover
                                autoPlay
                                indicators={false}
                            >
                                {albums.map((album: alb) => {
                                    let description = ''
                                    if (album.description.length < 250) {
                                        description = album.description
                                    } else {
                                        description = album.description.substring(0, 250) + '...'
                                    }

                                    // Production
                                    let imgSrc = album.cover
                                    // Development
                                    // let imgSrc = 'http://localhost:8000' + album.cover
                                    return (
                                        <GridListTile style={{ textDecoration: 'none' }} component={Link} to={'/album/' + album.id} key={album.id}>
                                            <Grid item className={classes.carouselItem}>
                                                <img
                                                    src={imgSrc}
                                                    alt={album.name}
                                                    className={classes.image}
                                                />
                                                <GridListTileBar
                                                    title={album.name}
                                                    classes={{
                                                        root: classes.titleBar,
                                                        title: classes.title,
                                                    }}
                                                />
                                                <Typography className={classes.typography}>
                                                    <h3>Дата выпуска: {album.date_of_release}</h3>
                                                    <h4>Исполнители: {album.artists_info.map((artist: art) => {
                                                        return (<span>{artist.nickname} </span>)
                                                    }
                                                    )}
                                                    </h4><br />
                                                    <span style={{ minHeight: '164px', maxHeight: '164px', minWidth: '400px', maxWidth: '400px' }}>{description}</span>
                                                </Typography>
                                            </Grid>
                                        </GridListTile>
                                    )
                                })}
                            </Carousel>
                        </div>

                        {/* Исполнители */}
                        <div className={classes.item}>
                            <h2>Популярные артисты:</h2>
                            <Carousel
                                className={classes.carousel}
                                animation="slide"
                                interval={4000}
                                stopAutoPlayOnHover
                                autoPlay
                                indicators={false}
                            >
                                {artists.map((artist: art) => {
                                    let description = ''
                                    if (artist.about.length < 260) {
                                        description = artist.about
                                    } else {
                                        description = artist.about.substring(0, 260) + '...'
                                    }

                                    // Production
                                    let imgSrc = artist.photo
                                    // Development
                                    // let imgSrc = 'http://localhost:8000' + artist.photo

                                    return (
                                        <GridListTile
                                            component={Link}
                                            to={'/artist/' + artist.id}
                                            key={artist.id}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Grid item className={classes.carouselItem}>
                                                <img
                                                    src={imgSrc}
                                                    alt={artist.nickname}
                                                    className={classes.image}
                                                />
                                                <GridListTileBar
                                                    title={artist.nickname}
                                                    classes={{
                                                        root: classes.titleBar,
                                                        title: classes.title,
                                                    }}
                                                />
                                                <Typography className={classes.typography}>
                                                    <h3>{artist.first_name + ' ' + artist.last_name}</h3><br />
                                                    <h4>Дата рождения: {artist.date_of_birth}</h4><br />
                                                    <span style={{minHeight: '164px', maxHeight: '164px', minWidth: '400px', maxWidth: '400px'}}>{description}</span>
                                                </Typography>
                                            </Grid>
                                        </GridListTile>
                                    )
                                })}
                            </Carousel>
                        </div>
                    </div>
                </Grid >

            );
        }
    } else {
        return (
            <CircularProgress className={classs} />
        )
    }
};

export default Home;