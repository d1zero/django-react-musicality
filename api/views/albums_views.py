from ..models import Album, FavoriteAlbums
from ..serializers.albums_serializers import AlbumSerializer, FavoriteAlbumsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from user.models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt


class AlbumList(APIView):
    def get(self, request):
        albums = Album.objects.all()
        data = AlbumSerializer(albums, many=True).data
        return Response(data)


class AlbumDetail(APIView):
    def get(self, request, pk):
        album = get_object_or_404(Album, pk=pk)
        data = AlbumSerializer(album).data
        return Response(data)


class FavoriteAlbumsDetailView(APIView):
    def get(self, request, pk):
        token = request.COOKIES.get('jwt')
        if token:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])
            album = Album.objects.get(id=pk)
            try:
                fav_albums = FavoriteAlbums.objects.get(user=user, album=album)
                data = {'message': 'success'}
            except FavoriteAlbums.DoesNotExist:
                data = {'message': 'failed'}
        else:
             raise AuthenticationFailed('Unauthenticated!')
        return Response(data)


class FavoriteAlbumsView(APIView):
   def get(self, request):
        try:
            token = request.COOKIES.get('jwt')
            if token:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                user = User.objects.get(id=payload['id'])
                try:
                    fav_album = FavoriteAlbums.objects.filter(user=user)
                    data = FavoriteAlbumsSerializer(fav_album, many=True).data
                except FavoriteAlbums.DoesNotExist:
                    data = {'message': 'no favorites'}
            else:
                raise AuthenticationFailed('Unauthenticated!')
            return Response(data)
        except User.DoesNotExist:
            data = {'message': 'no favorites'}
        return Response(data)


class AddAlbumToFavorites(APIView):
    def post(self, request, pk):
        try:
            user = User.objects.get(username=request.data['username'])
            album = Album.objects.get(id=pk)
            favorite_albums = FavoriteAlbums.objects.get(
                user=user, album=album)
            favorite_albums.delete()
        except FavoriteAlbums.DoesNotExist:
            user = User.objects.get(username=request.data['username'])
            album = Album.objects.get(id=pk)
            favorite_albums = FavoriteAlbums.objects.create(
                user=user, album=album)
            favorite_albums.save()

        response = Response()
        response.data = {'message': 'success'}
        return response
