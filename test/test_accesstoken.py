from jwt import decode
from datetime import datetime

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2NDA4Nzk0LCJpYXQiOjE3MzY0MDUxOTQsImp0aSI6ImI0NzUxNmM1OTU2ZjQ5ZjM4MDVjZDAwNjEyNjU0OGJiIiwidXNlcl9pZCI6MX0.TCXVCvW_sF84veZqIYTiRondrSLA_vSFFaHpW8pqZ6E"
decoded = decode(token, options={"verify_signature": False})
exp = datetime.fromtimestamp(decoded['exp'])
print(f"Token expires at: {exp}")
