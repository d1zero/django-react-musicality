from ..models import Genre, FavoriteGenres
from ..serializers.genres_serializers import GenreSerializer, FavoriteGenresSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import get_object_or_404
from user.models import User
import jwt

class GenreList(APIView):
    def get(self, request):
        genres = Genre.objects.all()
        data = GenreSerializer(genres, many=True).data
        return Response(data)


class GenreDetail(APIView):
    def get(self, request, pk):
        genre = get_object_or_404(Genre, pk=pk)
        data = GenreSerializer(genre).data
        return Response(data)


class FavoriteGenresDetailView(APIView):
    def get(self, request, pk):
        token = request.COOKIES.get('jwt')
        if token:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])
            genre = Genre.objects.get(id=pk)
            try:
                fav_genres = FavoriteGenres.objects.get(user=user, genre=genre)
                data = {'message': 'success'}
            except FavoriteGenres.DoesNotExist:
                data = {'message': 'failed'}
        else:
            raise AuthenticationFailed('Unauthenticated!')
        return Response(data)


class FavoriteGenresView(APIView):
    def get(self, request):
        try:
            token = request.COOKIES.get('jwt')
            if token:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                user = User.objects.get(id=payload['id'])
                try:
                    fav_genre = FavoriteGenres.objects.filter(user=user)
                    data = FavoriteGenresSerializer(fav_genre, many=True).data
                except FavoriteGenres.DoesNotExist:
                    data = {'message': 'no favorites'}
            else:
                raise AuthenticationFailed('Unauthenticated!')
            return Response(data)
        except User.DoesNotExist:
            data = {'message': 'no favorites'}
        return Response(data)


class AddGenreToFavorites(APIView):
    def post(self, request, pk):
        try:
            user = User.objects.get(username=request.data['username'])
            genre = Genre.objects.get(id=pk)
            favorite_genres = FavoriteGenres.objects.get(
                user=user, genre=genre)
            favorite_genres.delete()
        except FavoriteGenres.DoesNotExist:
            user = User.objects.get(username=request.data['username'])
            genre = Genre.objects.get(id=pk)
            favorite_genres = FavoriteGenres.objects.create(
                user=user, genre=genre)
            favorite_genres.save()

        response = Response()
        response.data = {'message': 'success'}
        return response