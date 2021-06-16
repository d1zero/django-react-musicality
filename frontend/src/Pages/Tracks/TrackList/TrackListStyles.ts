import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    mainContent: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(6),
        paddingBottom: theme.spacing(3)
    },
    loader: {
        marginTop: '100px',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    media: {
        paddingTop: "75%",
    },
    card: {
        borderRadius: '10px',
        boxShadow: '0 1px 2px rgba(0,0,0,.15)',
        transition: 'box-shadow .3s ease-in-out',
        '&:hover': {
            transition: 'box-shadow .3s ease-in-out',
            boxShadow: '7px 6px 8px 0px rgba(0, 0, 0, 0.3)',
        }
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 60%)',
        minHeight: '200px',
        maxHeight: '200px',
    },
}))