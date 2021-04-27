# Generated by Django 3.2 on 2021-04-25 14:12

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20210425_1351'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='album',
            options={'verbose_name': 'Альбом', 'verbose_name_plural': 'Альбомы'},
        ),
        migrations.AlterModelOptions(
            name='artist',
            options={'verbose_name': 'Артист', 'verbose_name_plural': 'Артисты'},
        ),
        migrations.AlterModelOptions(
            name='genre',
            options={'verbose_name': 'Жанр', 'verbose_name_plural': 'Жанры'},
        ),
        migrations.AlterModelOptions(
            name='playlist',
            options={'verbose_name': 'Плейлист', 'verbose_name_plural': 'Плейлист'},
        ),
        migrations.AlterModelOptions(
            name='track',
            options={'verbose_name': 'Трек', 'verbose_name_plural': 'Треки'},
        ),
        migrations.AlterField(
            model_name='album',
            name='date_of_release',
            field=models.DateField(default=django.utils.timezone.now, verbose_name='Дата выпуска'),
        ),
        migrations.AlterField(
            model_name='track',
            name='cover',
            field=models.ImageField(upload_to='images/tracks_covers'),
        ),
        migrations.AlterField(
            model_name='track',
            name='date_of_release',
            field=models.DateField(default=django.utils.timezone.now, verbose_name='Дата выпуска'),
        ),
    ]
