import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, GridListTile, GridListTileBar, CircularProgress, useMediaQuery, TextField } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Carousel from 'react-material-ui-carousel';
import { Typography } from '@material-ui/core';
import { useStyles } from './HomeStyles'
import { ListDataFetch } from '../ListDataFetch'

const Home = () => {
    const [tracks, setTracks]: any[] = useState([])
    const [playlists, setPlaylists]: any[] = useState([])
    const [albums, setAlbums]: any[] = useState([])
    const [artists, setArtists]: any[] = useState([])
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        ListDataFetch(setTracks, setLoader, 'tracks')
        ListDataFetch(setPlaylists, setLoader, 'playlists')
        ListDataFetch(setAlbums, setLoader, 'albums')
        ListDataFetch(setArtists, setLoader, 'artists')
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
    const matches = useMediaQuery('(min-width:770px)');

    return (
        <Grid>
            <Helmet>
                <title>Musicality</title>
            </Helmet>
            <div className={classes.root}>

                {loader
                    ? <CircularProgress className={classes.loader} />
                    : <>
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
                                        description = track.description.substring(0, 180) + '...'
                                    }

                                    let imgSrc = ''
                                    // Production
                                    imgSrc = track.cover
                                    // Development
                                    // imgSrc = 'http://localhost:8000' + track.cover

                                    if (matches) {
                                        return (
                                            <GridListTile component={Link} to={'/track/' + track.id} key={track.id} style={{ textDecoration: 'none', maxHeight: '300px' }}>
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
                                                        <span style={{ minHeight: '130px', maxHeight: '130px', minWidth: '400px', maxWidth: '400px' }}>{description}</span>
                                                    </Typography>
                                                </Grid>
                                            </GridListTile>
                                        )
                                    } else {
                                        return (
                                            <GridListTile component={Link} to={'/track/' + track.id} key={track.id} style={{ textDecoration: 'none', maxHeight: '300px' }}>
                                                <Grid item className={classes.carouselItemAdapt}>
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
                                                </Grid>
                                            </GridListTile>
                                        )
                                    }
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
                                        description = playlist.description.substring(0, 190) + '...'
                                    }
                                    let tracks = Array<string>()

                                    playlist.tracks.map((track: obj) => {
                                        tracks.push(track.title)
                                        return ('')
                                    })
                                    if (tracks.length > 5) {
                                        tracks = tracks.splice(0, 5);
                                        tracks.push('И другие...')
                                    } else {
                                        tracks = tracks.splice(0, tracks.length)
                                    }

                                    let imgSrc = ''
                                    // Production
                                    imgSrc = playlist.photo
                                    // Development
                                    // imgSrc = 'http://localhost:8000' + playlist.photo

                                    if (matches) {
                                        return (
                                            <GridListTile component={Link} to={'/playlist/' + playlist.id} key={playlist.id} style={{ textDecoration: 'none', maxHeight: '300px' }}>
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
                                                        <p style={{ minHeight: '130px', maxHeight: '130px', marginBottom: 0, }}>
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
                                    } else {
                                        return (
                                            <GridListTile style={{ textDecoration: 'none', maxHeight: '300px' }} component={Link} to={'/playlist/' + playlist.id} key={playlist.id}>
                                                <Grid item className={classes.carouselItemAdapt}>
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
                                                </Grid>
                                            </GridListTile>
                                        )
                                    }
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
                                        description = album.description.substring(0, 190) + '...'
                                    }

                                    let imgSrc = ''
                                    // Production
                                    imgSrc = album.cover
                                    // Development
                                    // imgSrc = 'http://localhost:8000' + album.cover

                                    if (matches) {
                                        return (
                                            <GridListTile style={{ textDecoration: 'none', maxHeight: '300px' }} component={Link} to={'/album/' + album.id} key={album.id}>
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
                                                        <span style={{ minHeight: '130px', maxHeight: '130px', minWidth: '400px', maxWidth: '400px' }}>{description}</span>
                                                    </Typography>
                                                </Grid>
                                            </GridListTile>
                                        )
                                    } else {
                                        return (
                                            <GridListTile style={{ textDecoration: 'none', maxHeight: '300px' }} component={Link} to={'/album/' + album.id} key={album.id}>
                                                <Grid item className={classes.carouselItemAdapt}>
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
                                                </Grid>
                                            </GridListTile>
                                        )
                                    }
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

                                    let imgSrc = ''
                                    // Production
                                    imgSrc = artist.photo
                                    // Development
                                    // imgSrc = 'http://localhost:8000' + artist.photo

                                    if (matches) {
                                        return (
                                            <GridListTile
                                                component={Link}
                                                to={'/artist/' + artist.id}
                                                key={artist.id}
                                                style={{ textDecoration: 'none', maxHeight: '300px' }}
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
                                                        <span style={{ minHeight: '120px', maxHeight: '120px', minWidth: '400px', maxWidth: '400px' }}>{description}</span>
                                                    </Typography>
                                                </Grid>
                                            </GridListTile>
                                        )
                                    } else {
                                        return (
                                            <GridListTile
                                                component={Link}
                                                to={'/artist/' + artist.id}
                                                key={artist.id}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <Grid item className={classes.carouselItemAdapt}>
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
                                                </Grid>
                                            </GridListTile>
                                        )
                                    }
                                })}
                            </Carousel>
                        </div>
                    </>
                }
            </div>
        </Grid >

    );
};

export default Home;