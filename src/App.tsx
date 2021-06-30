import './App.scss';
import { AppBar, CardMedia, Container, Toolbar, Typography, CardActionArea, Card, CardContent, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


function App() {
    const useStyles = makeStyles((theme) => ({
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
        }
    }))

    function Copyright() {
        return (
            <Typography variant="body2" color="textSecondary">
                {'Non-Copyright(ибо я не юрист) © '}
                Musicality{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    const classes = useStyles();

    return (
        <Container className="App">
            <AppBar position="fixed">
                <Container fixed>
                    <Toolbar className={classes.appbar}>
                        <Typography variant="h4" id='musicality'><strong className={classes.title} ><a href="#target">Musicality Landing</a></strong></Typography>
                        <span id='navLinks'>
                            <Typography variant="h6" className={classes.title}><a href="#target">Цель проекта</a></Typography>
                            <Typography variant="h6" className={classes.title}><a href="#team">Команда</a></Typography>
                            <Typography variant="h6" className={classes.title}><a href="#technologies">Технологии</a></Typography>
                            <Typography variant="h6" className={classes.title}><a href="#project">Проект</a></Typography>
                        </span>
                    </Toolbar>
                </Container>
            </AppBar >

            <div id="target" className={classes.root} >
                <Typography variant="h2">Цель проекта</Typography>
                <Typography id='targetText'>
                    Цель проекта - изучение различных технологий создания веб-сайтов и
                    разработка собственных сайта и мобильного приложения для IOS и Android с применением этих технологий.<br />
                    Проект некоммерческий, торговая марка не зарегистрирована, создатель не получает никакого финансового
                    вознаграждения за прослушивание треков)
                </Typography>
            </div>

            <div id="team" className={classes.root}>
                <Typography variant="h2">Команда проекта</Typography>
                <Card className={classes.teamMember}>
                    <CardMedia
                        className={classes.teamMemberMedia}
                        image='https://avatars.githubusercontent.com/u/56871277?v=4'
                    />
                    <CardContent id="cardContent">
                        <Typography gutterBottom variant="h3" id="person">Александр Тимофеев (Я)</Typography>
                        <Typography gutterBottom variant="h3" id="person" >d1zero</Typography>
                        <Typography variant="body1" id="personInfo">
                            Backend-, Frontend-, Fullstack- Developer, Devops, Верстальщик, Карбюратор,
                            Инжектор, Инспектор, Проректор, Икпорт, Блютуз, Туз, Козырь, Валет, Дама, в общем
                            человек, исполняющий все роли в создании сайта{' '}
                            <a target='_blank' rel='noreferrer' className={classes.specLink} href='http://musicality.std-1578.ist.mospolytech.ru/'>Musicality</a>
                            , студент 1 курса Московского Политеха.
                        </Typography>
                        <div id='links'>
                            <a href='https://github.com/d1zero' target='_blank' rel='noreferrer'><img src="https://image.flaticon.com/icons/png/512/733/733609.png" height='64px' alt='Github' /></a>
                            <a href='https://t.me/d1z3ro' target='_blank' rel='noreferrer'><img src="https://image.flaticon.com/icons/png/512/2111/2111646.png" height='64px' alt='Telegram' /></a>
                            <a href='https://vk.com/d1zero' target='_blank' rel='noreferrer'><img src="https://image.flaticon.com/icons/png/512/145/145813.png" height='64px' alt='VK' /></a>
                        </div>
                    </CardContent>
                </Card >
            </div >

            <div id="technologies" className={classes.root}>
                <Typography variant="h2" >Стек технологий</Typography>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image='https://yt3.ggpht.com/a/AATXAJxsPBScekvkyYpv4irPstUUUj5xDe3JDITzCA=s900-c-k-c0xffffffff-no-rj-mo'
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h3">Django</Typography>
                        <Typography variant="body1" className={classes.techsText}>
                            Python-фреймворк для разработки серверной части сайтов. Отвечает за отобрание данных и CRUD
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={classes.card} >
                    <CardContent>
                        <Typography gutterBottom variant="h3">React</Typography>
                        <Typography variant="body1" className={classes.techsText}>
                            JavaScript библиотека от компании Facebook, предназначенная для создания пользовательских интерфейсов.
                            Отвечает за красивые отрисовку и представление информации, полученной
                            от Django.
                        </Typography>
                    </CardContent>
                    <CardMedia
                        className={classes.media}
                        image='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
                    />
                </Card>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image='https://img.icons8.com/color/480/000000/material-ui.png'
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h3">Material UI</Typography>
                        <Typography variant="body1" className={classes.techsText}>
                            Material Ui - библиотека для React, набор компонентов, который реализует Google Material Design.
                            Используется для стилизации веб-приложения.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography gutterBottom variant="h3">MySQL</Typography>
                        <Typography variant="body1" className={classes.techsText}>
                            MySQL - реляционная СУБД.
                            Отвечает за хранение и представление информации Django по запросу
                        </Typography>
                    </CardContent>
                    <CardMedia
                        className={classes.media}
                        image='https://ploshadka.net/wp-content/uploads/logo/mysql_logo.png'
                    />
                </Card>
            </div>

            <div id="project" className={classes.root}>
                <Typography variant="h2">Проект</Typography>
                <Grid container className={classes.projectCards} >
                    <Grid item xs={12} md={4}>
                        <Card className={classes.projectCard}>
                            <CardActionArea component='a' target='_blank' rel='noreferrer' href='https://github.com/d1zero/django-react-musicality'>
                                <CardMedia
                                    className={classes.projectImage}
                                    image='https://softmap.ru/upload/uf/ad5/ad574c14aa17a899fd3abbf3cbbec62f.png'
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Github
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" >
                                        Ссылка на github репозиторий проекта
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4} >
                        <Card className={classes.projectCard} >
                            <CardActionArea component='a' target='_blank' rel='noreferrer' href='https://www.figma.com/file/bAZBRMnrSK1oAQ2Ax6Sbv1/Musicality?node-id=0%3A1'>
                                <CardMedia
                                    className={classes.projectImage}
                                    image='https://avatars.mds.yandex.net/get-zen_doc/4347026/pub_606f3f6ea09bdc39a402c40b_606f41bfa7757313d8c4f39a/scale_1200'
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Макет в Figma
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" >
                                        Ссылка на макет в фигме
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4} >
                        <Card className={classes.projectCard} >
                            <CardActionArea component='a' target='_blank' rel='noreferrer' href='http://musicality.std-1578.ist.mospolytech.ru/'>
                                <CardMedia
                                    className={classes.projectImage}
                                    image='http://musicality.std-1578.ist.mospolytech.ru/media/images/favicon.ico'
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" >
                                        Рабочая версия
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" >
                                        Ссылка на рабочую версию сайта
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </div>

            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        Made by <a href="https://t.me/d1z3ro" target='_blank' rel='noreferrer' className={classes.specLink} >d1zero</a>
                    </Typography>
                    <Copyright />
                </Container>
            </footer>
        </Container >
    );
}

export default App;
