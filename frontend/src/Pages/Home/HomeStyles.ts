import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
({
    root: {
        paddingTop: '100px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    item: {
        margin: '0 70px 70px 70px',
        minWidth: '288px',
    },
    loader: {
        marginTop: '100px',
        display: 'flex',
        alignItems: 'center',
    },
    gridList: {
        paddingTop: '20px',
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        overflowX: 'scroll',
    },
    title: {
        color: 'white',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    carousel: {
        borderRadius: '10px',
        boxShadow: '0 1px 2px rgba(0,0,0,.15)',
        transition: 'box-shadow .3s ease-in-out',
        '&:hover': {
            transition: 'box-shadow .3s ease-in-out',
            boxShadow: '7px 6px 8px 0px rgba(0, 0, 0, 0.3)',
        }
    },
    carouselItem: {
        display: 'grid',
        gridTemplateAreas: `'image text text''image text text'`,
        gridTemplateColumns: '300px 400px',
    },
    carouselItemAdapt: {
        display: 'grid',
        gridTemplateAreas: `'image''image'`,
        gridTemplateColumns: '300px 0px',
    },
    image: {
        gridArea: 'image',
        minWidth: '300px',
        maxWidth: '300px',
        minHeight: '300px',
        maxHeight: "300px",
        objectFit: 'cover',
    },
    typography: {
        display: 'grid',
        alignItems: 'center',
        paddingLeft: '10px',
        gridArea: 'text',
        maxWidth: '400px',
        textDecoration: 'none',
        color: 'black',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(5),
    },
}),
);