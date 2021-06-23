from ..models import Track, FavoriteTracks
from ..serializers.tracks_serializers import TrackSerializer, FavoriteTracksSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import get_object_or_404
from user.models import User
import jwt


class TrackList(APIView):
    def get(self, request):
        tracks = Track.objects.all()
        data = TrackSerializer(tracks, many=True).data
        return Response(data)


class TrackDetail(APIView):
    def get(self, request, pk):
        track = get_object_or_404(Track, pk=pk)
        data = TrackSerializer(track).data
        return Response(data)


class FavoriteTracksDetailView(APIView):
    def get(self, request, pk):
        token = request.COOKIES.get('jwt')
        if token:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])
            track = Track.objects.get(id=pk)
            try:
                fav_tracks = FavoriteTracks.objects.get(user=user, track=track)
                data = {'message': 'success'}
            except FavoriteTracks.DoesNotExist:
                data = {'message': 'failed'}
        else:
            raise AuthenticationFailed('Unauthenticated!')
        return Response(data)


class FavoriteTracksView(APIView):
    def get(self, request):
        try:
            token = request.COOKIES.get('jwt')
            if token:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                user = User.objects.get(id=payload['id'])
                try:
                    fav_track = FavoriteTracks.objects.filter(user=user)
                    data = FavoriteTracksSerializer(fav_track, many=True).data
                except FavoriteTracks.DoesNotExist:
                    data = {'message': 'no favorites'}
            else:
                raise AuthenticationFailed('Unauthenticated!')
            return Response(data)
        except User.DoesNotExist:
            data = {'message': 'no favorites'}
        return Response(data)


class AddTrackToFavorites(APIView):
    def post(self, request, pk):
        try:
            token = request.COOKIES.get('jwt')
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])
            track = Track.objects.get(id=pk)
            favorite_tracks = FavoriteTracks.objects.get(
                user=user, track=track)
            favorite_tracks.delete()
        except FavoriteTracks.DoesNotExist:
            token = request.COOKIES.get('jwt')
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])
            track = Track.objects.get(id=pk)
            favorite_tracks = FavoriteTracks.objects.create(
                user=user, track=track)
            favorite_tracks.save()

        response = Response()
        response.data = {'message': 'success'}
        return response


class TrackSearchAPIView(APIView):
    def get(self, request):
        query = request.GET.get('search')
        tracks = Track.objects.filter(title__istartswith=query)
        data = TrackSerializer(tracks, many=True).data
        if len(data) == 0:
            data = {'message': 'not found'}
        return Response(data)
