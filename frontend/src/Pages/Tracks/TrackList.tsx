import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, Grid, CardActions, CardMedia, CardActionArea, CardContent, Typography, Button } from '@material-ui/core';
import { Helmet } from 'react-helmet'


const useStyles = makeStyles((theme) => ({
    mainContent: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(6),
        paddingBottom: theme.spacing(3)
    },
    media: {
        paddingTop: "75%",
    },
}))

const TrackList = () => {
    const [data, setData]: any[] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios(
                `http://localhost:8000/api/tracks`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )
            await setData(response1.data)
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
        artists_info: art[]
    }

    const classes = useStyles();


    return (
        <main>
            <Helmet><title>Треки</title></Helmet>
            <div className={classes.mainContent}>
                <Container maxWidth="md">
                    <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
                        Аудиотреки
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        На этой странице вы можете просмотреть все треки, доступные в нашей библиотеке на данный момент
                    </Typography>
                </Container>
            </div>
            <Container maxWidth="md" >
                <Grid container spacing={4}>
                    {data.map((item: obj) => {

                        let trackHref = '/track/' + item.id

                        // production
                        // let imgSrc = item.cover

                        // development
                        let imgSrc = 'http://localhost:8000' + item.cover

                        return (
                            <Grid item key={item.id} xs={12} sm={6} md={4}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={imgSrc}
                                            title={item.title}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" component="h5">
                                                Исполнители: {item.artists_info.map((artist: art) => {
                                                    return (
                                                        <span key={artist.id}>
                                                            <Link to={'/artist/' + artist.id.toString()} key={artist.id}>
                                                                {artist.nickname}
                                                            </Link>&nbsp;
                                                        </span>
                                                    )
                                                })}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Тут будет описание трека
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="medium" color="primary" component={Link} to={trackHref}>
                                            Перейти на страницу трека
                                        </Button>
                                    </CardActions>
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


export default TrackList;