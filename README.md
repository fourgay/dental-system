Sure, here is the updated README with your GitHub username:

---

# 🦷 Dental System API

Welcome to the **Dental System API**! This project provides a simple API for user registration and login using Django and Django REST framework.

![Django](https://img.shields.io/badge/Django-3.2-green)
![DRF](https://img.shields.io/badge/DRF-3.12-red)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- **User Registration**: Create a new user account.
- **User Login**: Authenticate a user and provide a JWT token.

## 📚 Table of Contents

- Installation
- API Endpoints
  - Register
  - Login
- Usage
- Contributing
- License

## 🛠️ Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/fourgay/dental-system.git
    cd dental-system
    ```

2. **Create a virtual environment**:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

4. **Apply migrations**:
    ```sh
    python manage.py migrate
    ```

5. **Run the development server**:
    ```sh
    python manage.py runserver
    ```

## 🔗 API Endpoints

### 📝 Register

- **URL**: `/api/accounts/register/`
- **Method**: `POST`
- **Description**: Create a new user account.
- **Request Body**:
    ```json
    {
        "fullname": "John Doe",
        "phone": "1234567890",
        "password": "yourpassword"
    }
    ```
- **Response**:
    - **Success** (201 Created):
        ```json
        {
            "message": "Tạo người dùng thành công!",
            "data": {
                "id": 1,
                "fullname": "John Doe",
                "phone": "1234567890"
            }
        }
        ```
    - **Error** (400 Bad Request):
        ```json
        {
            "errors": {
                "phone": ["This field must be unique."]
            }
        }
        ```

### 🔐 Login

- **URL**: `/api/accounts/login/`
- **Method**: `POST`
- **Description**: Authenticate a user and provide a JWT token.
- **Request Body**:
    ```json
    {
        "phone": "1234567890",
        "password": "yourpassword"
    }
    ```
- **Response**:
    - **Success** (200 OK):
        ```json
        {
            "refresh": "your_refresh_token",
            "access": "your_access_token"
        }
        ```
    - **Error** (401 Unauthorized):
        ```json
        {
            "detail": "Invalid credentials"
        }
        ```

## 🚀 Usage

### Register a New User

To register a new user, send a `POST` request to `/api/accounts/register/` with the user's details in the request body.

Example using `curl`:
```sh
curl -X POST http://127.0.0.1:8000/api/accounts/register/ \
-H "Content-Type: application/json" \
-d '{"fullname": "John Doe", "phone": "1234567890", "password": "yourpassword"}'
```

### Login

To log in, send a `POST` request to `/api/accounts/login/` with the user's phone number and password in the request body.

Example using `curl`:
```sh
curl -X POST http://127.0.0.1:8000/api/accounts/login/ \
-H "Content-Type: application/json" \
-d '{"phone": "1234567890", "password": "yourpassword"}'
```

## 🤝 Contributing

We welcome contributions! Please read our Contributing Guidelines before submitting a pull request.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

Feel free to customize this README further to better fit your project's needs.
