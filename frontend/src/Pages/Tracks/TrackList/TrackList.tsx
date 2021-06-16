import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container, Card, Grid, CardMedia, CardActionArea, CardContent, Typography, CircularProgress } from '@material-ui/core';
import { Helmet } from 'react-helmet'
import { useStyles } from './TrackListStyles';

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

const TrackList = () => {
    const [data, setData]: any[] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoader(true)

            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/api/tracks'
            // Development
            // link = 'http://localhost:8000/api/tracks/'

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

    return (
        <main>
            <Helmet><title>Треки</title></Helmet>
            {loader
                ? <CircularProgress className={classes.loader} />
                :
                <>
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
                                imgSrc = item.cover
                                // Development
                                // imgSrc = 'http://localhost:8000' + item.cover

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
                                                    <Typography gutterBottom variant="h5" component="h2" style={{ minHeight: '32px', maxHeight: '32px' }}>
                                                        {item.title.substring(0, 14)}
                                                        {item.title.length < 15 ? '' : '...'}
                                                    </Typography>
                                                    <Typography gutterBottom variant="body2" component="h5" style={{ paddingBottom: '0', marginBottom: 0 }} >
                                                        Исполнители:<br /> {item.artists_info.map((artist: art) => {
                                                            return (
                                                                <span key={artist.id}>
                                                                    <Link to={'/artist/' + artist.id.toString()} key={artist.id} style={{ textDecoration: 'none', color: '#d32f2f' }}>
                                                                        <Typography variant="subtitle1" component="p"><i>{artist.nickname}</i></Typography>
                                                                    </Link>
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
                </>
            }
        </main>
    )
}


export default TrackList;