from django.db import models
from django.utils import timezone
from user.models import User


class Track(models.Model):
    title = models.CharField(verbose_name='Название трека', max_length=40)
    artists = models.ManyToManyField('Artist', related_name='tracks')
    date_of_release = models.DateField(
        verbose_name='Дата выпуска', default=timezone.now)
    genres = models.ManyToManyField('Genre', related_name='tracks')
    soundtrack = models.FileField(upload_to='tracks/')
    cover = models.ImageField(upload_to='images/tracks_covers')
    description = models.TextField(verbose_name='Описание', default='')

    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name = 'Трек'
        verbose_name_plural = 'Треки'


class FavoriteTracks(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    track = models.ForeignKey(Track, on_delete=models.CASCADE)


class Album(models.Model):
    name = models.CharField(verbose_name='Название альбома', max_length=40)
    artists = models.ManyToManyField('Artist', related_name='albums')
    track = models.ManyToManyField('Track', related_name='album')
    date_of_release = models.DateField(
        verbose_name='Дата выпуска', default=timezone.now)
    description = models.TextField(verbose_name='Описание альбома')
    cover = models.ImageField(upload_to='images/albums_covers')
    TYPE_OF_ALBUM_CHOICES = [
        ('Сингл', 'Сингл'), ('EP', 'EP'), ('Альбом', 'Альбом')]
    type_of_album = models.CharField(verbose_name='Тип альбома', max_length=6, choices=(
        TYPE_OF_ALBUM_CHOICES), default='Альбом')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Альбом'
        verbose_name_plural = 'Альбомы'


class FavoriteAlbums(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)


class Artist(models.Model):
    nickname = models.CharField(
        verbose_name='Псевдоним', max_length=40, blank=True)
    first_name = models.CharField(
        verbose_name='Имя исполнителя', max_length=40)
    last_name = models.CharField(
        verbose_name='Фамилия исполнителя', max_length=40)
    date_of_birth = models.DateField(verbose_name='Дата рождения')
    photo = models.ImageField(upload_to='images/artists_photos')
    about = models.TextField(verbose_name='Об исполнителе', default='')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        verbose_name = 'Артист'
        verbose_name_plural = 'Артисты'


class FavoriteArtists(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)


class Genre(models.Model):
    name = models.CharField(verbose_name='Название плейлиста', max_length=40)
    description = models.TextField(verbose_name='Описание жанра')
    cover = models.ImageField(upload_to='images/genres_covers', blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Жанр'
        verbose_name_plural = 'Жанры'


class FavoriteGenres(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)


class Playlist(models.Model):
    name = models.CharField(verbose_name='Название плейлиста', max_length=40)
    description = models.TextField(verbose_name='Описание плейлиста')
    photo = models.ImageField(upload_to='images/playlists_covers')
    track = models.ManyToManyField('Track', related_name='playlist')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Плейлист'
        verbose_name_plural = 'Плейлист'


class FavoritePlaylists(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
