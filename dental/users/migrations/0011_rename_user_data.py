# Generated by Django 5.1.4 on 2024-12-24 06:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_alter_user_fullname'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='Data',
        ),
    ]