import React, { useState, useEffect } from 'react'
import { ListItem, ListItemText, Collapse, List, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

interface genre {
    id: number,
    name: string,
}

interface fav_genre {
    id: string,
    genre: number
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

const FavoriteGenres = () => {
    const [openFavGenres, setOpenFavGenres] = useState(false)
    const [favoriteGenres, setFavoriteGenres] = useState<Array<fav_genre>>()
    const classes = useStyles()

    const handleOpenFavGenres = () => {
        setOpenFavGenres(!openFavGenres);
    };

    useEffect(() => {
        const fetchFavoriteGenres = async () => {

            let link3 = ''

            // Production
            link3 = 'http://musicality.std-1578.ist.mospolytech.ru/api/get-favorite-genres/'
            // Development
            // link3 = 'http://localhost:8000/api/get-favorite-genres/'

            const response3 = await axios(
                link3, {
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' + Cookies.get('csrftoken') },
                withCredentials: true,
            })

            const content3: fav_genre[] = await response3.data

            if (content3.length !== 0) {
                let link = ''
                // Production
                link = 'http://musicality.std-1578.ist.mospolytech.ru/api/genres/'
                // Development
                // link = 'http://localhost:8000/api/genres/'

                const response3 = await axios(
                    link, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                )

                if (typeof (content3.length) !== 'undefined') {
                    var a = new Array()
                    response3.data.map((ge: genre) => {
                        content3.map((obj: fav_genre) => {
                            if (ge.id === obj.genre) {
                                a.push(ge)
                            }
                        })
                    });
                    setFavoriteGenres(a)
                }
            }
        }
        fetchFavoriteGenres()
    }, [])

    let genres_content

    if (typeof (favoriteGenres) !== 'undefined' && favoriteGenres?.length !== 0) {
        genres_content = (
            <>
                {favoriteGenres?.map((gr: any) => (
                    <>
                        <Grid item key={gr.id} xs={12} sm={6} md={4} lg={3} component={Link} to={'/genre/' + gr.id} className={classes.gridItem}>
                            <Card className={classes.card}>
                                <CardActionArea onMouseOver={() => { document.getElementById(('genreCard' + gr.id))?.setAttribute('style', 'opacity: 1; bottom: -10px') }} onMouseOut={() => { document.getElementById(('genreCard' + gr.id))?.removeAttribute('style') }}>
                                    <CardMedia
                                        className={classes.media}

                                        // Production
                                        image={gr.cover}
                                        // Development
                                        // image={'http://localhost:8000' + gr.cover}

                                        title={gr.name}
                                    />
                                    <CardContent className={classes.titleBar} id={"genreCard" + gr.id}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {gr.name}
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
        genres_content = (
            <h4>Нет избранных жанров</h4>
        )
    }

    return (
        <>
            <ListItem button onClick={handleOpenFavGenres}>
                <h2><ListItemText primary="Избранные жанры" style={{ fontSize: '100px' }} /></h2>
                {openFavGenres ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openFavGenres} timeout="auto" unmountOnExit>
                <List component="div">
                    <ListItem>
                        <span style={{ minWidth: '200px' }}>
                            {genres_content}
                        </span>
                    </ListItem>
                </List>
            </Collapse>
        </>
    )
}

export default FavoriteGenres