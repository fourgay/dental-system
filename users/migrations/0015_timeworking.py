# Generated by Django 5.1.4 on 2025-02-11 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0014_booking_doctor_phone_booking_createdat_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='TimeWorking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('value', models.CharField(max_length=255)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
