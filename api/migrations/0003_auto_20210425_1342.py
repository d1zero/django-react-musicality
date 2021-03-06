# Generated by Django 3.2 on 2021-04-25 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_artist_nickname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='track',
            name='album',
        ),
        migrations.RemoveField(
            model_name='track',
            name='date_of_release',
        ),
        migrations.AddField(
            model_name='album',
            name='track',
            field=models.ManyToManyField(related_name='album', to='api.Track'),
        ),
    ]
