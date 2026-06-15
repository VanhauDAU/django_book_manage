# Book Manage

[![CI](https://github.com/VanhauDAU/django_book_manage/actions/workflows/ci.yml/badge.svg)](https://github.com/VanhauDAU/django_book_manage/actions/workflows/ci.yml)

Ứng dụng quản lý sách gồm Django REST API và React frontend.

## Cấu trúc dự án

```text
.
├── backend/
│   ├── book_manage/
│   ├── books/
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md
```

## Tổng quan

- Django 5.2
- Django REST framework
- PostgreSQL
- JWT Authentication với SimpleJWT
- CRUD Book API bằng ModelSerializer, ModelViewSet và Router

## Yêu cầu

- Python 3.10+ (hoặc phiên bản Python tương thích với Django 5.2)
- PostgreSQL đang chạy ở máy local hoặc Docker
- Database/user PostgreSQL đã được tạo

## Cài đặt backend

1. Kích hoạt virtual environment từ thư mục gốc:

```powershell
.\venv3\Scripts\Activate.ps1
```

Trên macOS/Linux:

```bash
source venv3/bin/activate
```

2. Di chuyển vào backend và cài đặt dependencies:

```bash
cd backend
pip install -r requirements.txt
```

3. Tạo file `.env` từ file mẫu:

```powershell
copy .env.example .env
```

Trên macOS/Linux:

```bash
cp .env.example .env
```

Cập nhật thông tin PostgreSQL trong `.env`:

```env
DB_ENGINE=django.db.backends.postgresql
DB_NAME=book_manage_db
DB_USER=book_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

4. Tạo PostgreSQL database và user:

```sql
CREATE DATABASE book_manage_db;
CREATE USER book_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE book_manage_db TO book_user;
```

5. Tạo và áp dụng migration:

```powershell
python manage.py makemigrations
python manage.py migrate
```

6. Tạo tài khoản đăng nhập:

```powershell
python manage.py createsuperuser
```

7. Khởi chạy server:

```powershell
python manage.py runserver
```

Backend chạy mặc định tại `http://localhost:8000`.

## Cài đặt frontend

Mở terminal khác từ thư mục gốc:

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy mặc định tại `http://localhost:5173`.

## API

### JWT

Lấy access token:

```http
POST /api/token/
```

Body:

```json
{
  "username": "admin",
  "password": "your_password"
}
```

Refresh token:

```http
POST /api/token/refresh/
```

Body:

```json
{
  "refresh": "refresh_token"
}
```

### Book CRUD

Các API Book yêu cầu header:

```http
Authorization: Bearer access_token
```

Endpoints:

```text
GET    /api/books/
POST   /api/books/
GET    /api/books/{id}/
PUT    /api/books/{id}/
PATCH  /api/books/{id}/
DELETE /api/books/{id}/
```

Body tạo/cập nhật Book:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "published_date": "2008-08-01"
}
```
