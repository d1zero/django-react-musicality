import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Collapse, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Cookies from 'js-cookie';


interface playlist {
    id: number,
    name: string,
}

interface fav_playlist {
    id: string,
    playlist: number
}

const useStyles = makeStyles((theme) => ({
    card: {
        borderRadius: '10px',
        maxWidth: theme.spacing(25),
        maxHeight: theme.spacing(25),
    },
    media: {
        height: theme.spacing(25),
        width: theme.spacing(25),
        objectFit: 'cover',
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
    gridItem: {
        textDecoration: 'none',
    },
}))

const FavoritePlaylists = () => {
    const [openFavPlaylists, setOpenFavPlaylists] = useState(false)
    const [favoritePlaylists, setFavoritePlaylists] = useState<Array<fav_playlist>>()
    const classes = useStyles()

    const handleOpenFavPlaylists = () => {
        setOpenFavPlaylists(!openFavPlaylists);
    };

    useEffect(() => {
        const fetchFavoritePlaylists = async () => {
            let link4 = ''
            // Production
            link4 = 'http://musicality.std-1578.ist.mospolytech.ru/api/get-favorite-playlists/'
            // Development
            // link4 = 'http://localhost:8000/api/get-favorite-playlists/'

            const response4 = await axios(
                link4, {
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' + Cookies.get('csrftoken') },
                withCredentials: true,
            })

            const content4: fav_playlist[] = await response4.data

            if (content4.length !== 0) {
                let link = ''
                // Production
                link = 'http://musicality.std-1578.ist.mospolytech.ru/api/playlists/'
                // Development
                // link = 'http://localhost:8000/api/playlists/'

                const response4 = await axios(
                    link, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                )

                if (typeof (content4.length) !== 'undefined') {
                    var a = new Array()
                    response4.data.map((pl: playlist) => {
                        content4.map((obj: fav_playlist) => {
                            if (pl.id === obj.playlist) {
                                a.push(pl)
                            }
                        })
                    });
                    setFavoritePlaylists(a)
                }
            }
        }
        fetchFavoritePlaylists()
    }, [])

    let playlists_content

    if (typeof (favoritePlaylists) !== 'undefined' && favoritePlaylists?.length !== 0) {
        playlists_content = (
            <>
                {favoritePlaylists?.map((pl: any) => (
                    <>
                        <Grid item key={pl.id} xs={12} sm={6} md={4} lg={3} component={Link} to={'/playlist/' + pl.id} className={classes.gridItem}>
                            <Card className={classes.card}>
                                <CardActionArea onMouseOver={() => { document.getElementById(('playlistCard' + pl.id))?.setAttribute('style', 'opacity: 1; bottom: -10px') }} onMouseOut={() => { document.getElementById(('playlistCard' + pl.id))?.removeAttribute('style') }}>
                                    <CardMedia
                                        className={classes.media}

                                        // Production
                                        image={pl.photo}
                                        // Development
                                        // image={'http://localhost:8000' + pl.photo}

                                        title={pl.name}
                                    />
                                    <CardContent className={classes.titleBar} id={"playlistCard" + pl.id}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {pl.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <br />
                    </>
                ))}
            </>
        )
    } else {
        playlists_content = (
            <h4>Нет избранных плейлистов</h4>
        )
    }

    return (
        <>
            <ListItem button onClick={handleOpenFavPlaylists}>
                <h2><ListItemText primary="Избранные плейлисты" style={{ fontSize: '100px' }} /></h2>
                {openFavPlaylists ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openFavPlaylists} timeout="auto" unmountOnExit>
                <List component="div">
                    <ListItem>
                        <span style={{ minWidth: '200px' }}>
                            {playlists_content}
                        </span>
                    </ListItem>
                </List>
            </Collapse>
        </>
    )
}

export default FavoritePlaylists