# Generated by Django 5.1.4 on 2025-02-10 10:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_alter_result_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='result',
            name='Doctor_phone',
            field=models.CharField(default='Unknown Phone', max_length=255),
        ),
    ]
