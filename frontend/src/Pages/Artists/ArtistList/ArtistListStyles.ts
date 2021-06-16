import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    mainContent: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(6),
        paddingBottom: theme.spacing(3)
    },
    media: {
        paddingTop: "75%",
    },
    card: {
        borderRadius: '10px',
        boxShadow: '0 1px 2px rgba(0,0,0,.15)',
        transition: 'box-shadow 10s ease-in-out:',
        '&:hover': {
            transition: 'box-shadow 10s ease-in-out:',
            boxShadow: '7px 6px 8px 0px rgba(0, 0, 0, 0.3)',
        }
    },
    loader: {
        marginTop: '100px',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 60%)',
        minHeight: '110px',
        maxHeight: '110px',
    },
    paddingBottom: {
        marginBottom: '2000px'
    },
}))