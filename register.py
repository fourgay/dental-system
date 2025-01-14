import tkinter as tk
from tkinter import messagebox
import requests
import random
import string
import threading
from concurrent.futures import ThreadPoolExecutor

# Danh sách tên và họ mẫu
FIRST_NAMES = ["Anh", "Bình", "Cường", "Dương", "Hùng", "Linh", "Mai", "Ngọc", "Phúc", "Quang"]
LAST_NAMES = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Vũ", "Phan", "Võ", "Đặng", "Bùi"]

# Hàm sinh tên ngẫu nhiên
def generate_random_name():
    return f"{random.choice(LAST_NAMES)} {random.choice(FIRST_NAMES)}"

# Hàm sinh chuỗi ngẫu nhiên
def generate_random_string(length):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

# Hàm đăng ký người dùng
def register_user(url, headers):
    user_data = {
        "fullname": generate_random_name(),
        "phone": f"09{random.randint(10000000, 99999999)}",
        "password": generate_random_string(10)
    }
    response = requests.post(url, json=user_data, headers=headers)
    return response.status_code

# Hàm thực hiện đăng ký đồng thời
def register_users_concurrent(base_url, number_of_users, access_token, update_ui_callback):
    url = f"{base_url}/api/accounts/register/"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    success_count = 0
    failure_count = 0

    def handle_result(status_code):
        nonlocal success_count, failure_count
        if status_code == 201:
            success_count += 1
        else:
            failure_count += 1

    with ThreadPoolExecutor(max_workers=1000) as executor:
        futures = [executor.submit(register_user, url, headers) for _ in range(number_of_users)]
        for future in futures:
            handle_result(future.result())

    # Cập nhật giao diện sau khi hoàn tất
    update_ui_callback(success_count, failure_count)

# Hàm để xử lý đăng ký khi nhấn nút
def on_register_click():
    try:
        number_of_users = int(num_users_entry.get())
    except ValueError:
        messagebox.showerror("Invalid Number", "Please enter a valid number for users.")
        return

    access_token = token_entry.get()  # Lấy token từ ô nhập liệu
    if not access_token:
        messagebox.showerror("Missing Token", "Please enter a valid access token.")
        return

    base_url = "http://127.0.0.1:8000"

    # Tạo luồng mới để đăng ký người dùng
    threading.Thread(
        target=register_users_concurrent,
        args=(base_url, number_of_users, access_token, update_ui_callback),
        daemon=True
    ).start()

# Cập nhật giao diện sau khi đăng ký xong
def update_ui_callback(success_count, failure_count):
    messagebox.showinfo("Registration Result", f"Successfully registered {success_count} users.\nFailed to register {failure_count} users.")

# Hàm tạo giao diện nhập thông tin
def create_ui():
    global num_users_entry, token_entry

    # Tạo cửa sổ gốc
    window = tk.Tk()
    window.title("User Registration")

    # Nhập token
    tk.Label(window, text="Enter Access Token:").grid(row=0, column=0)
    token_entry = tk.Entry(window, show="*")  # Ẩn token khi nhập
    token_entry.grid(row=0, column=1)

    # Nhập số lượng người dùng
    tk.Label(window, text="Enter number of users:").grid(row=1, column=0)
    num_users_entry = tk.Entry(window)
    num_users_entry.grid(row=1, column=1)
    register_button = tk.Button(window, text="Register Users", command=on_register_click)
    register_button.grid(row=2, column=0, columnspan=2)
    window.mainloop()
if __name__ == "__main__":
    create_ui()
