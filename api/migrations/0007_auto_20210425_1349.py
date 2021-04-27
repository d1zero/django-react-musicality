# Generated by Django 3.2 on 2021-04-25 10:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_track_date_of_release'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='date_of_release',
            field=models.DateField(default=datetime.datetime(2021, 4, 25, 13, 49, 9, 514117), verbose_name='Дата выпуска'),
        ),
        migrations.AlterField(
            model_name='track',
            name='date_of_release',
            field=models.DateField(default=datetime.datetime(2021, 4, 25, 13, 49, 9, 513133), verbose_name='Дата выпуска'),
        ),
    ]
