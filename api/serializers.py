from rest_framework import serializers
from .models import Track, Album, Artist, Playlist, Genre, Playlist


class ArtistSerializerForTrack(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'nickname', 'photo']


class GenreSerializerForTrack(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']


class TrackSerializer(serializers.ModelSerializer):
    artists_info = ArtistSerializerForTrack(source='artists', many=True)
    genres_info = GenreSerializerForTrack(source='genres', many=True)

    class Meta:
        model = Track
        fields = ['id', 'title', 'date_of_release', 'soundtrack',
                  'cover', 'artists_info', 'genres_info', 'description']


class AlbumSerializerForArtist(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['id', 'name', 'date_of_release', 'description', 'cover', 'type_of_album']


class ArtistSerializer(serializers.ModelSerializer):
    albums = AlbumSerializerForArtist(read_only=True, many=True)

    class Meta:
        model = Artist
        fields = '__all__'



class TrackSerializerForAlbum(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ['id', 'title',
                  'cover', 'description']


class ArtistSerializerForAlbum(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'nickname', 'photo']


class AlbumSerializer(serializers.ModelSerializer):
    artists_info = ArtistSerializerForAlbum(source='artists', many=True)
    tracks_info = TrackSerializerForAlbum(source='track', many=True)

    class Meta:
        model = Album
        fields = ['id', 'name', 'date_of_release', 'description',
                  'cover', 'artists_info', 'tracks_info', 'type_of_album']


class GenreSerializer(serializers.ModelSerializer):
    tracks = TrackSerializerForAlbum(read_only=True, many=True)

    class Meta:
        model = Genre
        fields = '__all__'


class TrackSerializerForPlaylist(serializers.ModelSerializer):
    artists_info = ArtistSerializerForTrack(source='artists', many=True)

    class Meta:
        model = Track
        fields = ['id', 'title', 'soundtrack', 'cover', 'artists_info']


class PlaylistSerializer(serializers.ModelSerializer):
    tracks = TrackSerializerForPlaylist(source='track', many=True)

    class Meta:
        model = Playlist
        fields = '__all__'
