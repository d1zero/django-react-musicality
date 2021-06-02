from rest_framework import serializers
from ..models import FavoriteGenres, Genre, Track


class TrackSerializerForAlbum(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ['id', 'title',
                  'cover', 'description', 'soundtrack']


class GenreSerializer(serializers.ModelSerializer):
    tracks = TrackSerializerForAlbum(read_only=True, many=True)

    class Meta:
        model = Genre
        fields = '__all__'


class FavoriteGenresSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteGenres
        fields = '__all__'
