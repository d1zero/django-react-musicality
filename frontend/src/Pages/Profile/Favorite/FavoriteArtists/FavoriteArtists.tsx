import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Collapse, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useStyles} from './FavoriteArtistsStyles'
import { fav_artist, artist } from '../FavoriteInterfaces';

const FavoriteArtists = () => {
    const [openFavArtists, setOpenFavArtists] = useState(false)
    const [favoriteArtists, setFavoriteArtists] = useState<Array<fav_artist>>()
    const classes = useStyles()

    const handleOpenFavArtists = () => {
        setOpenFavArtists(!openFavArtists);
    };

    useEffect(() => {
        const fetchFavoriteArtists = async () => {
            let link6 = ''

            // Production
            link6 = 'http://musicality.std-1578.ist.mospolytech.ru/api/get-favorite-artists/'
            // Development
            // link6 = 'http://localhost:8000/api/get-favorite-artists/'

            const response6 = await axios(
                link6, {
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' + Cookies.get('csrftoken') },
                withCredentials: true,
            })


            const content6: fav_artist[] = await response6.data

            if (content6.length !== 0) {
                let link = ''
                // Production
                link = 'http://musicality.std-1578.ist.mospolytech.ru/api/artists/'
                // Development
                // link = 'http://localhost:8000/api/artists/'

                const response6 = await axios(
                    link, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                )
                if (typeof (content6.length) !== 'undefined') {
                    var a = new Array()
                    response6.data.map((ar: artist) => {
                        content6.map((obj: fav_artist) => {
                            if (ar.id === obj.artist) {
                                a.push(ar)
                            }
                        })
                    });
                    setFavoriteArtists(a)
                }
            }
        }
        fetchFavoriteArtists()
    }, [])

    let artists_content

    if (typeof (favoriteArtists) !== 'undefined' && favoriteArtists?.length !== 0) {
        artists_content = (
            <>
                {favoriteArtists?.map((ar: any) => (
                    <>
                        <Grid item key={ar.id} xs={12} sm={6} md={4} lg={3} component={Link} to={'/artist/' + ar.id} className={classes.gridItem}>
                            <Card className={classes.card}>
                                <CardActionArea onMouseOver={() => { document.getElementById(('artistCard' + ar.id))?.setAttribute('style', 'opacity: 1; bottom: -10px') }} onMouseOut={() => { document.getElementById(('artistCard' + ar.id))?.removeAttribute('style') }}>
                                    <CardMedia
                                        className={classes.media}

                                        // Production
                                        image={ar.photo}
                                        // Development
                                        // image={'http://localhost:8000' + ar.photo}

                                        title={ar.nickname}
                                    />
                                    <CardContent className={classes.titleBar} id={"artistCard" + ar.id}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {ar.nickname}
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
        artists_content = (
            <h4>Нет избранных исполнителей</h4>
        )
    }


    return (
        <>
            <ListItem button onClick={handleOpenFavArtists}>
                <h2><ListItemText primary="Избранные исполнители" style={{ fontSize: '100px' }} /></h2>
                {openFavArtists ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openFavArtists} timeout="auto" unmountOnExit>
                <List component="div">
                    <ListItem>
                        <span style={{ minWidth: '200px' }}>
                            {artists_content}
                        </span>
                    </ListItem>
                </List>
            </Collapse>
        </>
    )
}

export default FavoriteArtists