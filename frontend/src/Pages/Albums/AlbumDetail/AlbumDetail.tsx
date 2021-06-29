import { useState, useEffect, SyntheticEvent } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Typography, Container, Grid, Card, CardActionArea, CardMedia, CardContent, Snackbar, IconButton } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Cookies from "js-cookie"
import MuiAlert from "@material-ui/lab/Alert";
import { useStyles } from './AlbumDetailStyles'


function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface art {
    id: number,
    nickname: string,
}

interface trc {
    id: number,
    title: string,
    cover: string,
    soundtrack: string,
}

interface alb {
    id: number,
    name: string,
    description: string,
    cover: string,
    date_of_release: string,
    artists_info: art[],
    tracks_info: trc[],
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


const AlbumDetail = (props: any) => {
    const albumId = props.match.params.albumId;
    const [data, setData] = useState<alb>();
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
            link = 'http://musicality.std-1578.ist.mospolytech.ru/api/albums/' + albumId
            // Development
            // link = 'http://localhost:8000/api/albums/' + albumId

            const response1 = await axios(
                link, {
                headers: { 'Content-Type': 'application/json', 'Authorization': 'duplexMismatch' },
                withCredentials: true
            }
            )
            await setData(response1.data)

            if (props.username !== '') {
                // Production
                link = 'http://musicality.std-1578.ist.mospolytech.ru/api/get-favorite-albums/' + albumId
                // Development
                // link = 'http://localhost:8000/api/get-favorite-albums/' + albumId

                const response2 = await axios(
                    link, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': '' + Cookies.get('csrftoken'),
                        'Authorization': 'duplexMismatch'
                    },
                    withCredentials: true,
                }
                )
                if (response2.data.message === 'success') {
                    setFavorite(true)
                }
            }
        }
        fetchData()
    }, [albumId, props.username])

    const addToFavorite = async (albumId: number) => {
        if (props.username !== '') {
            if (favorite) {
                setFavorite(false)
            } else {
                setFavorite(true)
            }

            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/api/add-album-to-favorite/' + albumId.toString()
            // Development
            // link = 'http://localhost:8000/api/add-album-to-favorite/' + albumId.toString()

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


    if (typeof (data) !== 'undefined') {
        let imgSrc = ''
        // Production
        imgSrc = data.cover
        // Development
        // imgSrc = 'http://localhost:8000' + data.cover
        var iter = 0

        return (
            <div className={classes.root}>
                <Helmet>
                    <title>Альбомы: {data.name}</title>
                </Helmet>
                <Container maxWidth="md">
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                        open={open} autoHideDuration={5000} onClose={handleClose}>
                        <Alert severity="warning">Авторизуйтесь или зарегистрируйтесь, чтобы добавлять в избранное</Alert>
                    </Snackbar>
                    <ThemeProvider theme={theme}>
                        <Typography gutterBottom variant="h1" align="center">{data.name}</Typography>
                    </ThemeProvider>

                    <Grid container direction="row">
                        <img src={imgSrc} alt={data.name} style={{ 'width': '400px', 'height': '400px', 'borderRadius': '10px', 'objectFit': 'cover', 'marginRight': theme.spacing(3) }} />
                        <Grid direction="column">
                            <Typography gutterBottom variant="h6">Об альбоме:</Typography>
                            <Typography gutterBottom variant="body1" style={{ wordWrap: "break-word", maxWidth: '480px' }}>{data.description}</Typography>
                            <Typography gutterBottom variant="h6">Исполнители: {data.artists_info.map((artist: art) => {
                                iter += 1
                                return (
                                    <>
                                        <Typography style={{ textDecoration: 'none', color: '#D32F2F' }} component={Link} to={'/artist/' + artist.id} key={artist.id}>
                                            <i>{artist.nickname}</i>
                                        </Typography>
                                        {(data.artists_info.length > 1 && iter !== data.artists_info.length) ? ', ' : ''}
                                    </>
                                );
                            })}
                            </Typography>
                            <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                                <Typography variant="h6">Дата выхода:&nbsp;</Typography>
                                <Typography>{data.date_of_release}</Typography>
                            </span>
                            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '32px' }}>
                                {favorite ? <Typography variant="h6">В избранном</Typography> : <Typography variant="h6">Добавить в избранное</Typography>}
                                <IconButton aria-label="add to favorites" id="favorite" onClick={() => { addToFavorite(data.id) }}>
                                    {favorite ? <FavoriteIcon style={{ 'color': 'red' }} /> : <FavoriteBorderIcon />}
                                </IconButton>
                            </span>
                        </Grid>
                    </Grid>
                    <br />
                    <Typography variant="h3">Треки:</Typography><br />
                    <div className="tracks">
                        <Grid spacing={3} container>
                            {data.tracks_info.map((track: trc) => {
                                let imgTrackSrc

                                // Production
                                imgTrackSrc = track.cover
                                // Development
                                // imgTrackSrc = 'http://localhost:8000' + track.cover

                                return (
                                    <Grid item component={Link} to={'/track/' + track.id}>
                                        <Card className={classes.card}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}

                                                    image={imgTrackSrc}

                                                    title={track.title}
                                                />
                                                <CardContent className={classes.titleBar}>
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
                    </div>
                </Container>
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default AlbumDetail;