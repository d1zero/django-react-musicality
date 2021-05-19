import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container, Card, Grid, CardMedia, CardActionArea, CardContent, Typography, CircularProgress } from '@material-ui/core';
import { Helmet } from 'react-helmet'

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
        minHeight: '200px',
        maxHeight: '200px',
    },
    paddingBottom: {
        marginBottom: '2000px'
    },
}))

const TrackList = () => {
    const [data, setData]: any[] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoader(true)

            let link = ''
            // Production
            // link = 'http://musicality.std-1578.ist.mospolytech.ru/api/tracks'
            // Development
            link = 'http://localhost:8000/api/tracks/'

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

    console.log(data);

    interface art {
        id: number,
        nickname: string,
        first_name: string,
        last_name: string,
        photo: string,
    }

    interface obj {
        id: number,
        title: string,
        cover: string,
        artists_info: art[],
        description: string,
    }

    const classes = useStyles();
    const classs = classes.mainContent + ' ' + classes.paddingBottom;

    if (typeof (data) !== 'undefined') {
        if (loader) {
            return (
                <CircularProgress className={classs} />
            )
        } else {
            return (
                <main>
                    <Helmet><title>Треки</title></Helmet>
                    <div className={classes.mainContent}>
                        <Container maxWidth="md">
                            <ThemeProvider theme={theme}>
                                <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
                                    Аудиотреки
                                </Typography>
                            </ThemeProvider>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                На этой странице вы можете просмотреть все треки, доступные в нашей библиотеке на данный момент
                            </Typography>
                        </Container>
                    </div>
                    <Container maxWidth="md" >
                        <Grid container spacing={4}>
                            {data.map((item: obj) => {
                                let description = ''

                                if (item.description.length < 110) {
                                    description = item.description
                                } else {
                                    description = item.description.substring(0, 110) + '...'
                                }

                                let imgSrc = ''
                                // Production
                                // imgSrc = item.cover
                                // Development
                                imgSrc = 'http://localhost:8000' + item.cover

                                return (
                                    <Grid item key={item.id} xs={12} sm={6} md={4} component={Link} to={'/track/' + item.id} style={{ textDecoration: 'none' }}>
                                        <Card className={classes.card}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={imgSrc}
                                                    title={item.title}
                                                />
                                                <CardContent className={classes.titleBar}>
                                                    <Typography gutterBottom variant="h5" component="h2" style={{ minHeight: '64px', maxHeight: '64px' }}>
                                                        {item.title}
                                                    </Typography>
                                                    <Typography gutterBottom variant="body2" component="h5" style={{ marginBottom: '15px' }} >
                                                        Исполнители:<br /> {item.artists_info.map((artist: art) => {
                                                            return (
                                                                <span key={artist.id}>
                                                                    <Link to={'/artist/' + artist.id.toString()} key={artist.id} style={{ textDecoration: 'none' }}>
                                                                        {artist.nickname}
                                                                    </Link>&nbsp;
                                                                </span>
                                                            )
                                                        })}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p" >
                                                        {description}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                )

                            })
                            }
                        </Grid>
                    </Container>
                </main>
            )
        }
    } else {
        return (
            <CircularProgress className={classs} />
        )
    }
}

export default TrackList;