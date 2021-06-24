from ..models import Genre, FavoriteGenres
from ..serializers.genres_serializers import GenreSerializer, FavoriteGenresSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import get_object_or_404
from user.models import User
import jwt
from .check_token import check_api_token


class GenreList(APIView):
    def get(self, request):
        if check_api_token(request):
            return check_api_token(request)
        genres = Genre.objects.all()
        data = GenreSerializer(genres, many=True).data
        return Response(data)


class GenreDetail(APIView):
    def get(self, request, pk):
        if check_api_token(request):
            return check_api_token(request)
        genre = get_object_or_404(Genre, pk=pk)
        data = GenreSerializer(genre).data
        return Response(data)


class FavoriteGenresDetailView(APIView):
    def get(self, request, pk):
        if check_api_token(request):
            return check_api_token(request)
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
        if check_api_token(request):
            return check_api_token(request)
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
        if check_api_token(request):
            return check_api_token(request)
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


class GenreSearchAPIView(APIView):
    def get(self, request):
        if check_api_token(request):
            return check_api_token(request)
        query = request.GET.get('search')
        genres = Genre.objects.filter(name__istartswith=query)
        data = GenreSerializer(genres, many=True).data
        if len(data) == 0:
            data = {'message': 'not found'}
        return Response(data)
