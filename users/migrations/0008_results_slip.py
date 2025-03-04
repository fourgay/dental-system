# Generated by Django 5.1.4 on 2025-02-06 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_alter_booking_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Results_Slip',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('account', models.CharField(max_length=255)),
                ('date', models.CharField(max_length=255)),
                ('time', models.TimeField()),
                ('title', models.CharField(max_length=255)),
                ('decriptions', models.TextField(max_length=255)),
                ('service', models.TextField(max_length=255)),
                ('fullname', models.CharField(max_length=255)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
