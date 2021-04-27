from django.db import models
from django.utils import timezone
import datetime


class Track(models.Model):
    title = models.CharField(verbose_name='Название трека', max_length=40)
    artists = models.ManyToManyField('Artist', related_name='tracks')
    date_of_release = models.DateField(verbose_name='Дата выпуска', default=timezone.now)
    genres = models.ManyToManyField('Genre', related_name='tracks')
    soundtrack = models.FileField(upload_to='tracks/')
    cover = models.ImageField(upload_to='images/tracks_covers')

    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name = 'Трек'
        verbose_name_plural = 'Треки'


class Album(models.Model):
    name = models.CharField(verbose_name='Название альбома', max_length=40)
    artists = models.ManyToManyField('Artist', related_name='albums')
    track = models.ManyToManyField('Track', related_name='album')
    date_of_release = models.DateField(verbose_name='Дата выпуска', default=timezone.now)
    description = models.TextField(verbose_name='Описание альбома')
    cover = models.ImageField(upload_to='images/albums_covers')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Альбом'
        verbose_name_plural = 'Альбомы'


class Artist(models.Model):
    nickname = models.CharField(verbose_name='Псевдоним', max_length=40, blank=True)
    first_name = models.CharField(verbose_name='Имя исполнителя', max_length=40)
    last_name=  models.CharField(verbose_name='Фамилия исполнителя', max_length=40)
    date_of_birth = models.DateField(verbose_name='Дата рождения')
    photo = models.ImageField(upload_to='images/artists_photos')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        verbose_name = 'Артист'
        verbose_name_plural = 'Артисты'


class Genre(models.Model):
    name = models.CharField(verbose_name='Название плейлиста', max_length=40)
    description = models.TextField(verbose_name='Описание жанра')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Жанр'
        verbose_name_plural = 'Жанры'


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
