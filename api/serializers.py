from rest_framework import serializers
from .models import Track, Album, Artist, Playlist, Genre, Playlist


class TrackSerializerForOther(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = '__all__'


class AlbumSerializerForArtist(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['id', 'name', 'date_of_release', 'description', 'cover']


class ArtistSerializer(serializers.ModelSerializer):
    tracks = TrackSerializerForOther(read_only=True, many=True)
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
    tracks_info = TrackSerializerForOther(source='track', many=True)

    class Meta:
        model = Album
        fields = ['id', 'name', 'date_of_release', 'description',
                  'cover', 'artists_info', 'tracks_info']


class GenreSerializer(serializers.ModelSerializer):
    tracks = TrackSerializerForOther(read_only=True, many=True)
    class Meta:
        model = Genre
        fields = '__all__'


class PlaylistSerializer(serializers.ModelSerializer):
    tracks = TrackSerializerForOther(source='track', many=True)

    class Meta:
        model = Playlist
        fields = ['id', 'tracks', 'name', 'description', 'photo']




class ArtistSerializerForTrack(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'nickname', 'first_name', 'last_name', 'photo']


class GenreSerializerForTrack(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']


class TrackSerializer(serializers.ModelSerializer):
    artists_info = ArtistSerializerForTrack(source='artists', many=True)
    genres_info = GenreSerializerForTrack(source='genres', many=True)
    class Meta:
        model = Track
        fields = ['id', 'title', 'date_of_release', 'soundtrack', 'cover', 'artists_info', 'genres_info']
