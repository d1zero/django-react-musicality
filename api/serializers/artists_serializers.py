from rest_framework import serializers
from ..models import Album, Artist, FavoriteArtists

class AlbumSerializerForArtist(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['id', 'name', 'date_of_release', 'description', 'cover', 'type_of_album']


class ArtistSerializer(serializers.ModelSerializer):
    albums = AlbumSerializerForArtist(read_only=True, many=True)
    class Meta:
        model = Artist
        fields = '__all__'


class FavoriteArtistsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteArtists
        fields = '__all__'

