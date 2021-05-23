from baton.autodiscover import admin
from django.urls import path, include
from api.views import index, index_pk, index_code
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
    path('confirm-register/<str:code>', index_code),
    path('profile/', index),
    path('confirm-reset-password/<str:code>', index_code),

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
