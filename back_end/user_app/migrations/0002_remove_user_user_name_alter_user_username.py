# Generated by Django 5.0 on 2023-12-29 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='user_name',
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=25, unique=True),
        ),
    ]
