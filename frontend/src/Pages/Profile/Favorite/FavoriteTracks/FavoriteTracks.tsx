import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Collapse, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import Cookies from 'js-cookie';
import { track, fav_track } from '../FavoriteInterfaces'
import { useStyles } from './FavoriteTracksStyles'


const FavoriteTracks = () => {
    const [openFavTracks, setOpenFavTracks] = useState(false)
    const [favoriteTracks, setFavoriteTracks] = useState<Array<fav_track>>()
    const classes = useStyles()

    const handleOpenFavTracks = () => {
        setOpenFavTracks(!openFavTracks);
    };

    useEffect(() => {
        const fetchFavoriteTracks = async () => {
            let link2 = ''
            // Production
            // link2 = 'http://musicality.std-1578.ist.mospolytech.ru/api/get-favorite-tracks/'
            // Development
            link2 = 'http://localhost:8000/api/get-favorite-tracks/'
            const response2 = await axios(
                link2, {
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' + Cookies.get('csrftoken') },
                withCredentials: true,
            })
            const content2: fav_track[] = await response2.data
            if (content2.length !== 0) {
                let link = ''
                // Production
                link = 'http://musicality.std-1578.ist.mospolytech.ru/api/tracks/'
                // Development
                // link = 'http://localhost:8000/api/tracks/'

                const response2 = await axios(
                    link, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                )

                if (typeof (content2.length) !== 'undefined') {
                    var a = new Array()
                    response2.data.map((tr: track) => {
                        content2.map((obj: fav_track) => {
                            if (tr.id === obj.track) {
                                a.push(tr)
                            }
                        })
                    });
                    setFavoriteTracks(a)
                }
            }
        }
        fetchFavoriteTracks()

    }, [])

    let tracks_content
    if (typeof (favoriteTracks) !== 'undefined' && favoriteTracks?.length !== 0) {
        tracks_content = (
            <>
                {favoriteTracks?.map((tr: any) =>
                    <>
                        <Grid item key={tr.id} xs={12} sm={6} md={4} lg={3} component={Link} to={'/track/' + tr.id} className={classes.gridItem}>
                            <Card className={classes.card}>
                                <CardActionArea onMouseOver={() => { document.getElementById(('trackCard' + tr.id))?.setAttribute('style', 'opacity: 1; bottom: -10px') }} onMouseOut={() => { document.getElementById(('trackCard' + tr.id))?.removeAttribute('style') }}>
                                    <CardMedia
                                        className={classes.media}

                                        // Production
                                        image={tr.cover}
                                        // Development
                                        // image={'http://localhost:8000' + tr.cover}

                                        title={tr.title}
                                    />
                                    <CardContent className={classes.titleBar} id={"trackCard" + tr.id}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {tr.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <br />
                    </>
                )}
            </>
        )
    } else {
        tracks_content = (
            <h4>Нет избранных треков</h4>
        )
    }

    return (
        <>
            <ListItem button onClick={handleOpenFavTracks}>
                <h2><ListItemText primary="Избранные треки" style={{ fontSize: '100px' }} /></h2>
                {openFavTracks ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openFavTracks} timeout="auto" unmountOnExit>
                <List component="div">
                    <ListItem>
                        <span style={{ minWidth: '200px' }}>
                            {tracks_content}
                        </span>
                    </ListItem>
                </List>
            </Collapse>
        </>
    )
}

export default FavoriteTracks;