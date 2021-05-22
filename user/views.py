from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.db import IntegrityError
import jwt
import datetime

from .serializers import UserSerializer
from .models import User


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        try:
            user = User.objects.get(email=email)
        except Exception:
            raise AuthenticationFailed('User not found')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'message': 'success',
            'username': user.username
        }

        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.get(id=payload['id'])

        serializer = UserSerializer(user)

        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }

        return response


class UpdateView(APIView):
    def patch(self, request, *args, **kwargs):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.get(id=payload['id'])
        data = request.data

        response = Response()

        try:
            try:
                avatar = request.FILES['image']
                user.avatar = avatar
                user.save()
            except KeyError:
                pass
            user.username = data.get('username', user.username)
            user.email = data.get('email', user.email)

            user.save()
            serializer = UserSerializer(user)

            response.data = {
                'message': 'success'
            }
        except IntegrityError:
            response.data = {
                'message': 'failed'
            }

        return response


class ResetPasswordView(APIView):
    def patch(self, request, *args, **kwargs):
        data = request.data
        response = Response()
        try:
            user = User.objects.get(username=data.get('username'))
            if (user.username == data.get('username') and user.email == data.get('email')):
                user.set_password(data.get('new_password'))
                user.save()
                serializer = UserSerializer(user)
                response.data = {
                    'message': 'success'
                }
            elif (user.email != data.get('email')):
                response.data = {
                    'message': 'User not found'
                }
            else:
                response.data = {
                    'message': 'failed'
                }
        except User.DoesNotExist:
            response.data = {
                'message': 'User not found'
            }
        return response
