from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView, UpdateView, ResetPasswordView, ConfirmRegisterView, ConfirmResetPasswordView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('confirm-register/<str:code>', ConfirmRegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('profile', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('update', UpdateView.as_view()),
    path('reset-password', ResetPasswordView.as_view()),
    path('confirm-reset-password/<str:code>', ConfirmResetPasswordView.as_view()),
]
