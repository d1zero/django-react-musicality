from ..models import Playlist, FavoritePlaylists
from ..serializers.playlists_serializers import PlaylistSerializer, FavoritePlaylistsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from user.models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt
from .check_token import check_api_token


class PlaylistList(APIView):
    def get(self, request):
        if check_api_token(request):
            return check_api_token(request)
        playlists = Playlist.objects.all()
        data = PlaylistSerializer(playlists, many=True).data
        return Response(data)


class PlaylistDetail(APIView):
    def get(self, request, pk):
        if check_api_token(request):
            return check_api_token(request)
        playlist = get_object_or_404(Playlist, pk=pk)
        data = PlaylistSerializer(playlist).data
        return Response(data)


class FavoritePlaylistsDetailView(APIView):
    def get(self, request, pk):
        if check_api_token(request):
            return check_api_token(request)
        token = request.COOKIES.get('jwt')
        if token:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])
            playlist = Playlist.objects.get(id=pk)
            try:
                fav_playlist = FavoritePlaylists.objects.get(
                    user=user, playlist=playlist)
                data = {'message': 'success'}
            except FavoritePlaylists.DoesNotExist:
                data = {'message': 'failed'}
        else:
            raise AuthenticationFailed('Unauthenticated!')
        return Response(data)


class FavoritePlaylistsView(APIView):
    def get(self, request):
        if check_api_token(request):
            return check_api_token(request)
        try:
            token = request.COOKIES.get('jwt')
            if token:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                user = User.objects.get(id=payload['id'])
                try:
                    fav_playlist = FavoritePlaylists.objects.filter(user=user)
                    data = FavoritePlaylistsSerializer(
                        fav_playlist, many=True).data
                except FavoritePlaylists.DoesNotExist:
                    data = {'message': 'no favorites'}
            else:
                raise AuthenticationFailed('Unauthenticated!')
            return Response(data)
        except User.DoesNotExist:
            data = {'message': 'no favorites'}
        return Response(data)


class AddPlaylistToFavorites(APIView):
    def post(self, request, pk):
        if check_api_token(request):
            return check_api_token(request)
        try:
            user = User.objects.get(username=request.data['username'])
            playlist = Playlist.objects.get(id=pk)
            favorite_playlists = FavoritePlaylists.objects.get(
                user=user, playlist=playlist)
            favorite_playlists.delete()
        except FavoritePlaylists.DoesNotExist:
            user = User.objects.get(username=request.data['username'])
            playlist = Playlist.objects.get(id=pk)
            favorite_genres = FavoritePlaylists.objects.create(
                user=user, playlist=playlist)
            favorite_genres.save()

        response = Response()
        response.data = {'message': 'success'}
        return response


class PlaylistSearchAPIView(APIView):
    def get(self, request):
        if check_api_token(request):
            return check_api_token(request)
        query = request.GET.get('search')
        playlist = Playlist.objects.filter(name__istartswith=query)
        data = PlaylistSerializer(playlist, many=True).data
        if len(data) == 0:
            data = {'message': 'not found'}
        return Response(data)
