from rest_framework import serializers
from ..models import Artist, Genre, Track, FavoriteTracks

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


class FavoriteTracksSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteTracks
        fields = '__all__'
