import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Typography, Container, Grid, Card, CardActionArea, CardMedia, CardContent, useMediaQuery } from '@material-ui/core'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

interface alb {
    id: number,
    name: string,
    date_of_release: string,
    description: string,
    cover: string,
    type_of_album: string,
}

interface art {
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
    const classes = useStyles()

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
        }
        fetchData()
    }, [artistId])

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
                <br /><br /><br /><br />
                <Container maxWidth="md">
                    <ThemeProvider theme={theme}>
                        <Typography variant="h3" align="center">
                            {data.first_name} "{data.nickname}" {data.last_name}
                        </Typography><br />
                    </ThemeProvider>

                    <span className={classes.artistImageSpan}>
                        <img src={imgSrc} alt={data.nickname} className={classes.artistImage} />
                    </span>

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

                                                                // Production
                                                                image={album.cover}
                                                                // Development
                                                                // image={'http://localhost:8000' + album.cover}

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

                                                                // Production
                                                                image={album.cover}
                                                                // Development
                                                                // image={'http://localhost:8000' + album.cover}

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
                                        }
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

                                                                // Production
                                                                image={album.cover}
                                                                // Development
                                                                // image={'http://localhost:8000' + album.cover}

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