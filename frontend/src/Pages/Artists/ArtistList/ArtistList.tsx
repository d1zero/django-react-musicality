import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet'
import { Container, Card, Grid, CardMedia, CardActionArea, CardContent, Typography, CircularProgress, TextField } from '@material-ui/core';
import { listPageStyles } from '../../styles';
import { searchDataFetch } from '../../searchDataFetch'
import { ListDataFetch } from '../../ListDataFetch'

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
    last_name: string,
    photo: string,
    about: string,
}


const ArtistList = () => {
    const [data, setData]: any = useState([])
    const [loader, setLoader] = useState(false)
    const [searchData, setSearchData]: any = useState()

    useEffect(() => {
        ListDataFetch(setData, setLoader, 'artists')
    }, [])

    const classes = listPageStyles()


    return (
        <div>
            <Helmet><title>Исполнители</title></Helmet>
            {loader
                ? <CircularProgress className={classes.loader} />
                :
                <>
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
                        <Grid container className={classes.search}>
                            <span>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Поиск исполнителей"
                                    onChange={(e: any) => {
                                        let val = e.target.value
                                        searchDataFetch(setSearchData, 'artists', val)
                                    }}
                                />
                            </span>
                        </Grid>
                        <Grid container spacing={4}>
                            {(typeof (searchData) !== 'undefined' && searchData.length > 0)
                                ?
                                (searchData[0].id !== 0)
                                    ? searchData.map((artist: art) => {
                                        let imgSrc = ''
                                        // Production
                                        imgSrc = artist.photo
                                        // Development
                                        // imgSrc = 'http://localhost:8000' + artist.photo

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
                                    }) :
                                    <Grid item xs={12} style={{ 'textAlign': 'center' }}>
                                        <h3>Ничего не найдено</h3>
                                    </Grid>
                                :
                                data.map((artist: art) => {
                                    let imgSrc = ''
                                    // Production
                                    imgSrc = artist.photo
                                    // Development
                                    // imgSrc = 'http://localhost:8000' + artist.photo

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
                </>
            }
        </div>
    )
}

export default ArtistList