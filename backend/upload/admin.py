from django.contrib import admin
from . import models


@ admin.register(models.Images)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('theme', 'id', 'status', 'contributor')


admin.site.register(models.Tags)
admin.site.register(models.Theme)
admin.site.register(models.Vectors)
