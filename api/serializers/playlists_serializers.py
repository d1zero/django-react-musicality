from rest_framework import serializers
from ..models import FavoritePlaylists, Track, Playlist, Artist


class ArtistSerializerForTrack(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'nickname', 'photo']


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


class FavoritePlaylistsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoritePlaylists
        fields = '__all__'
