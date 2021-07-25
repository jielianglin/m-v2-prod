<<<<<<< HEAD
from django.contrib import admin
from django.urls import path, include
from django_filters.views import FilterView
from .views import home

from accounts.views import login_view, register_view, logout_view
from rest_framework import routers
from upload import views
from upload.models import Images

from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'upload', views.ImagesViewSet, 'upload')
=======
"""database URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.urls import path
from .views import home
from accounts.views import login_view, register_view

>>>>>>> 8dd004ffcbde8691d0914c23e803764fcefd1a53

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),
    path('accounts/login/', login_view),
<<<<<<< HEAD
    path('accounts/register/', register_view),
    path('accounts/logout/', logout_view),
    path('api/', include(router.urls)),
    path('list', FilterView.as_view(model=Images), name="images-list")

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
=======
    path('accounts/register/,', register_view)
]
>>>>>>> 8dd004ffcbde8691d0914c23e803764fcefd1a53
