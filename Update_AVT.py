import requests
import json

def main():
    # Nhập admin token
    token = input("Nhập admin token: ")

    # Thiết lập headers với token
    headers = {
        "Authorization": f"Bearer {token}",  # Sử dụng "Bearer"
        "Content-Type": "application/json"
    }

    # API 1: Lấy danh sách user
    url_get = "http://127.0.0.1:8000/api/users/"
    try:
        response_get = requests.get(url_get, headers=headers)
        response_get.raise_for_status()  # Kiểm tra lỗi HTTP
        
        # Lấy danh sách user từ "data" -> "result"
        users = response_get.json().get("data", {}).get("result", [])

    except requests.RequestException as e:
        print("Lỗi khi lấy thông tin user:", e)
        return

    print("Dữ liệu từ API 1:", users)  # Debug xem API trả về gì

    # Kiểm tra nếu users không phải là danh sách
    if not isinstance(users, list):
        print("Lỗi: API trả về không đúng định dạng (không phải danh sách)")
        return

    # Danh sách phone cập nhật thành công
    successful_phones = []

    # API 2: Cập nhật thông tin user
    url_put = "http://127.0.0.1:8000/api/admin/Update_user/"

    # Lặp qua từng user để cập nhật avatar
    for user in users:
        phone = user.get("phone")
        if not phone:
            continue  # Bỏ qua nếu không có phone

        payload = {
            "phone": phone,
            "avatar": "ztrydxH.png"
        }

        try:
            response_put = requests.put(url_put, json=payload, headers=headers)
            if response_put.status_code in (200, 202):
                print(f"Cập nhật thành công cho user có phone: {phone}")
                successful_phones.append(phone)
            else:
                print(f"Lỗi cập nhật user {phone}: Mã {response_put.status_code} - {response_put.text}")

        except requests.RequestException as e:
            print(f"Lỗi khi cập nhật user {phone}:", e)

    # Lưu danh sách phone đã cập nhật thành công vào file
    try:
        with open("phone.txt", "w", encoding="utf-8") as f:
            for phone in successful_phones:
                f.write(str(phone) + "\n")
        print("Danh sách phone đã cập nhật được lưu vào phone.txt")
    except IOError as e:
        print("Lỗi khi ghi file:", e)

if __name__ == "__main__":
    main()
