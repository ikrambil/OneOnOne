# Generated by Django 4.2 on 2024-03-12 18:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendars', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='calendar',
            name='availability',
            field=models.TextField(default='[]'),
        ),
        migrations.AddField(
            model_name='invitation',
            name='availability',
            field=models.TextField(default='[]'),
        ),
        migrations.DeleteModel(
            name='Availability',
        ),
    ]
