import  { useState, useEffect, SyntheticEvent } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Typography, Container, Grid, Card, CardActionArea, CardMedia, CardContent, useMediaQuery, Snackbar, IconButton } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Cookies from "js-cookie"
import MuiAlert from "@material-ui/lab/Alert";
import {useStyles} from './ArtistDetailStyles'


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
                headers: { 'Content-Type': 'application/json', 'Authorization': 'duplexMismatch' },
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
                    headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' + Cookies.get('csrftoken'), 'Authorization': 'duplexMismatch' },
                    withCredentials: true,
                }
                )
                if (response2.data.message === 'success') {
                    setFavorite(true)
                }
            }
        }
        fetchData()
    }, [artistId, props.username])


    const addToFavorite = async (artistId: number) => {
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

            await axios(
                link, {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': '' + Cookies.get('csrftoken'), 'Authorization': 'duplexMismatch' },
                withCredentials: true,
                data: { 'username': props.username }
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
                        <IconButton aria-label="add to favorites" id="favorite" onClick={() => { addToFavorite(data.id) }}>
                            {favorite ? <FavoriteIcon style={{ 'color': 'red' }} /> : <FavoriteBorderIcon />}
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