import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet'
import { Container, Card, Grid, CardMedia, CardActionArea, CardContent, Typography, CircularProgress } from '@material-ui/core';
import {useStyles} from './AlbumListStyles'

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



interface art {
    id: number,
    nickname: string,
    first_name: string,
    last_name: string
}

interface alb {
    id: number,
    name: string,
    description: string,
    cover: string,
    artists_info: art[],
    type_of_album: string,
}

const AlbumList = () => {
    const [data, setData]: any[] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoader(true)
            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/api/albums/'
            // Development
            // link = 'http://localhost:8000/api/albums/'

            const response1 = await axios(
                link, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setData(response1.data)
            setTimeout(() => {
                setLoader(false)
            }, 300);
        }
        fetchData()
    }, [])

    const classes = useStyles()

    return (
        <div>
            <Helmet>
                <title>Альбомы</title>
            </Helmet>
            {loader
                ? <CircularProgress className={classes.loader} />
                :
                <>
            <div className={classes.mainContent}>
                <Container maxWidth="md">
                    <ThemeProvider theme={theme}>
                        <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
                            Альбомы
                        </Typography>
                    </ThemeProvider>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        На этой странице вы можете просмотреть все альбомы, доступные в нашей библиотеке на данный момент
                    </Typography>
                </Container>
            </div>
            <Container maxWidth="md" >
                <Grid container spacing={4}>
                    {data.map((album: alb) => {
                        let imgSrc = ''
                        // Production
                        imgSrc = album.cover
                        // Development
                        // imgSrc = 'http://localhost:8000' + album.cover

                        let description = ''
                        if (album.description.length < 110) {
                            description = album.description
                        } else {
                            description = album.description.substring(0, 110) + '...'
                        }

                        return (
                            <Grid item key={album.id} xs={12} sm={6} md={4} component={Link} to={'/album/' + album.id} style={{ textDecoration: 'none' }}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={imgSrc}
                                            title={album.name}
                                        />
                                        <CardContent className={classes.titleBar}>
                                            <Typography gutterBottom variant="h5" component="h2" style={{ minHeight: '32px', maxHeight: '32px' }}>
                                                {album.name.substring(0,20)} {(album.name.length < 20) ? '' : '...'}
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="h5">
                                                {album.type_of_album}
                                            </Typography>
                                            <Typography gutterBottom>
                                                {album.artists_info.map((artist: art) => {
                                                    return (
                                                        <Typography variant="button" key={artist.id}>
                                                            <Link to={'/artist/' + artist.id} style={{textDecoration: 'none', color: '#D32F2F'}}><i>{artist.nickname}</i></Link>&nbsp;
                                                        </Typography>
                                                    )
                                                })}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        );

                    })}
                </Grid>
            </Container>
            </>
            }
        </div>
    )
}

export default AlbumList;