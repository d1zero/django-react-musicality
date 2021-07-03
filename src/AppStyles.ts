import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    appbar: {
        minHeight: '64px',
        '& #musicality': {
            minWidth: '50%',
        },
        '& #navLinks': {
            marginLeft: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            minWidth: '50%'
        },
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
    root: {
        marginTop: '10%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& #targetText': {
            maxWidth: '75%', textAlign: 'center'
        },
    },
    media: {
        height: '290px',
        width: '290px',
        objectFit: 'cover',
    },
    card: {
        width: '75%',
        minHeight: '270px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 100px',
        margin: '30px 0',
    },
    teamMember: {
        width: '75%',
        boxShadow: 'none',
        minHeight: '270px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 100px',
        margin: '30px 0',
        '& #cardContent': {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
        },
        '& #person': {
            margin: '0 auto',
        },
        '& #personInfo': {
            maxWidth: '500px',
            margin: '0 auto',
        },
        '& #links': {
            display: 'flex',
            justifyContent: 'space-evenly',
            marginTop: '10px',
        },
    },
    teamMemberMedia: {
        borderRadius: '145px',
        height: '290px',
        width: '290px',
    },
    projectCards: {
        maxWidth: '95%',
        display: 'flex',
        flexDirection: 'row',
    },
    projectCard: {
        margin: '50px 20px 0 20px',
        borderRadius: '30px'
    },
    projectImage: {
        width: '350px',
        height: '350px',
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: theme.spacing(30),
    },
    specLink: {
        color: '#f44336'
    },
    techsText: {
        maxWidth: '300px'
    },
    menuItems: {
        '& a': {
            color: 'black',
        },
    },
    cardArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))