import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CardActions, CardMedia, CardActionArea, CardContent, Typography, Button } from '@material-ui/core';
import { Container } from '@material-ui/core';


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
    const [artists, setArtists]: any[] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await axios(
                `http://localhost:8000/api/tracks`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )

            await setData(response1.data)



            for (let i = 0; i < response1.data.length; i++) {
                response1.data[i].artists_ids = []
            }

        }
        fetchData()




        const fetchData2 = async () => {
            const response2 = await axios(
                'http://localhost:8000/api/artists', {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            )

            await setArtists(response2.data)
        }
        fetchData2()

    }, [])

    interface obj {
        id: number,
        title: string,
        artists: any[],
        cover: string,
        artists_ids: number[]
    }

    const classes = useStyles();


    return (
        <main>
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
                        item.artists_ids = item.artists

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
                                                Исполнители: {item.artists_ids.map((id: number) => {
                                                    return (
                                                        <>
                                                            <Link to={'/artists/' + id.toString()} key={id}>
                                                                {'' + artists[id - 1].nickname + ''}
                                                            </Link>&nbsp;
                                                        </>
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