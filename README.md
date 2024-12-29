```markdown
# Dental System

This is a dental system application built with Django and Django REST framework.

## Features

- User registration with default avatar and role
- User login with JWT authentication
- Retrieve user information
- Error handling with detailed messages

## Installation
```
1. Clone the repository:
```

```bash
git clone https://github.com/fourgay/dental-system.git
cd dental-system
```

2. Create a virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

3. Install the dependencies:

```bash
pip install -r requirements.txt
```

4. Apply the migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create a superuser:

```bash
python manage.py createsuperuser
```

6. Run the development server:

```bash
python manage.py runserver
```

## API Endpoints

### Register

- **URL:** `/api/accounts/register/`
- **Method:** `POST`
- **Payload:**

```json
{
    "fullname": "Nguyen Van A",
    "phone": "0123456789",
    "password": "securepassword123"
}
```

- **Response:**

```json
{
    "message": "Tạo người dùng thành công!",
    "data": {
        "id": "1",
        "fullname": "Nguyen Van A",
        "phone": "0123456789",
        "avatar": "avatars/avatar-1.png",
        "role": "USER"
    }
}
```

### Login

- **URL:** `/api/accounts/login/`
- **Method:** `POST`
- **Payload:**

```json
{
    "phone": "0123456789",
    "password": "securepassword123"
}
```

- **Response:**

```json
{
    "message": "Đăng nhập thành công",
    "data": {
        "access_token": "your_access_token",
        "user": {
            "id": "1",
            "fullname": "Nguyen Van A",
            "phone": "0123456789",
            "role": "USER",
            "avatar": "avatars/avatar-1.png"
        }
    }
}
```

### Get User Info

- **URL:** `/api/accounts/user/`
- **Method:** `GET`
- **Headers:**

```http
Authorization: Bearer your_access_token
```

- **Response:**

```json
{
    "message": "",
    "data": {
        "user": {
            "id": "1",
            "fullname": "Nguyen Van A",
            "phone": "0123456789",
            "role": "USER",
            "avatar": "avatars/avatar-1.png"
        }
    }
}
```

### Get User Profile

- **URL:** `/api/accounts/user/<user_id>/`
- **Method:** `GET`
- **Headers:**

```http
Authorization: Bearer your_access_token
```

- **Response:**

```json
{
    "id": "1",
    "fullname": "Nguyen Van A",
    "phone": "0123456789",
    "role": "USER",
    "avatar": "avatars/avatar-1.png"
}
```

## Error Handling

- **Duplicate Phone Number:**

```json
{
    "message": "Đăng ký không thành công.",
    "errors": {
        "phone": ["Số điện thoại đã tồn tại."]
    }
}
```

- **Invalid Login:**

```json
{
    "message": "Thông tin đăng nhập không chính xác"
}
```

- **Unauthorized Access:**

```json
{
    "message": "Bạn Cần Access Token để truy cập APIs - Unauthorized (Token hết hạn, hoặc không hợp lệ, hoặc không truyền access token)"
}
```

## License

This project is licensed under the MIT License.
```

This `README.md` file provides an overview of the project, installation instructions, API endpoints, and error handling details. Adjust the repository URL and any other specific details as needed.
This `README.md` file provides an overview of the project, installation instructions, API endpoints, and error handling details. Adjust the repository URL and any other specific details as needed.
