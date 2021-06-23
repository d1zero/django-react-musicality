import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
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


const GenreList = () => {
    const [data, setData]: any[] = useState([])
    const [loader, setLoader] = useState(false)
    const [searchData, setSearchData]: any = useState()

    useEffect(() => {
        ListDataFetch(setData, setLoader, 'genres')
    }, [])

    interface obj {
        id: number,
        name: string,
        description: string,
        cover: string,
    }

    const classes = listPageStyles()

    return (
        <main>
            <Helmet><title>Жанры</title></Helmet>
            {loader
                ? <CircularProgress className={classes.loader} />
                :
                <>
                    <div className={classes.mainContent}>
                        <Container maxWidth="md">
                            <ThemeProvider theme={theme}>
                                <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
                                    Жанры
                                </Typography>
                            </ThemeProvider>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                На этой странице вы можете просмотреть все жанры, доступные в нашей библиотеке на данный момент
                            </Typography>
                        </Container>
                    </div>
                    <Container maxWidth="md" >
                        <Grid container className={classes.search}>
                            <span>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Поиск жанров"
                                    onChange={(e: any) => {
                                        let val = e.target.value
                                        searchDataFetch(setSearchData, 'genres', val)
                                    }}
                                />
                            </span>
                        </Grid>
                        <Grid container spacing={4}>
                            {(typeof (searchData) !== 'undefined' && searchData.length > 0)
                                ?
                                (searchData[0].id !== 0)
                                    ? searchData.map((genre: obj) => {
                                        let imgSrc = ''
                                        // Production
                                        imgSrc = genre.cover
                                        // Development
                                        // imgSrc = 'http://localhost:8000' + genre.cover

                                        return (
                                            <Grid item key={genre.id} xs={12} sm={6} md={4} component={Link} to={'/genre/' + genre.id} style={{ textDecoration: 'none' }}>
                                                <Card className={classes.card}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            className={classes.media}
                                                            image={imgSrc}
                                                            title={genre.name}
                                                        />
                                                        <CardContent className={classes.titleBar}>
                                                            <Typography gutterBottom variant="h5" component="h2" style={{ minHeight: '64px', maxHeight: '64px' }}>
                                                                {genre.name}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                {genre.description}
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
                                data.map((genre: obj) => {
                                    let imgSrc = ''
                                    // Production
                                    imgSrc = genre.cover
                                    // Development
                                    // imgSrc = 'http://localhost:8000' + genre.cover

                                    return (
                                        <Grid item key={genre.id} xs={12} sm={6} md={4} component={Link} to={'/genre/' + genre.id} style={{ textDecoration: 'none' }}>
                                            <Card className={classes.card}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={imgSrc}
                                                        title={genre.name}
                                                    />
                                                    <CardContent className={classes.titleBar}>
                                                        <Typography gutterBottom variant="h5" component="h2" style={{ minHeight: '64px', maxHeight: '64px' }}>
                                                            {genre.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {genre.description}
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
        </main>
    )
}

export default GenreList;