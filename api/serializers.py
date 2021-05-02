from rest_framework import serializers
from .models import Track, Album, Artist, Playlist, Genre, Playlist


class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = '__all__'


class AlbumSerializerForArtist(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['id', 'name', 'date_of_release', 'description', 'cover']


class ArtistSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(read_only=True, many=True)
    albums = AlbumSerializerForArtist(read_only=True, many=True)
    class Meta:
        model = Artist
        fields = '__all__'


class ArtistSerializerForAlbum(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'


class AlbumSerializer(serializers.ModelSerializer):
    artists_info = ArtistSerializerForAlbum(source='artists', many=True)
    tracks_info = TrackSerializer(source='track', many=True)
    class Meta:
        model = Album
        fields = ['id', 'name', 'date_of_release', 'description', 'cover', 'artists_info', 'tracks_info']


class GenreSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(read_only=True, many=True)
    class Meta:
        model = Genre
        fields = '__all__'


class PlaylistSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(source='track', many=True)
    class Meta:
        model = Playlist
        fields = ['id', 'tracks', 'name', 'description', 'photo']
