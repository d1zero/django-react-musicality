import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Collapse, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import Cookies from 'js-cookie';
import { album, fav_album } from '../FavoriteInterfaces';
import { useStyles } from './FavoriteAlbumsStyles'


const FavoriteAlbums = () => {
    const [openFavAlbums, setOpenFavAlbums] = useState(false)
    const [favoriteAlbums, setFavoriteAlbums] = useState<Array<fav_album>>()
    const classes = useStyles()

    const handleOpenFavAlbums = () => {
        setOpenFavAlbums(!openFavAlbums);
    };

    useEffect(() => {
        const fetchFavoriteAlbums = async () => {
            let link5 = ''
            // Production
            link5 = 'http://musicality.std-1578.ist.mospolytech.ru/api/get-favorite-albums/'
            // Development
            // link5 = 'http://localhost:8000/api/get-favorite-albums/'

            const response5 = await axios(
                link5, {
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' + Cookies.get('csrftoken') },
                withCredentials: true,
            })
            const content5: fav_album[] = await response5.data
            if (content5.length !== 0) {
                let link = ''
                // Production
                link = 'http://musicality.std-1578.ist.mospolytech.ru/api/albums/'
                // Development
                // link = 'http://localhost:8000/api/albums/'

                const response5 = await axios(
                    link, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                )
                if (typeof (content5.length) !== 'undefined') {
                    var a = new Array()
                    response5.data.map((al: album) => {
                        content5.map((obj: fav_album) => {
                            if (al.id === obj.album) {
                                a.push(al)
                            }
                        })
                    });
                    setFavoriteAlbums(a)
                }
            }
        }
        fetchFavoriteAlbums()
    }, [])

    let albums_content

    if (typeof (favoriteAlbums) !== 'undefined' && favoriteAlbums?.length !== 0) {
        albums_content = (
            <>
                {favoriteAlbums?.map((al: any) => (
                    <>
                        <Grid item key={al.id} xs={12} sm={6} md={4} lg={3} component={Link} to={'/album/' + al.id} className={classes.gridItem}>
                            <Card className={classes.card}>
                                <CardActionArea onMouseOver={() => { document.getElementById(('albumCard' + al.id))?.setAttribute('style', 'opacity: 1; bottom: -10px') }} onMouseOut={() => { document.getElementById(('albumCard' + al.id))?.removeAttribute('style') }}>
                                    <CardMedia
                                        className={classes.media}

                                        // Production
                                        image={al.cover}
                                        // Development
                                        // image={'http://localhost:8000' + al.cover}

                                        title={al.name}
                                    />
                                    <CardContent className={classes.titleBar} id={"albumCard" + al.id}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {al.name}
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
        albums_content = (
            <h4>Нет избранных альбомов</h4>
        )
    }

    return (
        <>
            <ListItem button onClick={handleOpenFavAlbums}>
                <h2><ListItemText primary="Избранные альбомы" style={{ fontSize: '100px' }} /></h2>
                {openFavAlbums ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openFavAlbums} timeout="auto" unmountOnExit>
                <List component="div">
                    <ListItem>
                        <span style={{ minWidth: '200px' }}>
                            {albums_content}
                        </span>
                    </ListItem>
                </List>
            </Collapse>
        </>)
}

export default FavoriteAlbums