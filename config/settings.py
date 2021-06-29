from pathlib import Path
import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env(
    DEBUG=(bool, False)
)
environ.Env.read_env()


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

# Application definition

INSTALLED_APPS = [
    'baton',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Installed apps
    'corsheaders',
    'rest_framework',

    # My apps
    'api',
    'user',
    'baton.autodiscover',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'frontend/build'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

AUTH_USER_MODEL = 'user.User'

WSGI_APPLICATION = 'config.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    # SQLITE
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }

    # POSTGRES
    # 'default': {
    #     'ENGINE': 'django.db.backends.postgresql_psycopg2',
    #     'NAME': 'musicality_db',
    #     'USER': 'musicality',
    #     'PASSWORD': '',
    #     'HOST': '127.0.0.1',
    #     'PORT': 5432,
    # }

    # MySQL
    # 'default': {
    #    'ENGINE': 'django.db.backends.mysql',
    #    'NAME': env('DB_NAME'),
    #    'HOST': 'std-mysql',
    #    'PORT': 3306,
    #    'USER': env('DB_USER'),
    #    'PASSWORD': env('DB_PASSWORD'),
    # }
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'ru-ru'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/media/'

STATICFILES_DIRS = [
    (BASE_DIR / 'frontend/build/static'),
]
STATIC_ROOT = BASE_DIR / 'static'

MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

DATETIME_FORMAT = "%H:%M:%S %d-%m-%Y"

BATON = {
    'SITE_HEADER': 'Musicality',
    'SITE_TITLE': 'Musicality',
    'INDEX_TITLE': 'Панель Администратора Musicality',
    'SUPPORT_HREF': 'https://t.me/d1z3ro',
    'COPYRIGHT': 'copyright © 2021 <a href="https://t.me/d1z3ro">d1zero code</a>',
    'POWERED_BY': '<a href="https://t.me/d1z3ro">d1zero</a>',
    'CONFIRM_UNSAVED_CHANGES': True,
    'SHOW_MULTIPART_UPLOADING': True,
    'ENABLE_IMAGES_PREVIEW': True,
    'CHANGELIST_FILTERS_IN_MODAL': True,
    'CHANGELIST_FILTERS_ALWAYS_OPEN': False,
    'CHANGELIST_FILTERS_FORM': True,
    'COLLAPSABLE_USER_AREA': False,
    'MENU_ALWAYS_COLLAPSED': False,
    'MENU_TITLE': 'Menu',
    'MESSAGES_TOASTS': False,
    'GRAVATAR_DEFAULT_IMG': 'monsterid',
    'LOGIN_SPLASH': '/media/images/admin-bg.jpg',
    'MENU': (
        {
            'type': 'app',
            'name': 'user',
            'label': 'Пользователь',
            'icon': 'fa fa-user',
            'default_open': False,
            'models': (
                {
                    'name': 'user',
                    'label': 'Пользователи'
                },
            )
        },
        {
            'type': 'app',
            'name': 'api',
            'label': 'API',
            'icon': 'fa fa-link',
            'default_open': False,
            'models': (
                {
                    'name': 'track',
                    'label': 'Треки'
                },
                                {
                    'name': 'album',
                    'label': 'Альбомы'
                },
                                {
                    'name': 'artist',
                    'label': 'Исполнители'
                },
                {
                    'name': 'playlist',
                    'label': 'Плейлисты'
                },
                {
                    'name': 'genre',
                    'label': 'Жанры'
                },
            )
        },
        {
            'type': 'app',
            'name': 'api',
            'label': 'Избранное',
            'icon': 'fa fa-link',
            'default_open': False,
            'models': (
                {
                    'name': 'favoritealbums',
                    'label': 'Избранные альбомы'
                },
                {
                    'name': 'favoriteartists',
                    'label': 'Избранные исполнители'
                },
                {
                    'name': 'favoritegenres',
                    'label': 'Избранные жанры'
                },
                {
                    'name': 'favoriteplaylists',
                    'label': 'Избранные плейлисты'
                },
                {
                    'name': 'favoritetracks',
                    'label': 'Избранные треки'
                },
            )
        },
        # { 'type': 'title', 'label': 'Contents', 'apps': ('flatpages', ) },
        # { 'type': 'model', 'label': 'Pages', 'name': 'flatpage', 'app': 'flatpages' },
        # { 'type': 'free', 'label': 'Custom Link', 'url': 'http://www.google.it', 'perms': ('flatpages.add_flatpage', 'auth.change_user') },
        # { 'type': 'free', 'label': 'My parent voice', 'children': [
        #     { 'type': 'model', 'label': 'A Model', 'name': 'mymodelname', 'app': 'myapp', 'icon': 'fa fa-gavel' },
        #     { 'type': 'free', 'label': 'Another custom link', 'url': 'http://www.google.it' },
        # ] },
    ),
    # 'ANALYTICS': {
    #     'CREDENTIALS': os.path.join(BASE_DIR, 'credentials.json'),
    #     'VIEW_ID': '12345678',
    # }
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = env('EMAIL_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_PASSWORD')
EMAIL_PORT = 587
EMAIL_USE_TLS = True

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
}
