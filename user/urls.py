from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView, UpdateView, ResetPasswordView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('profile', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('update', UpdateView.as_view()),
    path('reset-password', ResetPasswordView.as_view()),
]
