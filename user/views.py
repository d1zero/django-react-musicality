from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.db import IntegrityError
import jwt
import datetime
from django.core.mail import send_mail
from django.conf import settings
from django.utils.crypto import get_random_string

from .serializers import UserSerializer
from .models import User


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        payload = {
            'username': request.data.get('username'),
            'code': get_random_string(length=32)
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
        username = request.data.get('username')

        # Production
        link = "http://musicality.std-1578.ist.mospolytech.ru/confirm-register/"+token
        # Development
        # link = "http://localhost:3000/confirm-register/"+token

        markup = """
            <div
            style="
                background-color: #3f51b5;
                height: 100px;
                max-height: 100px;
                min-width: 410px;
                margin-bottom: 16px;
            "
            >
            <br />
            <div style="width: 100%;">
                <img
                src="http://musicality.std-1578.ist.mospolytech.ru/media/images/favicon.ico"
                alt="logo"
                height="32px"
                style="padding-left: 40%;"
                />&#160;
                <span style="color: white; padding: 0; margin: 0; font-size: 40px;">
                Musicality
                </span>
            </div>
            </div>
            <div style="">
            <p style="padding-left: 42%; font-size: 20px;">Привет, """+username+"""!</p>
            <p style="padding-left: 30%; width: 50%;">
                Вы указали данный адрес электронный почты при регистрации в музыкальном
                сервисе Musicality. Для завершения регистрации, пожалуйста, нажмите на
                кнопку подтверждения.
            </p>
            </div>
            <a
            style="
                text-decoration: none;
                color: #434ab8;
                margin-left: 42%;
                outline: none;
                font-size: 20px;
            "
            href='"""+link+"""'>
            Подтвердить почту
            </a>
            <p
            style="
                font-size: 12px;
                color: grey;
                padding-left: 25%;
                width: 60%;
                text-align: center;
            "
            >
            Если письмо пришло Вам по ошибке, проигнорируйте его. Пожалуйста, не
            отвечайте на данное сообщение. Рассылка осуществляется автоматически.
            </p>
            <div
            style="
                padding-left: 25%;
                width: 50%;
                text-align: center;
                font-size: 14px;
            "
            >
            <p>
                С уважением, команда Musicality
            </p>
            </div>
        """

        send_mail('Активация аккаунта Musicality', f'Привет, {username}! Перейди по ссылке: {link} С уважением, команда Musicality',
                  settings.EMAIL_HOST_USER, [request.data.get('email')], fail_silently=False, html_message=markup)
        serializer.save()
        return Response(serializer.data)


class ConfirmRegisterView(APIView):
    def patch(self, request, code, *args, **kwargs):
        data = request.data
        response = Response()

        payload = jwt.decode(code, 'secret', algorithms=['HS256'])

        user = User.objects.get(username=payload['username'])
        user.confirmed = True
        user.save()
        response.data = {
            'message': 'success'
        }
        return response


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

        if not user.confirmed:
            raise AuthenticationFailed('Not activated')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=5),
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
    def post(self, request, *args, **kwargs):
        data = request.data
        response = Response()

        try:
            user = User.objects.get(email=data.get('email'))

            payload = {
                'email': user.email,
                'code': get_random_string(length=32)
            }
            token = jwt.encode(payload, 'secret', algorithm='HS256')

            # Production
            link = "http://musicality.std-1578.ist.mospolytech.ru/confirm-reset-password/"+token
            # Development
            # link = "http://localhost:3000/confirm-reset-password/"+token

            markup = """
                <div
                style="
                    background-color: #3f51b5;
                    height: 100px;
                    max-height: 100px;
                    min-width: 410px;
                    margin-bottom: 16px;
                "
                >
                <br />
                <div style="width: 100%;">
                    <img
                    src="http://musicality.std-1578.ist.mospolytech.ru/media/images/favicon.ico"
                    alt="logo"
                    height="32px"
                    style="padding-left: 40%;"
                    />&#160;
                    <span style="color: white; padding: 0; margin: 0; font-size: 40px;">
                    Musicality
                    </span>
                </div>
                </div>
                <div style="">
                <p style="padding-left: 42%; font-size: 20px;">Привет, """+user.username+"""!</p>
                <p style=" padding-left: 40%;">
                    Для смены пароля перейдите по ссылке ниже
                </p>
                </div>
                <a
                style="
                    text-decoration: none;
                    color: #434ab8;
                    margin-left: 42%;
                    outline: none;
                    font-size: 20px;
                "
                href='"""+link+"""'>
                Сбросить пароль
                </a>
                <div
                style="
                    padding-left: 40%;
                    font-size: 14px;
                "
                >
                    С уважением, команда Musicality
                </div>
            """

            send_mail('Сброс пароля Musicality', f'Привет, {user.username}! Перейди по ссылке: {link} С уважением, команда Musicality',
                      settings.EMAIL_HOST_USER, [user.email], fail_silently=False, html_message=markup)
            response.data = {
                'message': 'success'
            }
        except User.DoesNotExist:
            response.data = {
                'message': 'User not found'
            }
        return response


class ConfirmResetPasswordView(APIView):
    def patch(self, request, code, *args, **kwargs):
        response = Response()

        payload = jwt.decode(code, 'secret', algorithms=['HS256'])

        user = User.objects.get(email=payload['email'])
        print(request.data.get('password'))
        if request.data.get('password') is not None:
            user.set_password(request.data.get('password'))
            user.save()
            response.data = {
                'message': 'success'
            }
        else:
            response.data = {
                'message': 'failed'
            }
        return response


class DeleteView(APIView):
    def delete(self, request):
        data = request.data
        response = Response()
        token = request.COOKIES.get('jwt')

        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        user = User.objects.get(id=payload['id'])

        if (user.check_password(data.get('password')) and user.username == data.get('username')):
            user.delete()
            response.delete_cookie('jwt')
            response.data = {
                'message': 'success'
            }
        else:
            response.data = {
                'message': 'failed'
            }

        return response
