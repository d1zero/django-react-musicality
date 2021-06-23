from ..models import Artist, FavoriteArtists
from ..serializers.artists_serializers import ArtistSerializer, FavoriteArtistsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from user.models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt


class ArtistList(APIView):
    def get(self, request):
        artists = Artist.objects.all()
        data = ArtistSerializer(artists, many=True).data
        return Response(data)


class ArtistDetail(APIView):
    def get(self, request, pk):
        artist = get_object_or_404(Artist, pk=pk)
        data = ArtistSerializer(artist).data
        return Response(data)


class FavoriteArtistsDetailView(APIView):
    def get(self, request, pk):
        token = request.COOKIES.get('jwt')
        if token:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])
            artist = Artist.objects.get(id=pk)
            try:
                fav_artists = FavoriteArtists.objects.get(user=user, artist=artist)
                data = {'message': 'success'}
            except FavoriteArtists.DoesNotExist:
                data = {'message': 'failed'}
        else:
             raise AuthenticationFailed('Unauthenticated!')
        return Response(data)

class FavoriteArtistsView(APIView):
    def get(self, request):
        try:
            token = request.COOKIES.get('jwt')
            if token:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                user = User.objects.get(id=payload['id'])
                try:
                    fav_artist = FavoriteArtists.objects.filter(user=user)
                    data = FavoriteArtistsSerializer(fav_artist, many=True).data
                except FavoriteArtists.DoesNotExist:
                    data = {'message': 'no favorites'}
            else:
                raise AuthenticationFailed('Unauthenticated!')
            return Response(data)
        except User.DoesNotExist:
            data = {'message': 'no favorites'}
        return Response(data)

class AddArtistToFavorites(APIView):
    def post(self, request, pk):
        try:
            user = User.objects.get(username=request.data['username'])
            artist = Artist.objects.get(id=pk)
            favorite_artists = FavoriteArtists.objects.get(
                user=user, artist=artist)
            favorite_artists.delete()
        except FavoriteArtists.DoesNotExist:
            user = User.objects.get(username=request.data['username'])
            artist = Artist.objects.get(id=pk)
            favorite_artists = FavoriteArtists.objects.create(
                user=user, artist=artist)
            favorite_artists.save()

        response = Response()
        response.data = {'message': 'success'}
        return response


class ArtistSearchAPIView(APIView):
    def get(self, request):
        query = request.GET.get('search')
        artists = Artist.objects.filter(nickname__istartswith=query)
        data = ArtistSerializer(artists, many=True).data
        if len(data) == 0:
            data = {'message': 'not found'}
        return Response(data)
