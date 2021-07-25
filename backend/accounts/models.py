<<<<<<< HEAD
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):
    username = models.CharField(max_length=15, unique=True, default=None)
    email = models.EmailField(_('email address'), unique=True)
    date_created = models.DateTimeField(
        auto_now_add=True, null=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username
=======
from django.db import models

# Create your models here.
>>>>>>> 8dd004ffcbde8691d0914c23e803764fcefd1a53
