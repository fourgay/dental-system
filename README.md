```markdown
# Dental System API

## Giới thiệu

**Dental System API** là hệ thống quản lý người dùng và đặt lịch khám nha khoa, hỗ trợ các chức năng như đăng ký, đăng nhập, quản lý thông tin người dùng, bác sĩ, dịch vụ, và lịch hẹn. Dự án được xây dựng trên **Django REST Framework (DRF)** với các tính năng phân quyền mạnh mẽ và phân trang dữ liệu linh hoạt.

## Chức năng chính

1. **Quản lý người dùng:**
   - Đăng ký tài khoản người dùng hoặc quản trị viên.
   - Đăng nhập bằng số điện thoại và mật khẩu.
   - Quản lý thông tin cá nhân và hồ sơ người dùng.

2. **Dịch vụ:**
   - Lấy danh sách các dịch vụ khám nha khoa.

3. **Quản lý đặt lịch:**
   - Tạo và quản lý lịch hẹn với bác sĩ.
   - Xem danh sách lịch hẹn (dành cho quản trị viên).

4. **Phân quyền:**
   - Người dùng thông thường, bác sĩ và quản trị viên có quyền hạn khác nhau.
   - API bảo mật với JWT Token Authentication.

## Cấu trúc project

- **`models.py`**:
  - Định nghĩa các mô hình như `Data` (người dùng), `Service` (dịch vụ), và `Booking` (đặt lịch).

- **`serializers.py`**:
  - Chuyển đổi dữ liệu giữa mô hình và định dạng JSON.

- **`views.py`**:
  - Logic chính cho API, bao gồm đăng ký, đăng nhập, và các chức năng quản lý khác.

- **`urls.py`**:
  - Định nghĩa các endpoint API.

- **`pagination.py`**:
  - Tùy chỉnh phân trang API với số lượng kết quả và tổng số trang.

- **`tests.py`**:
  - Bài kiểm tra tự động (hiện tại chưa triển khai).

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

## Sử dụng API

### Các endpoint chính

- **Đăng ký người dùng:**
  - `POST /accounts/register/`
  
- **Đăng nhập:**
  - `POST /accounts/login/`
  
- **Lấy thông tin người dùng hiện tại:**
  - `GET /accounts/user/`
  
- **Lấy danh sách bác sĩ:**
  - `GET /admin/get-all-doctor/`
  
- **Xem danh sách dịch vụ:**
  - `GET /services/`

- **Quản lý đặt lịch (dành cho ADMIN):**
  - `GET /admin/Booking/`

### Phân trang
Tất cả các API trả về danh sách đều hỗ trợ phân trang thông qua tham số:
- `page`: Số trang hiện tại.
- `page_size`: Số lượng mục trên mỗi trang.

## Đóng góp

Để đóng góp vào dự án, vui lòng tạo một nhánh mới từ `main` và gửi pull request (PR). Mọi ý kiến đóng góp đều được hoan nghênh!

## License

Dự án này được cấp phép theo giấy phép MIT.

---

Truy cập repository tại đây: [Dental System API](https://github.com/fourgay/dental-system)
```
