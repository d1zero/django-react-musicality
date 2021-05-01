from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'get_image', 'date_joined', 'last_login', 'is_staff', 'is_admin')
    search_fields = ('email', 'username',)
    readonly_fields = ('date_joined', 'last_login', 'get_image',)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()
