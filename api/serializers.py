from rest_framework import serializers
from .models import Track, Album, Artist, Playlist, Genre, Playlist


class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = '__all__'


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = '__all__'


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'


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
