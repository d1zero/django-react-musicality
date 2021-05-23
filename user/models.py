from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.html import mark_safe


class MyUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('User must have an email address')
        if not username:
            raise ValueError('User must have an username')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username,
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True

        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(verbose_name='Email', max_length=60, unique=True)
    username = models.CharField(verbose_name='Имя пользователя', max_length=30, unique=True)
    date_joined = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='Последний вход', auto_now=True)
    avatar = models.ImageField(upload_to='images/users_avatars/', verbose_name='Аваратка', blank=True)
    confirmed = models.BooleanField(verbose_name='Активированный аккаунт', default=False)

    def get_image(self):
        if self.avatar:
            return mark_safe(u'<img src="{0}" height="100" width="100"/>'.format(self.avatar.url))
        else:
            return '(Нет изображения)'

    get_image.short_description = 'Аватар'
    get_image.allow_tags = True


    is_admin = models.BooleanField(default=False, verbose_name='Администратор?')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False, verbose_name='Персонал')
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', ]

    objects = MyUserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
