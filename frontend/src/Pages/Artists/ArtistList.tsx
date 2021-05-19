import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet'
import { Container, Card, Grid, CardMedia, CardActionArea, CardContent, Typography } from '@material-ui/core';

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

const useStyles = makeStyles((theme) => ({
    mainContent: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(6),
        paddingBottom: theme.spacing(3)
    },
    media: {
        paddingTop: "75%",
    },
    card: {
        borderRadius: '10px',
        boxShadow: '0 1px 2px rgba(0,0,0,.15)',
        transition: 'box-shadow 10s ease-in-out:',
        '&:hover': {
            transition: 'box-shadow 10s ease-in-out:',
            boxShadow: '7px 6px 8px 0px rgba(0, 0, 0, 0.3)',
        }
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 60%)',
        minHeight: '110px',
        maxHeight: '110px',
    },
    paddingBottom: {
        marginBottom: '2000px'
    },
}))

interface art {
    id: number,
    nickname: string,
    first_name: string,
    last_name: string,
    photo: string,
    about: string,
}


const ArtistList = () => {
    const [data, setData]: any = useState([])

    useEffect(() => {
        const fetchData = async () => {
            let link = ''
            // Production
            // link = 'http://musicality.std-1578.ist.mospolytech.ru/api/artists/'
            // Development
            link = 'http://localhost:8000/api/artists/'

            const response1 = await axios(
                link, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setData(response1.data)
        }
        fetchData()
    }, [])

    const classes = useStyles()


    return (
        <div>
            <Helmet><title>Исполнители</title></Helmet>
            <div className={classes.mainContent}>
                <Container maxWidth="md">
                    <ThemeProvider theme={theme}>
                        <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
                            Исполнители
                        </Typography>
                    </ThemeProvider>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        На этой странице вы можете просмотреть всех исполнителей, чьи треки доступны в Musicality
                    </Typography>
                </Container>
            </div>
            <Container maxWidth="md" >
                <Grid container spacing={4}>
                    {data.map((artist: art) => {
                        let imgSrc = ''
                        // Production
                        // imgSrc = artist.photo
                        // Development
                        imgSrc = 'http://localhost:8000' + artist.photo

                        let about = ''
                        if (artist.about.length < 120) {
                            about = artist.about
                        } else {
                            about = artist.about.substring(0, 120) + '...'
                        }

                        return (
                            <Grid item key={artist.id} xs={12} sm={6} md={4} component={Link} to={'/artist/' + artist.id} style={{ textDecoration: 'none' }}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={imgSrc}
                                            title={artist.nickname}
                                        />
                                        <CardContent className={classes.titleBar}>
                                            <Typography gutterBottom variant="h5" component="h2" style={{ minHeight: '32px', maxHeight: '32px' }}>
                                                {artist.nickname}
                                            </Typography>

                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {about}
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

export default ArtistList