from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response

2

from django.db.models import Q

from .serializers import TrackSerializer, AlbumSerializer, GenreSerializer, ArtistSerializer, PlaylistSerializer
from .models import Track, Album, Genre, Artist, Playlist


class TrackList(APIView):
    def get(self, request):
        tracks = Track.objects.all()
        data = TrackSerializer(tracks, many=True).data
        return Response(data)


class TrackDetail(APIView):
    def get(self, request, pk):
        track = get_object_or_404(Track, pk=pk)
        data = TrackSerializer(track).data
        return Response(data)


class AlbumList(APIView):
    def get(self, request):
        albums = Album.objects.all()
        data = AlbumSerializer(albums, many=True).data
        return Response(data)


class AlbumDetail(APIView):
    def get(self, request, pk):
        album = get_object_or_404(Album, pk=pk)
        data = AlbumSerializer(album).data
        return Response(data)


class GenreList(APIView):
    def get(self, request):
        genres = Genre.objects.all()
        data = GenreSerializer(genres, many=True).data
        return Response(data)


class GenreDetail(APIView):
    def get(self, request, pk):
        genre = get_object_or_404(Genre, pk=pk)
        data = GenreSerializer(genre).data
        return Response(data)


class ArtistList(APIView):
    def get(self, request):
        artists = Artist.objects.all()
        data = ArtistSerializer(artists, many=True).data
        return Response(data)


class ArtistDetail(APIView):
    def get(self, request, pk):
        artist = get_object_or_404(Artist, pk=pk)
        data = ArtistSerializer(artist).data
        return Response(data)


class ArtistList(APIView):
    def get(self, request):
        artists = Artist.objects.all()
        data = ArtistSerializer(artists, many=True).data
        return Response(data)


class ArtistDetail(APIView):
    def get(self, request, pk):
        artist = get_object_or_404(Artist, pk=pk)
        data = ArtistSerializer(artist).data
        return Response(data)


class PlaylistList(APIView):
    def get(self, request):
        playlists = Playlist.objects.all()
        data = PlaylistSerializer(playlists, many=True).data
        return Response(data)


class PlaylistDetail(APIView):
    def get(self, request, pk):
        playlist = get_object_or_404(Playlist, pk=pk)
        data = PlaylistSerializer(playlist).data
        return Response(data)


def index(request):
    return render(request, 'index.html')

def index_pk(request, pk):
    return render(request, 'index.html')
