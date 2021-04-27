from django.urls import path
from .views import TrackList, TrackDetail, AlbumList, AlbumDetail, GenreList, GenreDetail, PlaylistList, PlaylistDetail, \
    ArtistList, ArtistDetail

urlpatterns = [
    path('tracks/', TrackList.as_view()),
    path('tracks/<int:pk>', TrackDetail.as_view()),

    path('artists/', ArtistList.as_view()),
    path('artists/<int:pk>', ArtistDetail.as_view()),

    path('albums/', AlbumList.as_view()),
    path('albums/<int:pk>', AlbumDetail.as_view()),

    path('genres/', GenreList.as_view()),
    path('genres/<int:pk>', GenreDetail.as_view()),

    path('playlists/', PlaylistList.as_view()),
    path('playlists/<int:pk>', PlaylistDetail.as_view()),
]
