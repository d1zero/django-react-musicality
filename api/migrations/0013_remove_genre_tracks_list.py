# Generated by Django 3.2 on 2021-05-01 21:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_rename_genres_genre_tracks_list'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='genre',
            name='tracks_list',
        ),
    ]
