import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container, Card, Grid, CardMedia, CardActionArea, CardContent, Typography, CircularProgress, TextField } from '@material-ui/core';
import { Helmet } from 'react-helmet'
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

const TrackList = () => {
    const [loader, setLoader] = useState(false)
    const [data, setData]: any[] = useState([])
    const [searchData, setSearchData]: any = useState()

    useEffect(() => {
        ListDataFetch(setData, setLoader, 'tracks')
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

    const classes = listPageStyles();

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
                    <Container maxWidth="md">
                        <Grid container className={classes.search}>
                            <span>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Поиск треков"
                                    onChange={(e: any) => {
                                        let val = e.target.value
                                        searchDataFetch(setSearchData, 'tracks', val)
                                    }}
                                />
                            </span>
                        </Grid>
                        <Grid container spacing={4}>
                            {(typeof (searchData) !== 'undefined' && searchData.length > 0)
                                ?
                                (searchData[0].id !== 0)
                                    ?
                                    searchData.map((item: obj) => {
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

                                        var iter = 0

                                        return (
                                            <Grid item key={item.id} xs={12} sm={6} md={4} component={Link} to={'/track/' + item.id} style={{ textDecoration: 'none' }}>
                                                <Card className={classes.card} >
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
                                                                <Typography variant="subtitle1" >
                                                                    Исполнители: {item.artists_info.map((artist: art) => {
                                                                        iter += 1
                                                                        return (
                                                                            <span key={artist.id} >
                                                                                {artist.nickname}
                                                                                {(item.artists_info.length > 1 && iter !== item.artists_info.length) ? ', ' : ''}
                                                                            </span>
                                                                        )
                                                                    })}
                                                                </Typography>
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
                                    :
                                    <Grid item xs={12} style={{ 'textAlign': 'center' }}>
                                        <h3>Ничего не найдено</h3>
                                    </Grid>
                                :
                                data.map((item: obj) => {
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

                                    var iter = 0

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
                                                            <Typography variant="subtitle1" >
                                                                Исполнители: {item.artists_info.map((artist: art) => {
                                                                    iter += 1
                                                                    return (
                                                                        <span key={artist.id} >
                                                                            {artist.nickname}
                                                                            {(item.artists_info.length > 1 && iter !== item.artists_info.length) ? ', ' : ''}
                                                                        </span>
                                                                    )
                                                                })}
                                                            </Typography>
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