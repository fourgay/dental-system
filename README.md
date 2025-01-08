```markdown
# Dental System API

## Giới thiệu

**Dental System API** là một hệ thống quản lý người dùng, lịch hẹn và phòng khám nha khoa. Dự án hỗ trợ các vai trò khác nhau như **Guest**, **Customer**, **Dentist**, **Clinic Owner**, và **System Admin**, cung cấp các chức năng quản lý toàn diện từ đăng ký tài khoản đến lịch khám định kỳ.

## Chức năng chính

### Guest
- Xem danh mục dịch vụ.
- Đăng ký tài khoản để trở thành Customer.

### Customer
- Đăng ký lịch khám một lần hoặc định kỳ.
- Nhận thông báo nhắc lịch trước ngày khám.
- Nhận kết quả khám từ nha sĩ.
- Nhắn tin trao đổi với nha sĩ.

### Dentist
- Xem lịch khám trong tuần của mình.
- Đề xuất lịch khám định kỳ cho bệnh nhân.
- Gửi kết quả khám và xem hồ sơ bệnh nhân.
- Trao đổi với bệnh nhân thông qua kênh chat.

### Clinic Owner
- Đăng ký thông tin phòng khám vào hệ thống.
- Quản lý thông tin bác sĩ, lịch khám, và bệnh nhân.
- Nhập lịch hoạt động của phòng khám (giờ làm việc, số lượng slot).

### System Admin
- Xét duyệt thông tin phòng khám và bác sĩ.
- Quản lý tài khoản.

---

## Cài đặt

### Yêu cầu hệ thống
- Python 3.x
- Django >= 3.2
- Django REST Framework (DRF)
- djangorestframework-simplejwt (JWT Authentication)

### Hướng dẫn cài đặt
1. Clone repository:
   ```bash
   git clone https://github.com/fourgay/dental-system
   cd dental-system
   ```

2. Tạo và kích hoạt môi trường ảo:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Trên Linux/MacOS
   venv\Scripts\activate     # Trên Windows
   ```

3. Cài đặt các gói phụ thuộc:
   ```bash
   pip install -r requirements.txt
   ```

4. Chạy migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Chạy server:
   ```bash
   python manage.py runserver
   ```

6. Truy cập API tại: [http://127.0.0.1:8000](http://127.0.0.1:8000).

---

## API Documentation

### 1. **Guest**
#### Xem danh mục dịch vụ
- **Endpoint:** `GET /services/`
- **Response:**
  ```json
  {
      "message": "",
      "data": [
          {
              "id": 1,
              "name": "Dịch vụ A",
              "title": "Chi tiết dịch vụ A",
              "detail": "Mô tả chi tiết dịch vụ",
              "img": "image_url"
          },
          {
              "id": 2,
              "name": "Dịch vụ B",
              "title": "Chi tiết dịch vụ B",
              "detail": "Mô tả chi tiết dịch vụ",
              "img": "image_url"
          }
      ]
  }
  ```

#### Đăng ký tài khoản
- **Endpoint:** `POST /accounts/register/`
- **Body:**
  ```json
  {
      "fullname": "Nguyen Van A",
      "phone": "0123456789",
      "password": "123456"
  }
  ```
- **Response:**
  ```json
  {
      "message": "Tạo người dùng thành công!"
  }
  ```

---

### 2. **Customer**
#### Đăng ký lịch khám
- **Endpoint:** `POST /booking/`
- **Body:**
  ```json
  {
      "fullname": "Nguyen Van A",
      "date": "2025-01-10",
      "time": "14:00",
      "forAnother": false,
      "remark": "Khám định kỳ",
      "service": "Niềng răng",
      "account": "Nguyen Van A",
      "doctor": "Dr. B"
  }
  ```
- **Response:**
  ```json
  {
      "message": "Đặt lịch thành công!",
      "data": {
          "id": 1,
          "fullname": "Nguyen Van A",
          "date": "2025-01-10",
          "time": "14:00",
          "forAnother": false,
          "remark": "Khám định kỳ",
          "service": "Niềng răng",
          "account": "Nguyen Van A",
          "doctor": "Dr. B"
      }
  }
  ```

---

### 3. **Dentist**
#### Xem lịch khám trong tuần
- **Endpoint:** `GET /dentist/schedule/`
- **Response:**
  ```json
  {
      "message": "",
      "data": [
          {
              "id": 1,
              "fullname": "Nguyen Van A",
              "date": "2025-01-10",
              "time": "14:00",
              "remark": "Khám định kỳ"
          }
      ]
  }
  ```

---

### 4. **Clinic Owner**
#### Đăng ký thông tin phòng khám
- **Endpoint:** `POST /clinic/register/`
- **Body:**
  ```json
  {
      "name": "Phòng khám ABC",
      "address": "123 Đường ABC, Quận 1",
      "opening_hours": {
          "start": "08:00",
          "end": "18:00"
      },
      "slots": {
          "examination": 3,
          "treatment": 1
      }
  }
  ```
- **Response:**
  ```json
  {
      "message": "Phòng khám được đăng ký thành công!",
      "data": {
          "id": 1,
          "name": "Phòng khám ABC",
          "address": "123 Đường ABC, Quận 1",
          "opening_hours": {
              "start": "08:00",
              "end": "18:00"
          },
          "slots": {
              "examination": 3,
              "treatment": 1
          }
      }
  }
  ```

---

### 5. **System Admin**
#### Xét duyệt thông tin bác sĩ
- **Endpoint:** `POST /admin/approve-doctor/`
- **Body:**
  ```json
  {
      "doctor_id": 2,
      "approved": true
  }
  ```
- **Response:**
  ```json
  {
      "message": "Thông tin bác sĩ đã được xét duyệt."
  }
  ```

---

## Tích hợp
- **JWT Authentication:** Sử dụng JWT Token để bảo mật API. Người dùng cần cung cấp token trong `Authorization Header` để truy cập các endpoint yêu cầu xác thực.

---

## Đóng góp
Để đóng góp vào dự án, vui lòng tạo một nhánh mới từ `main` và gửi pull request (PR). Mọi ý kiến đóng góp đều được hoan nghênh!

## License
Dự án này được cấp phép theo giấy phép MIT.

---

Truy cập repository tại đây: [Dental System API](https://github.com/fourgay/dental-system)
```
