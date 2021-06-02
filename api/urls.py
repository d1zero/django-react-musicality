from django.urls import path
from .views.tracks_views import TrackList, TrackDetail, AddTrackToFavorites, FavoriteTracksView, FavoriteTracksDetailView
from .views.artists_views import ArtistList, ArtistDetail, AddArtistToFavorites, FavoriteArtistsView, FavoriteArtistsDetailView
from .views.albums_views import AlbumList, AlbumDetail, AddAlbumToFavorites, FavoriteAlbumsView, FavoriteAlbumsDetailView
from .views.genres_views import GenreList, GenreDetail, AddGenreToFavorites, FavoriteGenresView, FavoriteGenresDetailView
from .views.playlists_views import PlaylistList, PlaylistDetail, AddPlaylistToFavorites, FavoritePlaylistsView, FavoritePlaylistsDetailView

urlpatterns = [
    path('tracks/', TrackList.as_view()),
    path('track/<int:pk>', TrackDetail.as_view()),
    path('get-favorite-tracks/<int:pk>', FavoriteTracksDetailView.as_view()),
    path('get-favorite-tracks/', FavoriteTracksView.as_view()),
    path('add-track-to-favorite/<int:pk>', AddTrackToFavorites.as_view()),

    path('artists/', ArtistList.as_view()),
    path('artists/<int:pk>', ArtistDetail.as_view()),
    path('get-favorite-artists/<int:pk>', FavoriteArtistsDetailView.as_view()),
    path('get-favorite-artists/', FavoriteArtistsView.as_view()),
    path('add-artist-to-favorite/<int:pk>', AddArtistToFavorites.as_view()),

    path('albums/', AlbumList.as_view()),
    path('albums/<int:pk>', AlbumDetail.as_view()),
    path('get-favorite-albums/<int:pk>', FavoriteAlbumsDetailView.as_view()),
    path('get-favorite-albums/', FavoriteAlbumsView.as_view()),
    path('add-album-to-favorite/<int:pk>', AddAlbumToFavorites.as_view()),

    path('genres/', GenreList.as_view()),
    path('genres/<int:pk>', GenreDetail.as_view()),
    path('get-favorite-genres/<int:pk>', FavoriteGenresDetailView.as_view()),
    path('get-favorite-genres/', FavoriteGenresView.as_view()),
    path('add-genre-to-favorite/<int:pk>', AddGenreToFavorites.as_view()),

    path('playlists/', PlaylistList.as_view()),
    path('playlists/<int:pk>', PlaylistDetail.as_view()),
    path('get-favorite-playlists/<int:pk>', FavoritePlaylistsDetailView.as_view()),
    path('get-favorite-playlists/', FavoritePlaylistsView.as_view()),
    path('add-playlist-to-favorite/<int:pk>', AddPlaylistToFavorites.as_view()),

]
