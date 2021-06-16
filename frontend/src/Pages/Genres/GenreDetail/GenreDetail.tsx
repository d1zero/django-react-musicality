import React, { useState, useEffect, SyntheticEvent } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Grid, Typography, Card, CardActionArea, CardMedia, CardContent, Container, Snackbar, IconButton } from '@material-ui/core'
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MuiAlert from "@material-ui/lab/Alert";
import {useStyles} from './GenreDetailStyles'


function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const theme = createMuiTheme();

theme.typography.h1 = {
    fontSize: '6rem',
    '@media (min-width:600px)': {
        fontSize: '6rem',
    },
    [theme.breakpoints.down('xs')]: {
        fontSize: '2rem',
    },
};




interface track {
    id: number,
    title: string,
    cover: string,
}

interface genre {
    id: number,
    tracks: track[],
    name: string,
    cover: string,
    description: string,
}

const GenreDetail = (props: any) => {
    const genreId = props.match.params.genreId;
    const [data, setData] = useState<genre>({
        id: 0, name: '', cover: '', description: '', tracks: [
            { id: 0, title: '', cover: '' }
        ]
    })
    const [open, setOpen] = useState(false)
    const [favorite, setFavorite] = useState(false)

    const handleClose: any = (e: SyntheticEvent) => {
        setOpen(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/api/genres/' + genreId
            // Development
            // link = 'http://localhost:8000/api/genres/' + genreId

            const response1 = await axios(
                link, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setData(response1.data)

            if (props.username !== '') {
                // Production
                link = 'http://musicality.std-1578.ist.mospolytech.ru/api/get-favorite-genres/' + genreId
                // Development
                // link = 'http://localhost:8000/api/get-favorite-genres/' + genreId
                const response2 = await axios(
                    link, {
                    headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' + Cookies.get('csrftoken') },
                    withCredentials: true,
                }
                )
                if (response2.data.message === 'success') {
                    setFavorite(true)
                }
            }
        }
        fetchData()
    }, [genreId])

    const addToFavorite = async (genreId: number) => {
        let heart = document.getElementById('favorite')
        if (props.username !== '') {
            if (favorite) {
                setFavorite(false)
            } else {
                setFavorite(true)
            }

            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/api/add-genre-to-favorite/' + genreId.toString()
            // Development
            // link = 'http://localhost:8000/api/add-genre-to-favorite/' + genreId.toString()

            await axios(
                link, {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' + Cookies.get('csrftoken') },
                withCredentials: true,
                data: { 'username': props.username }
            })
        } else {
            setOpen(true)
        }
    }


    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Helmet><title>Жанры: {data.name}</title></Helmet>
            <Container maxWidth="md">
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert severity="warning">Авторизуйтесь или зарегистрируйтесь, чтобы добавлять в избранное</Alert>
                </Snackbar>
                <ThemeProvider theme={theme}>
                    <Typography component="body" variant="h2" align="center" style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}>
                        <strong>
                            {data.name}
                        </strong>
                    </Typography>
                </ThemeProvider>
                <span className={classes.genreImageSpan}>
                    <img
                        className={classes.genreImage}

                        // Production
                        src={data.cover}
                        // Development
                        // src={'http://localhost:8000' + data.cover}

                        alt={data.name}
                    />
                </span>
                <br />
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {favorite ? <Typography variant="h6">В избранном</Typography> : <Typography variant="h6">Добавить в избранное</Typography>}
                    <IconButton aria-label="add to favorites" id="favorite" onClick={() => { addToFavorite(data.id) }} >
                        {favorite ? <><FavoriteIcon style={{ 'color': 'red' }} /></> : <><FavoriteBorderIcon /></>}
                    </IconButton>
                </span><br />
                <Typography align="center" variant='body2'>{data.description}</Typography><br /><br />
                <Grid container spacing={4}>
                    {data.tracks.map((track: track) => {
                        // iter += 1;
                        return (
                            <Grid item key={track.id} xs={12} sm={6} md={4} lg={3} component={Link} to={'/track/' + track.id} className={classes.gridItem}>
                                <Card className={classes.card}>
                                    <CardActionArea onMouseOver={() => { document.getElementById(('content' + track.id))?.setAttribute('style', 'opacity: 1; bottom: -10px') }} onMouseOut={() => { document.getElementById(('content' + track.id))?.removeAttribute('style') }}>
                                        <CardMedia
                                            className={classes.media}

                                            // Production
                                            image={track.cover}
                                            // Development
                                            // image={'http://localhost:8000' + track.cover}

                                            title={track.title}
                                        />
                                        <CardContent className={classes.titleBar} id={"content" + track.id}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {track.title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default GenreDetail;