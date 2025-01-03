# Dental System API

This is a dental system application built with Django and Django REST framework. It provides various APIs for user registration, login, retrieving user information, and more.

## Features

- User registration with default avatar and role
- User login with JWT authentication
- Retrieve user information
- List all users with pagination
- List all doctors
- List all services
- Error handling with detailed messages

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/dental-system.git
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
    python [manage.py](http://_vscodecontentref_/1) makemigrations
    python [manage.py](http://_vscodecontentref_/2) migrate
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

### Get All Users

- **URL:** `/api/users/`
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
            "meta": {
                "current": "1",
                "pageSize": "10",
                "pages": 1,
                "total": 2
            },
            "result": [
                {
                    "id": "1",
                    "fullname": "Nguyen Van A",
                    "phone": "0123456789",
                    "role": "USER",
                    "avatar": "avatars/avatar-1.png"
                },
                {
                    "id": "2",
                    "fullname": "Nguyen Van B",
                    "phone": "0987654321",
                    "role": "ADMIN",
                    "avatar": "avatars/avatar-2.png"
                }
            ]
        }
    }
    ```

### Get All Doctors

- **URL:** `/api/admin/get-all-doctor/`
- **Method:** `GET`
- **Headers:**

    ```http
    Authorization: Bearer your_access_token
    ```

- **Response:**

    ```json
    {
        "message": "",
        "data": [
            {
                "fullname": "Dr. A",
                "work": "Dentist",
                "img": "doctor-a.png"
            },
            {
                "fullname": "Dr. B",
                "work": "Orthodontist",
                "img": "doctor-b.png"
            }
        ]
    }
    ```

### Get All Services

- **URL:** `/api/services/`
- **Method:** `GET`
- **Response:**

    ```json
    {
        "message": "",
        "data": [
            {
                "id": "1",
                "name": "Service A",
                "title": "Title A",
                "detail": "Detail A",
                "img": "service-a.png"
            },
            {
                "id": "2",
                "name": "Service B",
                "title": "Title B",
                "detail": "Detail B",
                "img": "service-b.png"
            }
        ]
    }
    ```

## Error Handling

### Duplicate Phone Number

- **Response:**

    ```json
    {
        "message": "Đăng ký không thành công.",
        "errors": {
            "phone": ["Số điện thoại đã tồn tại."]
        }
    }
    ```

### Invalid Login

- **Response:**

    ```json
    {
        "message": "Thông tin đăng nhập không chính xác"
    }
    ```

### Unauthorized Access

- **Response:**

    ```json
    {
        "message": "Bạn Cần Access Token để truy cập APIs - Unauthorized (Token hết hạn, hoặc không hợp lệ, hoặc không truyền access token)"
    }
    ```

## License

This project is licensed under the MIT License.
