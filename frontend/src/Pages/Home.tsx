import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'



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
            objectFit: 'cover',
        },
        tile: {
            height: '300px !important',
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
    }),
);

const Home = () => {
    const [tracks, setTracks]: any[] = useState([])
    const [playlists, setPlaylists]: any[] = useState([])
    const [albums, setAlbums]: any[] = useState([])
    const [artists, setArtists]: any[] = useState([])

    useEffect(() => {
        const fetchData = async () => {
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
        }
        fetchData()
    }, [])

    interface obj {
        id: number,
        title: string,
        cover: string,
    }

    interface pla {
        id: number,
        name: string,
        photo: string,
    }

    interface alb {
        id: number,
        name: string,
        cover: string,
    }

    interface art {
        id: number,
        nickname: string,
        photo: string,
    }

    const classes = useStyles();

    if (typeof (tracks) !== 'undefined') {
        return (
            <>
            <Helmet>
                <title>Главная страница</title>
            </Helmet>
            <div className={classes.root}>
                <div className={classes.item}>
                    Популярные треки:
                    <GridList className={classes.gridList} cols={3.5}>
                        {tracks.map((track: obj) => (
                            <GridListTile className={classes.tile} component={Link} to={'/track/' + track.id} key={track.id}>
                                <img src={'http://localhost:8000' + track.cover} alt={track.title} />
                                <GridListTileBar
                                    title={track.title}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>

                <div className={classes.item}>
                    Популярные плейлисты: <br /><br />
                    <GridList className={classes.gridList} cols={3.5}>
                        {playlists.map((playlist: pla) => (
                            <GridListTile className={classes.tile} component={Link} to={'/playlist/' + playlist.id} key={playlist.id}>
                                <img src={'http://localhost:8000' + playlist.photo} alt={playlist.name} />
                                <GridListTileBar
                                    title={playlist.name}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>

                <div className={classes.item}>
                    Популярные альбомы: <br /><br />
                    <GridList className={classes.gridList} cols={3.5}>
                        {albums.map((album: alb) => (
                            <GridListTile className={classes.tile} component={Link} to={'/playlist/' + album.id} key={album.id}>
                                <img src={'http://localhost:8000' + album.cover} alt={album.name} />
                                <GridListTileBar
                                    title={album.name}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>

                <div className={classes.item}>
                    Популярные артисты: <br /><br />
                    <GridList className={classes.gridList} cols={3.5}>
                        {artists.map((artist: art) => (
                            <GridListTile className={classes.tile} component={Link} to={'/playlist/' + artist.id} key={artist.id}>
                                <img src={'http://localhost:8000' + artist.photo} alt={artist.nickname} />
                                <GridListTileBar
                                    title={artist.nickname}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
            </>
        );
    } else {
        return (<div><br /><br /><br /><br /><h1>Hello</h1></div>)
    }
};

export default Home;