from django.urls import path
from .views.tracks_views import TrackList, TrackDetail, AddTrackToFavorites, FavoriteTracksView, FavoriteTracksDetailView, \
    TrackSearchAPIView
from .views.artists_views import ArtistList, ArtistDetail, AddArtistToFavorites, FavoriteArtistsView, FavoriteArtistsDetailView, \
    ArtistSearchAPIView
from .views.albums_views import AlbumList, AlbumDetail, AddAlbumToFavorites, FavoriteAlbumsView, FavoriteAlbumsDetailView, \
    AlbumSearchAPIView
from .views.genres_views import GenreList, GenreDetail, AddGenreToFavorites, FavoriteGenresView, FavoriteGenresDetailView, \
    GenreSearchAPIView
from .views.playlists_views import PlaylistList, PlaylistDetail, AddPlaylistToFavorites, FavoritePlaylistsView, \
    FavoritePlaylistsDetailView, PlaylistSearchAPIView
from .views.index_views import AppSearchAPIView

urlpatterns = [
    path('tracks/', TrackList.as_view()),
    path('tracks/<int:pk>', TrackDetail.as_view()),
    path('get-favorite-tracks/<int:pk>', FavoriteTracksDetailView.as_view()),
    path('get-favorite-tracks/', FavoriteTracksView.as_view()),
    path('add-track-to-favorite/<int:pk>', AddTrackToFavorites.as_view()),
    path('tracks-search/', TrackSearchAPIView.as_view()),

    path('artists/', ArtistList.as_view()),
    path('artists/<int:pk>', ArtistDetail.as_view()),
    path('get-favorite-artists/<int:pk>', FavoriteArtistsDetailView.as_view()),
    path('get-favorite-artists/', FavoriteArtistsView.as_view()),
    path('add-artist-to-favorite/<int:pk>', AddArtistToFavorites.as_view()),
    path('artists-search/', ArtistSearchAPIView.as_view()),

    path('albums/', AlbumList.as_view()),
    path('albums/<int:pk>', AlbumDetail.as_view()),
    path('get-favorite-albums/<int:pk>', FavoriteAlbumsDetailView.as_view()),
    path('get-favorite-albums/', FavoriteAlbumsView.as_view()),
    path('add-album-to-favorite/<int:pk>', AddAlbumToFavorites.as_view()),
    path('albums-search/', AlbumSearchAPIView.as_view()),

    path('genres/', GenreList.as_view()),
    path('genres/<int:pk>', GenreDetail.as_view()),
    path('get-favorite-genres/<int:pk>', FavoriteGenresDetailView.as_view()),
    path('get-favorite-genres/', FavoriteGenresView.as_view()),
    path('add-genre-to-favorite/<int:pk>', AddGenreToFavorites.as_view()),
    path('genres-search/', GenreSearchAPIView.as_view()),

    path('playlists/', PlaylistList.as_view()),
    path('playlists/<int:pk>', PlaylistDetail.as_view()),
    path('get-favorite-playlists/<int:pk>', FavoritePlaylistsDetailView.as_view()),
    path('get-favorite-playlists/', FavoritePlaylistsView.as_view()),
    path('add-playlist-to-favorite/<int:pk>', AddPlaylistToFavorites.as_view()),
    path('playlists-search/', PlaylistSearchAPIView.as_view()),

    path('full-search/', AppSearchAPIView.as_view())
]
