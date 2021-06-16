import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    artistImageSpan: {
        display: 'grid',
        justifyContent: 'center'
    },
    artistImage: {
        width: '300px',
        height: '300px',
        objectFit: 'cover',
        marginBottom: theme.spacing(3)
    },
    about: {
        marginBottom: theme.spacing(5)
    },
    media: {
        height: theme.spacing(25),
        width: theme.spacing(25),
        object: 'fit',
    },
    card: {
        borderRadius: '10px',
        maxWidth: theme.spacing(25),
        maxHeight: theme.spacing(25),
        margin: theme.spacing(1),
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
}))