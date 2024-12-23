# 📘 **API Register Documentation**

## **Mục lục**
1. [Giới thiệu](#giới-thiệu)
2. [Endpoint](#endpoint)
3. [Request Method](#request-method)
4. [Request Body](#request-body)
5. [Response](#response)
6. [Lỗi phổ biến](#lỗi-phổ-biến)

---

## **Giới thiệu**
API Register được sử dụng để **đăng ký người dùng mới** trong hệ thống. API này yêu cầu thông tin cơ bản của người dùng như `username`, `phone`, và `password`.

---

## **Endpoint**
- URL: `/api/register/`

---

## **Request Method**
- **POST**

---

## **Request Body**
Dữ liệu đầu vào phải ở định dạng JSON và chứa các trường sau:

| Trường      | Kiểu dữ liệu | Bắt buộc | Mô tả                     |
|-------------|--------------|----------|---------------------------|
| `username`  | String       | Có       | Tên người dùng, phải duy nhất |
| `phone`     | String       | Có       | Số điện thoại, phải duy nhất |
| `password`  | String       | Có       | Mật khẩu cho tài khoản    |

**Ví dụ:**

```json
{
  "username": "john_doe",
  "phone": "123123123",
  "password": "securepassword"
}
Response
Thành công
HTTP Status Code: 201 Created
json

{
  "message": "User created successfully!",
  "user": {
    "username": "john_doe",
    "phone": "123123123"
  }
}

1. Thiếu trường hoặc định dạng không hợp lệ
HTTP Status Code: 400 Bad Request
json
{
  "username": ["This field is required."],
  "phone": ["This field is required."],
  "password": ["This field is required."]
}
2. username hoặc phone đã tồn tại
HTTP Status Code: 400 Bad Request
json

{
  "username": ["A user with that username already exists."],
  "phone": ["A user with that phone number already exists."]
}
Lỗi phổ biến
Thiếu dữ liệu đầu vào:

Đảm bảo gửi đủ 3 trường username, phone, và password.
Thông tin trùng lặp:

username và phone phải là duy nhất trong cơ sở dữ liệu.
Sai định dạng JSON:

Kiểm tra xem dữ liệu gửi lên có đúng định dạng JSON không.
