import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet'
import { Container, Card, Grid, CardMedia, CardActionArea, CardContent, Typography, CircularProgress } from '@material-ui/core';
import { useStyles } from './PlaylistListStyles';

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



const PlaylistList = () => {
    const [data, setData]: any[] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoader(true)

            let link = ''
            // Production
            link = 'http://musicality.std-1578.ist.mospolytech.ru/api/playlists/'
            // Development
            // link = 'http://localhost:8000/api/playlists/'

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

    interface pla {
        id: number,
        name: string,
        description: string,
        photo: string,
    }

    const classes = useStyles()

    return (
        <div>
            <Helmet><title>Плейлисты</title></Helmet>
            {loader
                ? <CircularProgress className={classes.loader} />
                :
                <>
                    <div className={classes.mainContent}>
                        <Container maxWidth="md">
                            <ThemeProvider theme={theme}>
                                <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
                                    Плейлисты
                                </Typography>
                            </ThemeProvider>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                На этой странице вы можете просмотреть все жанры, составленные нами на данный момент
                            </Typography>
                        </Container>
                    </div>
                    <Container maxWidth="md" >
                        <Grid container spacing={4}>
                            {data.map((playlist: pla) => {
                                let imgSrc = ''

                                // Production
                                imgSrc = playlist.photo
                                // Development
                                // imgSrc = 'http://localhost:8000' + playlist.photo

                                return (
                                    <Grid item key={playlist.id} xs={12} sm={6} md={4} component={Link} to={'/playlist/' + playlist.id} style={{ textDecoration: 'none' }}>
                                        <Card className={classes.card}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={imgSrc}
                                                    title={playlist.name}
                                                />
                                                <CardContent className={classes.titleBar}>
                                                    <Typography gutterBottom variant="h5" component="h2" style={{ minHeight: '64px', maxHeight: '64px' }}>
                                                        {playlist.name}
                                                    </Typography>

                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {playlist.description}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Container>
                </>
            }
        </div >
    )
}

export default PlaylistList