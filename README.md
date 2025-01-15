# Dental System

Comprehensive Booking and User Management System

---

## Description

This project is a Django-based REST API designed for managing user accounts, services, and bookings. It includes features for user authentication, service listing, booking management, and administrative actions. The system supports role-based permissions, ensuring secure access to critical operations for administrators and doctors.

---

## Features

### User Management
- **User Registration:** Endpoints to register new users.
- **Login:** JWT-based authentication for secure login.
- **Profile Management:** Retrieve and update user profile information.
- **Admin Actions:**
  - Add new users with specific roles.
  - Delete users.
  - Update user information.

### Booking Management
- **Book Appointments:** Users can create new appointments, specifying service, time, and other details.
- **Manage Appointments:** Users and admins can update or delete bookings.
- **Booking Restrictions:** Prevent users with active bookings from creating new ones.

### Service Management
- **List Services:** Retrieve details of all available services, including name, title, and description.

### Pagination
- Custom pagination to manage large data sets in API responses.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fourgay/dental-system
   ```

2. Navigate to the project directory:
   ```bash
   cd project-directory
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run database migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```

---

## API Endpoints

### Authentication
#### `POST /accounts/register/`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "fullname": "string",
    "phone": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Tạo người dùng thành công!",
    "data": {
      "id": "integer",
      "fullname": "string",
      "phone": "string",
      "role": "USER",
      "avatar": "string"
    }
  }
  ```

#### `POST /accounts/login/`
- **Description:** Login and receive an access token.
- **Request Body:**
  ```json
  {
    "phone": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Đăng nhập thành công",
    "data": {
      "access_token": "string",
      "user": {
        "id": "integer",
        "fullname": "string",
        "phone": "string",
        "role": "USER",
        "avatar": "string"
      }
    }
  }
  ```

### User Management
#### `GET /accounts/user/`
- **Description:** Retrieve current user's information.
- **Response:**
  ```json
  {
    "message": "",
    "data": {
      "user": {
        "id": "integer",
        "fullname": "string",
        "phone": "string",
        "role": "string",
        "avatar": "string"
      }
    }
  }
  ```

#### `GET /accounts/user/<int:user_id>/`
- **Description:** Get profile of a specific user.
- **Response:**
  ```json
  {
    "id": "integer",
    "fullname": "string",
    "phone": "string",
    "role": "string",
    "avatar": "string"
  }
  ```

#### `PUT /admin/Update_user/`
- **Description:** Admin updates user details.
- **Request Body:**
  ```json
  {
    "phone": "string",
    "fullname": "string",
    "birthDay": "string",
    "address": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Cập nhật thông tin thành công.",
    "data": {
      "id": "integer",
      "fullname": "string",
      "phone": "string",
      "role": "string",
      "avatar": "string"
    }
  }
  ```

### Booking Management
#### `POST /services/register_booking/`
- **Description:** Register a new booking.
- **Request Body:**
  ```json
  {
    "fullname": "string",
    "date": "YYYY-MM-DD",
    "time": "HH:MM",
    "forAnother": "boolean",
    "remark": "string",
    "service": "string",
    "account": "string",
    "doctor": "string",
    "status": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Đặt lịch thành công!"
  }
  ```

#### `PUT /update-booking/<int:booking_id>/`
- **Description:** Update an existing booking.
- **Request Body:**
  ```json
  {
    "fullname": "string",
    "date": "YYYY-MM-DD",
    "time": "HH:MM",
    "status": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Cập nhật lịch hẹn thành công.",
    "data": {
      "id": "integer",
      "fullname": "string",
      "date": "YYYY-MM-DD",
      "time": "HH:MM",
      "status": "string"
    }
  }
  ```

#### `DELETE /delete-booking/`
- **Description:** Delete a booking.
- **Query Params:**
  ```
  phone=<string>
  ```
- **Response:**
  ```json
  {
    "message": "Xóa lịch hẹn thành công."
  }
  ```

### Services
#### `GET /services/`
- **Description:** Retrieve all services.
- **Response:**
  ```json
  {
    "message": "",
    "data": [
      {
        "id": "integer",
        "name": "string",
        "title": "string",
        "detail": "string",
        "img": "string"
      }
    ]
  }
  ```

### Admin Operations
#### `GET /admin/get-all-doctor/`
- **Description:** List all doctors.
- **Response:**
  ```json
  {
    "message": "",
    "data": [
      {
        "fullname": "string",
        "work": "string",
        "img": "string",
        "phone": "string"
      }
    ]
  }
  ```

#### `GET /users/`
- **Description:** List all users.
- **Query Params:**
  ```
  phone=<string>&fullname=<string>&role=<string>
  ```
- **Response:**
  ```json
  {
    "message": "",
    "data": [
      {
        "id": "integer",
        "fullname": "string",
        "phone": "string",
        "role": "string",
        "avatar": "string"
      }
    ]
  }
  ```

#### `DELETE /admin/delete/`
- **Description:** Delete a user.
- **Query Params:**
  ```
  phone=<string>
  ```
- **Response:**
  ```json
  {
    "message": "User đã được xóa thành công."
  }
  ```

---

## Technology Stack

- **Backend Framework:** Django REST Framework (DRF)
- **Authentication:** JWT (JSON Web Token)
- **Database:** mysql 
- **Pagination:** Custom pagination for enhanced API responses

---

## Permissions

### Roles
- **USER:** Basic user with access to profile and booking functionalities.
- **DOCTOR:** Special role for managing medical services and appointments.
- **ADMIN:** Full access to user and booking management APIs.

### Permissions Matrix
| Role       | Action                            | Permissions          |
|------------|-----------------------------------|----------------------|
| USER       | Register, Login, Book Services    | Limited to self      |
| DOCTOR     | View and manage appointments      | Assigned patients    |
| ADMIN      | Add/Remove Users, Manage Bookings | Full access          |

---
5. Open a pull request on GitHub.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Thank you for using this system! Feel free to contribute and help us improve.

