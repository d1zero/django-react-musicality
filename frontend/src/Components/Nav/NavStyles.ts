import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    appbar: {
        minHeight: '64px',
    },
    menuButton: {
        marginRight: theme.spacing(1)
    },
    title: {
        color: 'white',
        textDecoration: 'none',
        cursor: 'pointer',
        lineHeight: 1,
        flexGrow: 1,
        "&:hover": {
            color: '#f44336',
        },
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    buttons: {
        borderRadius: '8px'
    },
}))