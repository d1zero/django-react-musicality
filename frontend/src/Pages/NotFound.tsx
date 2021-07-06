import { Grid, Container, Typography } from "@material-ui/core"
import { Helmet } from 'react-helmet'
import { listPageStyles } from "./styles";
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme();
theme.typography.h1 = {
    fontSize: '5rem',
    '@media (min-width:600px)': {
        fontSize: '5rem',
    },
    [theme.breakpoints.down('xs')]: {
        fontSize: '2rem',
    },
};

const useStyles = makeStyles((theme) => ({
    marginBottom: {
        marginBottom: '50%'
    }
}))

const NotFound = () => {
    const classes = listPageStyles();
    const classMB = useStyles();
    return (
        <main className={classMB.marginBottom}>
            <Helmet><title>Страница не найдена</title></Helmet>
            <Grid className={classes.mainContent} >
                <Container maxWidth="md">
                    <ThemeProvider theme={theme}>
                        <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
                            Страница не найдена
                        </Typography>
                    </ThemeProvider>
                </Container>
            </Grid>
        </main >

    )
}

export default NotFound
