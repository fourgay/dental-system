```markdown
# Đăng ký API

API này cho phép người dùng đăng ký tài khoản mới.

## URL

`POST /api/accounts/register/`

## Headers

- `Content-Type: application/json`

## Body

Yêu cầu phải gửi dữ liệu dưới dạng JSON với các trường sau:

- `fullname`: Tên đầy đủ của người dùng (bắt buộc)
- `phone`: Số điện thoại của người dùng (bắt buộc)
- `password`: Mật khẩu của người dùng (bắt buộc)

### Ví dụ

```json
{
  "fullname": "Nguyễn Văn A",
  "phone": "0123456789",
  "password": "matkhaucuaban"
}
```

## Response

### Thành công

- **Status**: `201 Created`
- **Body**:

```json
{
  "message": "Tạo người dùng thành công!",
  "user": {
    "fullname": "Nguyễn Văn A",
    "phone": "0123456789"
  }
}
```

### Thất bại

- **Status**: `400 Bad Request`
- **Body**:

```json
{
  "fullname": [
    "Tên đầy đủ đã tồn tại."
  ],
  "phone": [
    "Số điện thoại đã tồn tại."
  ]
}
```

## Chạy dự án

1. Tạo và kích hoạt môi trường ảo:

```sh
python -m venv venv
source venv/bin/activate  # Trên Windows: venv\Scripts\activate
```

2. Cài đặt các gói phụ thuộc:

```sh
pip install -r requirements.txt
```

3. Chạy các lệnh migrate để tạo các bảng cơ sở dữ liệu:

```sh
python manage.py makemigrations
python manage.py migrate
```

4. Chạy server:

```sh
python manage.py runserver
```

5. Sử dụng Postman hoặc công cụ tương tự để gửi yêu cầu đăng ký tới `http://127.0.0.1:8000/api/accounts/register/`.

