# Generated by Django 3.2 on 2021-05-23 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_alter_user_last_login'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='confirmed',
            field=models.BooleanField(default=False, verbose_name='Активированный аккаунт'),
        ),
    ]
