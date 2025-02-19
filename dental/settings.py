import os
import pymysql
from pathlib import Path
from datetime import timedelta

# Cấu hình PyMySQL (nếu dùng pymysql thay vì mysqlclient)
pymysql.install_as_MySQLdb()

# Định nghĩa thư mục gốc
BASE_DIR = Path(__file__).resolve().parent.parent

# 🔹 Lấy SECRET_KEY từ biến môi trường (bảo mật hơn)
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'default-secret-key')

# 🔹 Tắt DEBUG khi chạy production
DEBUG = os.getenv('DJANGO_DEBUG', 'True') == 'True'

# 🔹 Cấu hình ALLOWED_HOSTS (Thêm domain Render)
ALLOWED_HOSTS = [
    "dental-system.onrender.com",  
    "127.0.0.1",
    "localhost",
]

# 🔹 CORS (Chỉ mở cho frontend hợp lệ)
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend.onrender.com",  # Thay bằng domain frontend thực tế
    "http://localhost:4000",
    "http://127.0.0.1:4000",
]
CSRF_TRUSTED_ORIGINS = [
    "https://your-frontend.onrender.com",  # Tránh lỗi CSRF
    "http://localhost:4000",
    "http://127.0.0.1:4000",
]

# Ứng dụng cài đặt
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'users',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # 🔹 Quản lý static files
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'dental.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
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

WSGI_APPLICATION = 'dental.wsgi.application'

# 🔹 Cấu hình DATABASE (Dùng MySQL)
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.getenv("DB_NAME", "dbdental"),
        "USER": os.getenv("DB_USER", "avnadmin"),
        "PASSWORD": os.getenv("DB_PASSWORD", "AVNS_rkAhzlA5uDwLOFROT3g"),
        "HOST": os.getenv("DB_HOST", "mysql-3f4adfe0-dental-st.g.aivencloud.com"),
        "PORT": os.getenv("DB_PORT", "13647"),
        "OPTIONS": {
            "charset": "utf8mb4",
            "init_command": "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}
# Kiểm tra nếu thiếu biến DATABASE sẽ dùng SQLite tạm thời
if not all(DATABASES['default'].values()):
    DATABASES['default'] = {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }

# Xác thực mật khẩu
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Ngôn ngữ và thời gian
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# 🔹 Cấu hình STATICFILES (Dùng Whitenoise)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Xác thực người dùng
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'users.authentication.CustomBackend',
]

AUTH_USER_MODEL = 'users.Data'

# 🔹 Cấu hình JWT Authentication
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}

DATE_INPUT_FORMATS = [
    "%d-%m-%Y",
    "%Y-%m-%d",
]

# Cấu hình ngôn ngữ và định dạng ngày tháng
DATE_FORMAT = "d-m-Y"
USE_L10N = False  # Để DATE_FORMAT có hiệu lực

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'