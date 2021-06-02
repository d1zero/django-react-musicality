import React, { useState, useEffect, SyntheticEvent } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Typography, Container, Grid, Card, CardActionArea, CardMedia, CardContent, useMediaQuery, Snackbar, IconButton } from '@material-ui/core'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Cookies from "js-cookie"
import MuiAlert from "@material-ui/lab/Alert";


function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface alb {
    id: number,
    name: string,
    date_of_release: string,
    description: string,
    cover: string,
    type_of_album: string,
}

interface art {
    id: number,
    first_name: string,
    nickname: string,
    last_name: string,
    date_of_birth: string,
    photo: string,
    albums: alb[],
    about: string,
}

const theme = createMuiTheme();

theme.typography.h3 = {
    fontSize: '6rem',
    '@media (min-width:600px)': {
        fontSize: '4rem',
    },
    [theme.breakpoints.down('xs')]: {
        fontSize: '2rem',
    },
};



const useStyles = makeStyles((theme) => ({
    artistImageSpan: {
        display: 'grid',
        justifyContent: 'center'
    },
    artistImage: {
        width: '300px',
        height: '300px',
        objectFit: 'cover',
        marginBottom: theme.spacing(3)
    },
    about: {
        marginBottom: theme.spacing(5)
    },
    media: {
        height: theme.spacing(25),
        width: theme.spacing(25),
        object: 'fit',
    },
    card: {
        borderRadius: '10px',
        maxWidth: theme.spacing(25),
        maxHeight: theme.spacing(25),
        margin: theme.spacing(1),
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
}))

const ArtistDetail = (props: any) => {
    const artistId = props.match.params.artistId;
    const [data, setData] = useState<art>();
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [favorite, setFavorite] = useState(false)

    const handleClose: any = (e: SyntheticEvent) => {
        setOpen(false)
    }


    useEffect(() => {
        const fetchData = async () => {
            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/api/artists/' + artistId
            // Development
            // link = 'http://localhost:8000/api/artists/' + artistId

            const response1 = await axios(
                link, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setData(response1.data)

            if (props.username !== '') {
                // Production
                link = 'http://musicality.std-1578.ist.mospolytech.ru/api/get-favorite-artists/' + artistId
                // Development
                // link = 'http://localhost:8000/api/get-favorite-artists/' + artistId

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
    }, [artistId])


    const addToFavorite = async (artistId: number) => {
        let heart = document.getElementById('favorite')
        if (props.username !== '') {
            if (favorite) {
                setFavorite(false)
            } else {
                setFavorite(true)
            }

            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/api/add-artist-to-favorite/' + artistId.toString()
            // Development
            // link = 'http://localhost:8000/api/add-artist-to-favorite/' + artistId.toString()

            await fetch(
                link, {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' + Cookies.get('csrftoken') },
                credentials: 'include',
                body: JSON.stringify({ 'username': props.username })
            })
        } else {
            setOpen(true)
        }
    }

    const matches = useMediaQuery(theme.breakpoints.down('md'))

    if (typeof (data) !== 'undefined') {
        let imgSrc = ''
        // Production
        imgSrc = data.photo
        // Development
        // imgSrc = 'http://localhost:8000' + data.photo

        var single = data.albums.find(album => album.type_of_album === 'Сингл');
        var ep = data.albums.find(album => album.type_of_album === 'EP');
        var album = data.albums.find(album => album.type_of_album === 'Альбом');


        return (
            <div>
                <Helmet><title>Исполнитель: {data.nickname}</title></Helmet>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert severity="warning">Авторизуйтесь или зарегистрируйтесь, чтобы добавлять в избранное</Alert>
                </Snackbar>
                <br /><br /><br /><br />
                <Container maxWidth="md">
                    <ThemeProvider theme={theme}>
                        <Typography variant="h3" align="center">
                            {data.first_name} {data.last_name}
                        </Typography>
                        <Typography variant="h3" align="center">
                            "{data.nickname}"
                        </Typography><br />
                    </ThemeProvider>

                    <span className={classes.artistImageSpan}>
                        <img src={imgSrc} alt={data.nickname} className={classes.artistImage} />
                    </span>

                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {favorite ? <Typography variant="h6">В избранном</Typography> : <Typography variant="h6">Добавить в избранное</Typography>}
                        <IconButton aria-label="add to favorites" id="favorite">
                            {favorite ? <FavoriteIcon style={{ 'color': 'red' }} onClick={() => { addToFavorite(data.id) }} /> : <FavoriteBorderIcon onClick={() => { addToFavorite(data.id) }} />}
                        </IconButton>
                    </span><br />

                    <ThemeProvider theme={theme}>
                        <Typography gutterBottom variant="h3" align="center">Об артисте</Typography>
                        <Typography variant="body1" className={classes.about}>{data.about}</Typography>
                    </ThemeProvider>




                    <div id="single">
                        {(typeof (single) != "undefined" && single !== null) ?
                            <>
                                <Typography gutterBottom variant="h4">Синглы</Typography>
                                <Grid container spacing={3}>
                                    {data.albums.map((album: alb) => {
                                        let imgSrc = ''
                                        // Production
                                        imgSrc = album.cover
                                        // Development
                                        // imgSrc = 'http://localhost:8000' + album.cover

                                        if (album.type_of_album === 'Сингл') {
                                            return (
                                                <Grid item component={Link} to={'/album/' + album.id}>
                                                    <Card className={classes.card}>
                                                        <CardActionArea onMouseOver={() => { document.getElementById(('content' + album.id))?.setAttribute('style', 'opacity: 1; bottom: -10px') }} onMouseOut={() => { document.getElementById(('content' + album.id))?.removeAttribute('style') }}>
                                                            <CardMedia
                                                                className={classes.media}
                                                                image={imgSrc}
                                                                title={album.name}
                                                            />
                                                            <CardContent style={{
                                                                'opacity': matches ? '1' : '0',
                                                                'bottom': matches ? '-10px' : '',
                                                            }} className={classes.titleBar} id={"content" + album.id}>
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    {album.name}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                    </Card>
                                                </Grid>
                                            )
                                        } else {
                                            return ('')
                                        }
                                    })}
                                </Grid></>
                            :
                            <Typography variant="h4">Нет синглов</Typography>
                        }
                    </div>
                    <br />

                    <div id="ep">
                        {(typeof (ep) != "undefined" && ep !== null) ?
                            <>
                                <Typography gutterBottom variant="h4">EP</Typography>
                                <Grid container spacing={3}>
                                    {data.albums.map((album: alb) => {
                                        let imgSrc = ''
                                        // Production
                                        imgSrc = album.cover
                                        // Development
                                        // imgSrc = 'http://localhost:8000' + album.cover

                                        if (album.type_of_album === 'EP') {
                                            return (
                                                <Grid item component={Link} to={'/album/' + album.id}>
                                                    <Card className={classes.card}>
                                                        <CardActionArea onMouseOver={() => { document.getElementById(('content' + album.id))?.setAttribute('style', 'opacity: 1; bottom: -10px') }} onMouseOut={() => { document.getElementById(('content' + album.id))?.removeAttribute('style') }}>
                                                            <CardMedia
                                                                className={classes.media}
                                                                image={imgSrc}
                                                                title={album.name}
                                                            />
                                                            <CardContent style={{
                                                                'opacity': matches ? '1' : '0',
                                                                'bottom': matches ? '-10px' : '',
                                                            }} className={classes.titleBar} id={"content" + album.id}>
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    {album.name}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                    </Card>
                                                </Grid>
                                            )
                                        } else { return ('') }
                                    })}
                                </Grid>
                            </>
                            :
                            <Typography variant="h4">Нет EP</Typography>
                        }
                    </div>
                    <br />

                    <div id="album">
                        {(typeof (album) != "undefined" && album !== null) ?
                            <>
                                <Typography gutterBottom variant="h4">Альбомы</Typography>
                                <Grid container spacing={3}>
                                    {data.albums.map((album: alb) => {
                                        let imgSrc = ''
                                        // Production
                                        imgSrc = album.cover
                                        // Development
                                        // imgSrc = 'http://localhost:8000' + album.cover

                                        if (album.type_of_album === 'Альбом') {
                                            return (
                                                <Grid item component={Link} to={'/album/' + album.id}>
                                                    <Card className={classes.card}>
                                                        <CardActionArea onMouseOver={() => { document.getElementById(('content' + album.id))?.setAttribute('style', 'opacity: 1; bottom: -10px') }} onMouseOut={() => { document.getElementById(('content' + album.id))?.removeAttribute('style') }}>
                                                            <CardMedia
                                                                className={classes.media}
                                                                image={imgSrc}
                                                                title={album.name}
                                                            />
                                                            <CardContent style={{
                                                                'opacity': matches ? '1' : '0',
                                                                'bottom': matches ? '-10px' : '',
                                                            }} className={classes.titleBar} id={"content" + album.id}>
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    {album.name}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                    </Card>
                                                </Grid>
                                            )
                                        } else {
                                            return ('')
                                        }
                                    })}
                                </Grid>
                            </>
                            :
                            <Typography variant="h4">Нет альбомов</Typography>
                        }
                    </div>
                </Container>
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default ArtistDetail