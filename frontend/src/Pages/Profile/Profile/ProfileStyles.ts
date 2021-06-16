import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    loader: {
        marginTop: '100px',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    edit: {
        color: theme.palette.primary.main,
        '&:hover': {
            color: '#2196f3',
        }
    },
    dialog: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(2),
    },
    media: {
        height: theme.spacing(25),
        width: theme.spacing(25),
        objectFit: 'cover',
    },
    card: {
        borderRadius: '10px',
        maxWidth: theme.spacing(25),
        maxHeight: theme.spacing(25),
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 100%)',
        position: 'absolute',
        width: 'inherit',
        color: 'white',
        textShadow: '1px 1px 1px #000',
        transition: '.3s',
        opacity: '0',
        bottom: '-50px',
    },
    gridItem: {
        textDecoration: 'none',
    },
    nested: {
        paddingLeft: theme.spacing(4),
        minWidth: '300px',

    },
}));