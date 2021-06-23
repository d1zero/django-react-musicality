from django.shortcuts import render
from rest_framework.views import APIView
from ..models import Artist, Album, Genre, Playlist, Track
from ..serializers.albums_serializers import AlbumSerializer
from ..serializers.artists_serializers import ArtistSerializer
from ..serializers.genres_serializers import GenreSerializer
from ..serializers.playlists_serializers import PlaylistSerializer
from ..serializers.tracks_serializers import TrackSerializer
from rest_framework.response import Response
from rest_framework import permissions


def index(request):
    return render(request, 'index.html')


def index_pk(request, pk):
    return render(request, 'index.html')


def index_code(request, code):
    return render(request, 'index.html')


class AppSearchAPIView(APIView):
    def get(self, request):
        query = request.GET.get('search')
        albums = Album.objects.filter(name__istartswith=query)
        artists = Artist.objects.filter(nickname__istartswith=query)
        genres = Genre.objects.filter(name__istartswith=query)
        playlists = Playlist.objects.filter(name__istartswith=query)
        tracks = Track.objects.filter(title__istartswith=query)
        albums_data = AlbumSerializer(albums, many=True).data
        artists_data = ArtistSerializer(artists, many=True).data
        genres_data = GenreSerializer(genres, many=True).data
        playlists_data = PlaylistSerializer(playlists, many=True).data
        tracks_data = TrackSerializer(tracks, many=True).data
        if len(albums_data) == 0 and len(artists_data)==0 and len(genres_data)==0 and len(playlists_data)==0 and len(tracks_data)==0:
            return Response({'message': 'not found'})
        return Response([albums_data, artists_data, genres_data, playlists_data, tracks_data])
