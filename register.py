import tkinter as tk
from tkinter import messagebox
import requests
import random
import string
import threading

# Hàm sinh chuỗi ngẫu nhiên
def generate_random_string(length):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

# Hàm đăng ký người dùng
def register_users(base_url, role, number_of_users, access_token, update_ui_callback):
    url = f"{base_url}/api/admin/admin_register/"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    success_count = 0
    failure_count = 0

    for i in range(number_of_users):
        user_data = {
            "fullname": f"Test User {i+1}",
            "phone": f"+8409{random.randint(10000000, 99999999)}",
            "password": generate_random_string(10),
            "role": role
        }

        if role == "DOCTOR":
            user_data["fullname"] = doctor_fullnames[i]
            user_data["work"] = doctor_jobs[i]
            user_data["img"] = doctor_images[i]

        response = requests.post(url, json=user_data, headers=headers)

        if response.status_code == 201:
            success_count += 1
        else:
            failure_count += 1

    # Cập nhật giao diện sau khi hoàn tất
    update_ui_callback(success_count, failure_count)

# Hàm để xử lý đăng ký khi nhấn nút
def on_register_click():
    global doctor_fullnames, doctor_jobs, doctor_images
    role = role_var.get()
    if role not in ["USER", "DOCTOR"]:
        messagebox.showerror("Invalid Role", "Please select a valid role (USER or DOCTOR).")
        return
    
    try:
        number_of_users = int(num_users_entry.get())
    except ValueError:
        messagebox.showerror("Invalid Number", "Please enter a valid number for users.")
        return

    if role == "DOCTOR":
        doctor_fullnames = []
        doctor_jobs = []
        doctor_images = []
        for i in range(number_of_users):
            fullname = doctor_fullname_entries[i].get()
            work = doctor_job_entries[i].get()
            img = doctor_img_entries[i].get()
            if not fullname or not work or not img:
                messagebox.showerror("Missing Information", "Please fill in all doctor information.")
                return
            doctor_fullnames.append(fullname)
            doctor_jobs.append(work)
            doctor_images.append(img)

    access_token = token_entry.get()  # Lấy token từ ô nhập liệu
    if not access_token:
        messagebox.showerror("Missing Token", "Please enter a valid access token.")
        return

    base_url = "http://127.0.0.1:8000"

    # Tạo luồng mới để đăng ký người dùng
    threading.Thread(target=register_users, args=(base_url, role, number_of_users, access_token, update_ui_callback), daemon=True).start()

# Cập nhật giao diện sau khi đăng ký xong
def update_ui_callback(success_count, failure_count):
    messagebox.showinfo("Registration Result", f"Successfully registered {success_count} users.\nFailed to register {failure_count} users.")

# Hàm tạo giao diện nhập thông tin
def create_ui():
    global doctor_fullname_entries, doctor_job_entries, doctor_img_entries, role_var, num_users_entry, doctor_frame, token_entry

    # Tạo cửa sổ gốc
    window = tk.Tk()
    window.title("User Registration")

    # Tạo biến role_var sau khi đã có cửa sổ gốc
    role_var = tk.StringVar()
    role_var.set("USER")

    # Nhập token
    tk.Label(window, text="Enter Access Token:").grid(row=0, column=0)
    token_entry = tk.Entry(window, show="*")  # Ẩn token khi nhập
    token_entry.grid(row=0, column=1)

    # Chọn vai trò
    tk.Label(window, text="Select Role:").grid(row=1, column=0)
    role_menu = tk.OptionMenu(window, role_var, "USER", "DOCTOR")
    role_menu.grid(row=1, column=1)

    # Nhập số lượng người dùng
    tk.Label(window, text="Enter number of users:").grid(row=2, column=0)
    num_users_entry = tk.Entry(window)
    num_users_entry.grid(row=2, column=1)

    # Tạo một Canvas để có thể cuộn
    canvas = tk.Canvas(window)
    canvas.grid(row=3, column=0, columnspan=2)

    # Tạo Scrollbar để cuộn Canvas
    scrollbar = tk.Scrollbar(window, orient="vertical", command=canvas.yview)
    scrollbar.grid(row=3, column=2, sticky="ns")
    canvas.config(yscrollcommand=scrollbar.set)

    # Tạo một frame trong canvas để chứa các trường nhập liệu
    frame = tk.Frame(canvas)
    canvas.create_window((0, 0), window=frame, anchor="nw")

    # Hàm để cập nhật các trường nhập liệu cho bác sĩ khi thay đổi số lượng người dùng
    def update_doctor_entries():
        for widget in frame.winfo_children():
            widget.grid_forget()
        doctor_fullname_entries.clear()
        doctor_job_entries.clear()
        doctor_img_entries.clear()

        number_of_users = int(num_users_entry.get())
        for i in range(number_of_users):
            tk.Label(frame, text=f"Doctor {i+1} Fullname:").grid(row=i, column=0)
            fullname_entry = tk.Entry(frame)
            fullname_entry.grid(row=i, column=1)
            doctor_fullname_entries.append(fullname_entry)

            tk.Label(frame, text=f"Doctor {i+1} Job:").grid(row=i, column=2)
            job_entry = tk.Entry(frame)
            job_entry.grid(row=i, column=3)
            doctor_job_entries.append(job_entry)

            tk.Label(frame, text=f"Doctor {i+1} Image URL:").grid(row=i, column=4)
            img_entry = tk.Entry(frame)
            img_entry.grid(row=i, column=5)
            doctor_img_entries.append(img_entry)

        # Cập nhật kích thước của canvas để có thể cuộn
        frame.update_idletasks()
        canvas.config(scrollregion=canvas.bbox("all"))

    num_users_entry.bind("<FocusOut>", lambda event: update_doctor_entries())

    # Nút đăng ký
    register_button = tk.Button(window, text="Register Users", command=on_register_click)
    register_button.grid(row=4, column=0, columnspan=2)

    window.mainloop()

if __name__ == "__main__":
    doctor_fullname_entries = []
    doctor_job_entries = []
    doctor_img_entries = []

    create_ui()
