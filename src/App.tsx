import { useState } from 'react'
import './App.scss';
import {
    AppBar, CardMedia, Container, Toolbar, Typography, CardActionArea, Card, CardContent, Grid, useMediaQuery,
    List, ListItem, ListItemIcon, ListItemText, Drawer, Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from './AppStyles'
import { useTheme } from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';
import CheckIcon from '@material-ui/icons/Check';
import BookIcon from '@material-ui/icons/Book';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';


function App() {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

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

    const list = (anchor: 'top') => (
        <div>
            <List className={classes.menuItems}>
                <a href="#target">
                    <ListItem button onClick={() => setOpen(false)}>
                        <ListItemIcon><CheckIcon /></ListItemIcon>
                        <ListItemText primary={'Цель проекта'} />
                    </ListItem>
                </a>
                <a href="#team">
                    <ListItem button onClick={() => setOpen(false)}>
                        <ListItemIcon><GroupIcon /></ListItemIcon>
                        <ListItemText primary={'Команда'} />
                    </ListItem>
                </a>
                <a href="#technologies">
                    <ListItem button onClick={() => setOpen(false)}>
                        <ListItemIcon><HorizontalSplitIcon /></ListItemIcon>
                        <ListItemText primary={'Технологии'} />
                    </ListItem>
                </a>
                <a href="#project">
                    <ListItem button onClick={() => setOpen(false)}>
                        <ListItemIcon><BookIcon /></ListItemIcon>
                        <ListItemText primary={'Проект'} />
                    </ListItem>
                </a>
            </List>
        </div >
    );

    return (
        <Container className="App">
            <AppBar position="fixed">
                <Container fixed>
                    <Toolbar className={classes.appbar}>
                        <Typography variant="h4" id='musicality'><strong className={classes.title} ><a href="#target">Musicality Landing</a></strong></Typography>
                        <span id='navLinks'>
                            {matches ? (
                                <>
                                    <Button onClick={() => setOpen(true)}>
                                        <MenuIcon style={{ 'color': 'white' }} />
                                    </Button>
                                    <Drawer anchor={'top'} open={open} onClose={() => setOpen(false)}>
                                        {list('top')}
                                    </Drawer>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h6" className={classes.title}><a href="#target">Цель проекта</a></Typography>
                                    <Typography variant="h6" className={classes.title}><a href="#team">Команда</a></Typography>
                                    <Typography variant="h6" className={classes.title}><a href="#technologies">Технологии</a></Typography>
                                    <Typography variant="h6" className={classes.title}><a href="#project">Проект</a></Typography>
                                </>
                            )}

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
                    <Grid item xs={12} md={6} lg={4}>
                        <Card className={classes.projectCard}>
                            <CardActionArea component='a' target='_blank' rel='noreferrer'
                                href='https://github.com/d1zero/django-react-musicality' className={classes.cardArea}>
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
                    <Grid item xs={12} md={6} lg={4} >
                        <Card className={classes.projectCard} >
                            <CardActionArea component='a' target='_blank' rel='noreferrer'
                                href='https://www.figma.com/file/bAZBRMnrSK1oAQ2Ax6Sbv1/Musicality?node-id=0%3A1' className={classes.cardArea}>
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
                    <Grid item xs={12} md={6} lg={4}>
                        <Card className={classes.projectCard} >
                            <CardActionArea component='a' target='_blank' rel='noreferrer'
                                href='http://musicality.std-1578.ist.mospolytech.ru/' className={classes.cardArea}>
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
