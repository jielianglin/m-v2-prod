from django.db import models
from django.utils import timezone
from django.db.models.fields import UUIDField
from django.contrib.postgres.functions import RandomUUID

import base64
from io import BytesIO


def upload_path(instance, filename):
    return '/'.join(['images', str(instance.image), str(instance.tags), instance.date_created, filename, filename])


class Theme(models.Model):
    name = models.CharField(max_length=100)

    def __st__(self):
        return self.name


class Tags(models.Model):
    tag = models.CharField(max_length=30, unique=True, default=None)


class Vectors(models.Model):
    vector = models.ImageField(
        upload_to=upload_path, blank=True, null=True, default=None)
    id = UUIDField(primary_key=True, default=RandomUUID, editable=False)


class Images(models.Model):
    theme = models.ForeignKey(Theme, on_delete=models.PROTECT, default=None)
    image = models.ImageField(upload_to=upload_path,
                              blank=True, null=True, default=None)
    thumbnail = models.CharField(max_length=2000, blank=True, null=True)
    vector = models.ForeignKey(Vectors, on_delete=models.CASCADE)
    caption = models.TextField(null=True)
    date_created = models.DateTimeField(default=timezone.now)
    contributor = models.ForeignKey(
        'accounts.User', related_name='contributor', on_delete=models.CASCADE, default='0')
    tags = models.ManyToManyField(Tags)
    id = UUIDField(primary_key=True, default=RandomUUID, editable=False)

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if not self.image:
            self.thumbnail = None
        else:
            thumbnail_size = 120, 120
            data_img = BytesIO()
            tiny_img = Images.open(self.image)
            tiny_img.thumbnail(thumbnail_size)
            tiny_img.save(data_img, format="BMP")
            tiny_img.close()
            try:
                self.thumbnail = "data:image/jpg;base64,{}".format(
                    base64.b64encode(data_img.getvalue()).decode("utf-8")
                )
            except UnicodeDecodeError:
                self.blurred_image = None

        super(Images, self).save(force_insert,
                                 force_update, using, update_fields)

# Are UUID necessary for Images and Vectors to return a view images? Because as I understand Django generates its own ID automatically.
# Are __str__ necessary in any of the models to in case of needing to return its instance?
