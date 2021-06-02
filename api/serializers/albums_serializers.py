from rest_framework import serializers
from ..models import Artist, Album, Track, FavoriteAlbums


class TrackSerializerForAlbum(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ['id', 'title',
                  'cover', 'description', 'soundtrack']


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


class FavoriteAlbumsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteAlbums
        fields = '__all__'
