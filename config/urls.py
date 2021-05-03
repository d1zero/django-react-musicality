"""config URL Configuration

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
# from django.contrib import admin
from baton.autodiscover import admin
from django.urls import path, include
from api.views import index, index_pk
from django.conf.urls.static import static
from django.conf import settings
from django.conf.urls import url
from django.views.static import serve

urlpatterns = [
    url(r'^media/(?P<path>.*)$', serve,
        {'document_root': settings.MEDIA_ROOT}),
    url(r'^static/(?P<path>.*)$', serve,
        {'document_root': settings.STATIC_ROOT}),

    path('admin/', admin.site.urls),
    path('baton/', include('baton.urls')),

    path('', index),
    path('login/', index),
    path('register/', index),
    path('profile/', index),

    path('tracks/', index),
    path('track/<int:pk>', index_pk),

    path('genres/', index),
    path('genre/<int:pk>', index_pk),

    path('playlists/', index),
    path('playlist/<int:pk>', index_pk),

    path('albums/', index),
    path('album/<int:pk>', index_pk),

    path('artists/', index),
    path('artist/<int:pk>', index_pk),

    path('user/', include('user.urls')),
    path('api/', include('api.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
