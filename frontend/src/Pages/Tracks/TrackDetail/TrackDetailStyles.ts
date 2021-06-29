import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    trackInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        paddingTop: theme.spacing(3),
    },
    trackImageDiv: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    trackImage: {
        objectFit: 'cover',
        height: theme.spacing(44),
        width: theme.spacing(44),
    },
    container: {
        marginTop: theme.spacing(8),
        justifyContent: 'center',
    },
    volume: {
        display: 'flex',
        width: 200,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
    },
    playIcon: {
        display: 'flex',
        alignItems: 'flex-start',
        height: 38,
        width: 38,
        paddingLeft: 0,
    },
    root: {
        display: 'flex',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingLeft: 0,
        borderRadius: theme.spacing(3)
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        paddingBottom: '0'
    },
    controlsDiv: {
        justifyContent: 'center',
        paddingBottom: '0',
    }
}))